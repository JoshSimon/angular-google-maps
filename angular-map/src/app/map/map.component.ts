import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  title: string = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;

  thingy: any;

  watchDrag(thing: any){
   this.lat = thing.coords.lat;
   this.lng = thing.coords.lng
  }

}

