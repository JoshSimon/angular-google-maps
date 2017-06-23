import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';


@Injectable() export class ReverseGeocodingService {

    google: any;
    place: any;



    constructor(private mapsAPILoader: MapsAPILoader) {
    }

    constructGeocodeInstance() {
       return this.mapsAPILoader.load().then(() => {
            return new google.maps.Geocoder();
        })
    }
    /**
     * Reverse geocoding by location
     * makes a promise out of the Google geocode API response
     * 
     * @param latLng Location object consisting of latitude and longitude
     * @return promise that resolves with payload or rejects with status
     */
    geocode(latLng: google.maps.LatLng, geocoder: google.maps.Geocoder): Promise<google.maps.GeocoderResult[]> {
        return new Promise((resolve, reject) => {
            geocoder.geocode({ 'location': latLng }, (
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        console.log('results from the geocode function out of the service: ' + results);
                        resolve(results);
                    } else {
                        console.log(status)
                        reject(status)
                    }
                }
            ))
        })
    }
}



