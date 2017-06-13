import { Component, NgZone, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ReverseGeocodingService } from './reverse-geocoding.service';

@Component({
  selector: 'app-reverse-geocoding',
  templateUrl: './reverse-geocoding.component.html',
  styleUrls: ['./reverse-geocoding.component.css']
})
export class ReverseGeocodingComponent {

  latLng: any;
  place: any;

  /**
   * EVENT EMITTER
   * 
   * Output is the result of the reverse geoloctaion search
   * Coordinates --> String of place
   */
  @Output() newGeocodePlace: EventEmitter<any> = new EventEmitter();

  /**
   * INPUTS
   * 
   * the current actual coordinates are set as inputs
   */
  @Input('lat') lat: number;
  @Input('lng') lng: number;

  /**
   * CONSTRUCTOR
   * 
   * constructs the geocoding service and the latLng object
   * which will be handed to the service later on  
   */
  piece: any;
  constructor(private service: ReverseGeocodingService, private ngZone: NgZone) {
    this.latLng = { lat: this.lat, lng: this.lng };
  }

  /**
   * ON CHANGES
   *
   * if the coordinate input changes, the service will be called
   * to hand back a new result
   */
  ngOnChanges(change: SimpleChanges) {
    this.latLng = { lat: this.lat, lng: this.lng };


    this.ngZone.run(() => {


      this.place = this.service.geocode(this.latLng);
      let finished // shit has to stay

      let subscription = this.place.subscribe(
        value => {
          value = value[0].address_components;
          let worked = false;
          value.forEach((element, index) => {

            if (element.types[0] == "locality") {
              this.piece = element.long_name;
              worked = true;
              console.log('LOCAL' + this.piece);

           
            }
               if ( index == value.length) {
                console.log('on the end ' + worked)
                value.forEach(element => {

                  if (element.types[0] == "country") {
                    this.piece = element.long_name;
                    worked = true;
                    console.log('LOCAL' + this.piece)
                  }

                })
                if (worked = false) {
                  console.log('NOPE' + this.piece)
                  this.piece = 'nope'
                };
              }
          });



        },
        error => console.log('ERRÖRÄ'),
        () => finished = true
      );

    });

    console.log('geocode result' + this.place)
    this.newGeocodePlace.emit(this.place);



  }



}
