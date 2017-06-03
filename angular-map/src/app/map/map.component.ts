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
    this.lat = eventListenerObject.coords.lat;
    this.lng = eventListenerObject.coords.lng;
    this.acutalLatLng.emit([this.lat, this.lng])
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
}

