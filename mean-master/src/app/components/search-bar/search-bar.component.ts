import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import {searchReq, redbookData} from '../../interface/common-interface';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {
 
  breakpoint : number;
  keySearch : string;
  owner : string;
  provinceId : string;
  provinceName : string;
  districtId : string;
  districtName : string;
  wardId : string; 
  wardName : string; 
  resultSearch : redbookData;

  constructor( private searchSerivce : SearchService) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 4;
  }

  onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 4;
}

  onSearch(){
    this.keySearch = this.owner + ', ' + this.wardName + ', ' + this.districtName + ', ' + this.provinceName;
    let searchReq : searchReq = {
      // address : 
      owner_name : this.owner? this.owner : '',
      province : this.provinceName ? this.provinceName : '',
      district : this.districtName ? this.districtName : '',
      street : this.wardName ? this.wardName : '',
      max_size : '10',
      min_size : '0',
    }
    this.searchSerivce.search(searchReq).subscribe( (res : redbookData) =>{
      this.resultSearch = res;
    });

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
