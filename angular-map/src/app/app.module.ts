import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';
import { PlacesSearchComponent } from './places-search/places-search.component';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PlacesSearchComponent
  ],
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJr_Ionaem4V4-VmYH5Gf6uv6Yy8IBZi8',
      libraries: ["places"]
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
