import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {


  provinceId : string = "";
  provinceName : string = "";
  districtId : string = "";
  districtName : string = "";
  wardId : string = ""; 
  wardName : string = ""; 
  detail : string = "";

  constructor(private searchSerivce : SearchService) { 
  }

  ngOnInit() {
  }

  updateIdAddr( event : any){
    if(event.type == "province"){
      this.provinceId = event.id;
      this.provinceName = event.name;
      this.districtId = null;
    }
    if(event.type =="district"){
      this.districtId = event.id;
      this.districtName = event.name;
      this.wardId = null;
    }
    if(event.type =="ward"){
      this.wardId = event.id;
      this.wardName = event.name;
    }

  }

}
