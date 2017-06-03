import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

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

  /**
   * WATCH FOR MARKER DRAG
   * 
   * if the user drags the marker, it will update the coordinates
   */
  watchDrag(eventListenerObject: any) {
    this.lat = eventListenerObject.coords.lat
    this.lng = eventListenerObject.coords.lng
  }

  /**
   * EVENT EMITTER
   * 
   * getting the actuals coordinates from the component
   */

  lowLevelChangeOfLat(value: number) {
       this.acutalLatLng.emit([value, this.lng]);
console.log(value)
//    console.log(this.acutalLatLng[0])
  }
  lowLevelChangeOfLng(value: number) {
        this.acutalLatLng.emit([this.lat, value]);
console.log(value)

  //  console.log(this.acutalLatLng[1])

  }
}

