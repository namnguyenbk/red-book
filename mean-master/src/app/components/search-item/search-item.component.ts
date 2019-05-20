import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AddressService} from '../../services/common/address.service'

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.css']
})

export class SearchItemComponent implements OnInit, OnChanges {
  @Input() title : string;
  @Input() pretype : string;
  @Input() type : string;
  @Input() preId : string;

  @Output() onchange : EventEmitter<any> = new EventEmitter<any>(); 

  data : any;
  addr : any;
  constructor( private addrService : AddressService) { }

  ngOnInit() {
    if(this.type =="province"){
      this.data = this.addrService.getAdrrById( 'province', '0');
      this.data.push("Null");
    }
  }

  ngOnChanges(): void {
    if(this.type == "district"){
      this.data = this.addrService.getAdrrById("district", this.preId);
      this.data.push("Null");
    }else
    if(this.type == "ward"){
      this.data = this.addrService.getAdrrById("ward", this.preId);
      this.data.push("Null");
    }
  }

  changeId( ){
    this.onchange.emit(
      {
        "type": this.type,
        "id" : this.addr.code,
        "name" : this.addr.name,
  });
  }
 
}