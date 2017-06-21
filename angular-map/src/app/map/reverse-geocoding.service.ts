import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';


@Injectable() export class ReverseGeocodingService {

    google: any;
    geocoder: google.maps.Geocoder;
    place: any;



    constructor(private mapsAPILoader: MapsAPILoader) {
        try {
            this.mapsAPILoader.load().then(() => {
                this.geocoder = new google.maps.Geocoder();
            })
        } catch (e) {
            console.error(e)
        };

    }

    /**
     * Reverse geocoding by location
     * makes a promise out of the Google geocode API response
     * 
     * @param latLng Location object consisting of latitude and longitude
     * @return promise that resolves with payload or rejects with status
     */
    geocode(latLng: google.maps.LatLng): Promise<google.maps.GeocoderResult[]> {
        return new Promise((resolve, reject) => {
            this.geocoder.geocode({ 'location': latLng }, (
                (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                    if (status === google.maps.GeocoderStatus.OK) {
                        resolve(results);
                    } else {
                        reject(status)
                    }
                }
            ))
        })
    }
}



