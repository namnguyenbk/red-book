import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { RedbookService } from '../../../services/redbook.service';
import { AddressService } from '../../../services/common/address.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit, OnChanges {

  @Input() redbookData : any;
  @Input() personData : any;

  constructor(
    private personService: PersonService,
    private redbookService: RedbookService,
    private addrService : AddressService,
  ) { }

  ngOnInit() {
    this.getFullDetail();
  }

  ngOnChanges(){
  }

  getFullDetail( ){
    this.addrService.getAddr(this.redbookData.addr_id).subscribe( (res : any) => {
      if(res.full_addr){
        this.redbookData.address = res.full_addr;
        this.addrService.getAddr(this.personData.address_id).subscribe( (res : any) => {
          if(res.full_addr){
            this.personData.address = res.full_addr;
          }
        }) ;
      }
    }) ;

    this.personData.gender =  this.getGender( this.personData.gender);

  }

  getGender( genderId){
    if( genderId == "1"){
      return "Ông";
    }
    if( genderId == "2"){
      return "Bà";
    }
    return "";
  }


}
