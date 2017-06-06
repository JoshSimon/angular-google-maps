import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ReverseGeocodingService } from './reverse-geocoding.service';

@Component({
  selector: 'app-reverse-geocoding',
  templateUrl: './reverse-geocoding.component.html',
  styleUrls: ['./reverse-geocoding.component.css']
})
export class ReverseGeocodingComponent {

  @Output() newGeocode: EventEmitter<any> = new EventEmitter();

  @Input('lat') lat: number;
  @Input('lng') lng: number;
  latLng: any;

  newPlace(event: any) {
    let place = this.service.geocode(this.latLng);
    this.newGeocode.emit(place);
    console.log('GEOCODE RESULT: ' + place);
  }

  constructor(private service: ReverseGeocodingService) {
    this.latLng ={lat: this.lat,lng: this.lng};
   }

   ngOnChanges() {
     this.latLng ={lat: this.lat,lng: this.lng};
   }
  


}
