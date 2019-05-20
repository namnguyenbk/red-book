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
  @Input() image : string;
  zoom: number = 15;

  constructor() { }

  ngOnInit() {
  
  }
  

  mapClicked($event: MouseEvent) {

  }

  markerDragEnd(m: any, $event: MouseEvent) {
    // console.log('dragEnd', m, $event);
  }

  clickedMarker() {
  }

}