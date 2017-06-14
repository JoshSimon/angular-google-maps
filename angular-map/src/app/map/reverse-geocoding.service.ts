import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';


@Injectable() export class ReverseGeocodingService {

    google: any;
    geocoder: google.maps.Geocoder;

    constructor(private mapsAPILoader: MapsAPILoader
    ) {
        console.log('in the constructor')
        try {
            this.mapsAPILoader.load().then(() => {
                this.geocoder = new google.maps.Geocoder();
            })
        } catch (e) {
            console.log(e)
        }
    }



    /**
     * Reverse geocoding by location.
     * 
     * Wraps the Google Maps API geocoding service into an observable.
     * 
     * @param latLng Location
     * @return An observable of GeocoderResult which can be subscribed to
     */
    geocode(latLng: google.maps.LatLng): any {
        
        console.log('geocode function called', latLng);
        return this.geocoder.geocode({ 'location': latLng }, (

            (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                
                if (status === google.maps.GeocoderStatus.OK) {
                    console.log('succesfull response ' + results[0].address_components[0].long_name)
                    return results[0]; 
                } else {
                    console.log('Geocoding service: geocoder failed due to: ' + status);
                    return 'nope';
                }
                
            }));

    }
}
