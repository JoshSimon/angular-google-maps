/**
 * ANGULAR RELATED
 */
import { Component, Input, Output, EventEmitter, OnChanges, NgZone } from '@angular/core';

/**
 * SERVICES
 */
import { ReverseGeocodingService } from "./reverse-geocoding.service";

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
    this.reverseGeoCoding(this.lat, this.lng); //get the newest coordinates and reverse geocode
    this.actualPlace.emit(this.place); //emit geocode result
  }

  /**
   * CONSTRUCTOR
   */
  constructor(private service: ReverseGeocodingService, private ngZone: NgZone) { }

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
    console.log('event: ' + eventListenerObject)
    /*this.lat = eventListenerObject.coords.lat;
    this.lng = eventListenerObject.coords.lng;
    this.acutalLatLng.emit([this.lat, this.lng])*/
  }
  /**
   * EVENT EMITTER
   * 
   * getting the actuals coordinates from the component
   */
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
    // ngZone to run the api call inside the angular zone for the behaviour of the asynchronous api response
    
      let reverseGeocodeResult = this.service.geocode(this.latLng);
      let finished; // status variable
      let placeString; // variable that holds the result
      /* subscribing to the observable of the geocode service */
      console.log('result in the component ' + reverseGeocodeResult); 
      this.result = reverseGeocodeResult;
      let helper = reverseGeocodeResult.address_components;
      let worked = false;
      helper.forEach(element => {
        if (element.types[0] == "locality") {
          placeString = element.long_name;
          console.log(placeString)
          worked = true;
        }
      });
      if (worked === false) {
        helper.forEach(element => {
          if (element.types[0] == "country") {
            placeString = element.long_name;
                      console.log(placeString)

            worked = true;
          }
        });
      };
      if (worked === false) {
        placeString = 'nowhere';
      };
      this.place = placeString
      console.log('out of the map component - ' + this.place)
    
  }

}
