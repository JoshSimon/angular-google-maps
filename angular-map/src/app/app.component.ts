
import { Component, OnChanges, SimpleChanges } from "@angular/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * GOOGLE MAPS COORDINATES
   */
  private latitude: number = 50.972396201021304;
  private longitude: number = 9.78125;
  public zoom: number = 5;
  private shippingCoordinates: number[] = [this.latitude, this.longitude]


  newCoordinates(information: number[]) {
    this.latitude = information[0];
    this.longitude = information[1];
    this.zoom = information[2]
  }

  actualCoordinates(information: number[]) {
    this.shippingCoordinates[0] = information[0];
    this.shippingCoordinates[1] = information[1];
    this.latitude = information[0];
    this.longitude = information[1];
  }


}
