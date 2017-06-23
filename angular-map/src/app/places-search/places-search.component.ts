import { ElementRef, Component, NgModule, NgZone, OnInit, ViewChild, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-places-search',
  templateUrl: './places-search.component.html',
  styleUrls: ['./places-search.component.css']
})

export class PlacesSearchComponent implements OnInit {

  /**
   * DEFAULTS
   */
  private latitude: number;
  private longitude: number;
  private zoom: number;
  google: any;

  @Input() place: string;

  /**
   * EVENT EMITTER
   * 
   * Outputs an array of coordinates and zoom which will be used as an input for the map component
   */
  @Output() newPlaceLatLng: EventEmitter<any> = new EventEmitter();

  /**
   * PLACES SEARCH
   * 
   * The input element is referenced by "search"
   * The google maps API loader is build
   * It is a part of the @agm package
   * ngZone is needed to "The NgZone service enables us to perform asynchronous operations outside of the Angular zone, or in our case, to explicitly run a function within the Angular zone. Angular’s zones patch most of the asynchronous APIs in the browser, invoking change detection when an asynchronous code is completed. As you might expect Angular zones"
   * this is mainly a copy of http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/ (I can recommend that blog article)
   */
  @ViewChild("search")
  private searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["geocode"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 10; // <-- static value, to zoom into the desired place on search
          // address values to event emitter
          this.newPlaceLatLng.emit([this.latitude, this.longitude, this.zoom]);
        });
      });
    });
  }
}
