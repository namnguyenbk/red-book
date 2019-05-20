import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { SearchService } from '../../services/search.service';
import { RedbookService } from '../../services/redbook.service';
import { searchReq } from '../../interface/common-interface';
import { AddressService } from '../../services/common/address.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(
    private search: SearchService,
    private rbService: RedbookService,
    private addrService : AddressService
  ) { }

  zoom: number = 8;
  latCenter: number = 20.5231057;
  lngCenter: number =  105.6219711;

  markers: marker[] = [];

  ngOnInit() {
    let dataSearch: any = {
      max_size: 100000,
      min_size : 0,
    };
    this.search.search(dataSearch).subscribe((res: any) => {
      res.result.forEach(rb => {
        if( rb.addr_id){
          this.addrService.getAddr( rb.addr_id).subscribe( (addressRb : any) =>{
            if(addressRb.lat){
              let rbTemp = {
                lat : addressRb.lat,
                lng : addressRb.lng,
                no_land : rb.no_land,
                area : rb.area,
                use_for : rb.use_for,
                addr : addressRb.full_addr,
                images : rb.images
              }
              this.markers.push(rbTemp);
            }
          });
        }
      });
    });
  }
}

interface marker {
  lat: string;
  lng: string;
  no_land: string;
  area: string;
  use_for: string;
  addr: string;
  images : string;
}

