/**
 * ANGULAR RELATED
 */
import { Component, Input, Output, EventEmitter, OnChanges, NgZone } from '@angular/core';

/**
 * SERVICES
 */
import { ReverseGeocodingService } from "./reverse-geocoding.service";



import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  /**
   * DECLARATIONS
   */
  place: string; // name of the place that is around the location marker
  latLng: any;
  result: any;

  /**
   * INPUTS
   *
   * To manipulate the map by the places search etc. from outside of the component
   */
  @Input('lat') lat: number;
  @Input('lng') lng: number;
  @Input('zm') zm: number;

  /**
   * OUTPUTS
   *
   * Sending the latest coordinates out
   */
  @Output() acutalLatLng: EventEmitter<any> = new EventEmitter();
  @Output() actualPlace: EventEmitter<any> = new EventEmitter();

  ngOnChanges() {
    this.acutalLatLng.emit([this.lat, this.lng]);
    //get the newest coordinates and reverse geocode
    this.reverseGeoCoding(this.lat, this.lng);
  }

  /**
   * CONSTRUCTOR
   */
  constructor(private service: ReverseGeocodingService) {
  }

  /**
   * WATCH FOR MARKER DRAG
   * 
   * if the user drags the marker, it will update the coordinates
   */
  watchDrag(eventListenerObject: any) {
    this.lat = eventListenerObject.coords.lat;
    this.lng = eventListenerObject.coords.lng;
    this.acutalLatLng.emit([this.lat, this.lng])
  }

  /**
   * WATCH FOR PLACES SEARCH
   * 
   * if the user selects a result from the places results
   */
  watchPlaces(eventListenerObject: any) {
    this.lat = eventListenerObject.coords.lat;
    this.lng = eventListenerObject.coords.lng;
    this.acutalLatLng.emit([this.lat, this.lng])  
  }

  lowLevelChangeOfLat(value: number) {
    this.lat = value;
    this.acutalLatLng.emit([this.lat, this.lng])
  }
  lowLevelChangeOfLng(value: number) {
    this.lng = value;
    this.acutalLatLng.emit([this.lat, this.lng])
  }
  reverseGeoCoding(latu: number, lngi: number) {
    this.latLng = { lat: latu, lng: lngi }; //object that is required to feed the geocode function of the GeoCode class (see reverse-geocoding.service)    
    return new Promise((resolve) => {
      resolve(this.service.constructGeocodeInstance());
    }).then((geocoder) =>  this.callbackGeocoderInstanciated(geocoder) );
  }

  callbackGeocoderInstanciated(geocoder) {
    this.service.geocode(this.latLng, geocoder).then(
      (success) => {
        let place; //stores the desired reverse geocoded location name
        let worked = false; // boolean to check if a desired result is found or not

        /**
         * to understand the following logic, please refer to https://developers.google.com/maps/documentation/geocoding/intro
         * to see an example of the payload
         * 
         * the main goal is to have a name for every spot on the map
         * if there is no local name, the country name is shown
         * and if the place is outside of any country
         * 'nowhere' is displayed
         */
        success[0].address_components.forEach(element => {
          if (element.types[0] == "locality") {
            worked = true;
            place = element.long_name;
          }
        });
        if (worked === false) {
          success[0].address_components.forEach(element => {
            if (element.types[0] == "country") {
              worked = true;
              place = element.long_name;
            }
          });
        };
        if (worked === false) {
          place = 'nowhere';
        };
        if (place === undefined) {
          console.error('geocode API service returned a place called "undefined"');
        } else {
          this.callback(place);
        }
      },
      (error) => {
        console.error('geocode API throws the following error ' + error);
        if (error == 'ZERO_RESULTS') { this.callback('nowhere') } // if there is no country or local name
      }
    );

  }

  callback(input: any) {
    this.place = input;
    this.actualPlace.emit(this.place)
  }

  
}