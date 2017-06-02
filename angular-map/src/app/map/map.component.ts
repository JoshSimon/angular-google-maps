import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

 @Input('lat') lat: number;
 @Input('lng') lng : number;

  constructor() {
    if (this.lat == null && this.lng ==  null) {
      this.lat= 51.673858;
      this.lng= 7.815982;
    }
  }

  watchDrag(eventListenerObject: any){
   this.lat = eventListenerObject.coords.lat
   this.lng = eventListenerObject.coords.lng
  }


}

