import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressComponent} from '../../../components/address/address.component';
import { personData, address} from '../../../interface/common-interface';
import { AddressService} from '../../../services/common/address.service';
@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit, OnChanges {

  @Input() personForm : FormGroup;
  @ViewChild(AddressComponent) addr : AddressComponent;
  personData : personData;
  addrOwner : address;

  constructor(private _formBuilder: FormBuilder, private addrService : AddressService) { 
  }

  ngOnInit() {
  }

  ngOnChanges(){
  }

  getPersonData() : personData{
    this.personData = {
      fname : this.personForm.get('fname').value,
      mname : this.personForm.get('mname').value,
      lname : this.personForm.get('lname').value,
      birth : this.personForm.get('birth').value,
      gender : this.personForm.get('gender').value,
      card_id : this.personForm.get('card_id').value,
      // postal_addr_id : this.addrService.addAdress(this.getPostalAddr),
      postal_addr_id : '',
    };
    return this.personData;
  }

  getPostalAddr() : address{
    this.addrOwner = {
      province : this.addr.provinceName,
      district : this.addr.districtName,
      street : this.addr.wardName,
      addr : this.addr.detail
    }
    return this.addrOwner;
  }

}
