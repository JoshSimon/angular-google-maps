import { Injectable, OnInit } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

/**
 * GeocodingService class.
 * https://developers.google.com/maps/documentation/javascript/
 */
@Injectable() export class ReverseGeocodingService implements OnInit {
    google: any;
    geocoder: google.maps.Geocoder;

    constructor(private mapsAPILoader: MapsAPILoader) { }

    ngOnInit() {
        this.mapsAPILoader.load().then(() => {
        this.geocoder = new google.maps.Geocoder()
        })
    }


    /**
     * Reverse geocoding by location.
     * 
     * Wraps the Google Maps API geocoding service into an observable.
     * 
     * @param latLng Location
     * @return An observable of GeocoderResult
     */
    geocode(latLng: google.maps.LatLng): Observable < google.maps.GeocoderResult[] > {
                return new Observable((observer: Observer<google.maps.GeocoderResult[]>) => {
                    // Invokes geocode method of Google Maps API geocoding.
                    this.geocoder.geocode({ 'location': latLng }, (
                        (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
                            if (status === google.maps.GeocoderStatus.OK) {
                                observer.next(results);
                                observer.complete();
                            } else {
                                console.log('Geocoding service: geocoder failed due to: ' + status);
                                observer.error(status);
                            }
                        })
                    );
                });
            }
}
