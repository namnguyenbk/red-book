import { Component, OnInit, Input } from '@angular/core';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'app-address-map',
  templateUrl: './address-map.component.html',
  styleUrls: ['./address-map.component.css']
})
export class AddressMapComponent implements OnInit {

  @Input() lat : number;
  @Input() lng : number;
  @Input() ownername : string;
  @Input() address : string;
  @Input() area : string;
  zoom: number = 8;

  constructor() { }

  ngOnInit() {
    this.lat = 21.022736;
    this.lng = 105.8019441;

  }
  

  mapClicked($event: MouseEvent) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng,
    //   draggable: true
    // });
  }

  markerDragEnd(m: any, $event: MouseEvent) {
    // console.log('dragEnd', m, $event);
  }

  clickedMarker() {
  }

}