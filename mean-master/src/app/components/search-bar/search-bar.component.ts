import { Component, OnInit, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import {searchReq, redbookData} from '../../interface/common-interface';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  @Output() search : EventEmitter<null> = new EventEmitter();
 
  breakpoint : number;
  keySearch : string;
  owner : string;
  provinceId : string;
  provinceName : string;
  districtId : string;
  districtName : string;
  wardId : string; 
  wardName : string; 
  resultSearch : any;

  constructor( private searchSerivce : SearchService) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 1100) ? 1 : 5;
  }

  onResize(event) {
  this.breakpoint = (event.target.innerWidth <= 1100) ? 1 : 5;
}

  onSearch(){
    this.keySearch = (this.owner? (this.owner + ', ') : '') + (this.wardName? (this.wardName + ', ') : '') 
                      + (this.districtName? (this.districtName + ', ') : '')  + (this.provinceName? (this.provinceName + '') : '');
    let searchReq : searchReq = {
      // address : 
      owner_name : this.owner? this.owner : '',
      province : this.provinceName ? this.provinceName : '',
      district : this.districtName ? this.districtName : '',
      street : this.wardName ? this.wardName : '',
      max_size : '10000',
      min_size : '0',
    }

    this.searchSerivce.search(searchReq).subscribe( (res : any)  =>{
      this.resultSearch = res.result.filter( item => {
        return item;
      });;
      this.search.emit();
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
