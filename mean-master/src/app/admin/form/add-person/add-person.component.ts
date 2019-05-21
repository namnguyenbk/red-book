import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AddressComponent } from '../../../components/address/address.component';
import { personData, address } from '../../../interface/common-interface';
import { AddressService } from '../../../services/common/address.service';
import { PersonService } from '../../../services/person.service';
import { DialogService } from '../../../services/common/dialog.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit, OnChanges {
  dateTime: Date;
  @Input() personForm: FormGroup;
  @ViewChild('addrOwner') addr: AddressComponent;
  personData: personData;
  addrOwner: any;
  addr_id : string;
  owner_id : string;
  address : string;

  breakpoint : number;

  constructor(private _formBuilder: FormBuilder,
    private addrService: AddressService,
    private personService: PersonService,
    private dialog: DialogService,
  ) {
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 700) ? 1 : 3; 
  }

  ngOnChanges() {
  }

   getPersonData( addr_id) {
    this.dateTime = this.personForm.get('birthDay').value;
    return  this.personData = {
      fname: this.personForm.get('fname').value,
      mname: this.personForm.get('mname').value,
      lname: this.personForm.get('lname').value,
      birth: this.addrService.getDate(this.dateTime),
      gender: this.personForm.get('gender').value,
      card_id: this.personForm.get('card_id').value,
      postal_addr_id: addr_id
    };
  }

  getPostalAddr() {
    
    // return this.addrOwner = {
    //   province: this.addr.provinceName? this.addr.provinceName : 'Hà Nội',
    //   district: this.addr.districtName? this.addr.districtName : 'Hai Bà Trưng',
    //   street: this.addr.wardName? this.addr.wardName : 'Bách Khoa',
    //   address: this.addr.detail? this.addr.detail : '43 Trần Đại Nghĩa',
    // }
    return this.addrOwner = this.addrService.getAddressDetail(this.address);

  }

  uploadPersonData( data){
    return this.personService.addPerson( data);
  }

  getDate() {
    // this.setPersonData();
    // this.addrOwner = {
    //   province: this.addr.provinceName,
    //   district: this.addr.districtName,
    //   street: this.addr.wardName,
    //   address: this.addr.detail,
    // }
    // var id = this.addrService.addAdress(this.addrOwner);
    // alert(id);

    // return this.setPersonData() ;
    // this.getPersonData();
    //  let id = await this.addrService.addAdress(this.addrOwner);
    //  alert(id);

    // alert( this.addr.provinceName + ' ' + this.addr.districtName + ' ' + this.addr.wardName + ' ' + this.addr.detail);
    // this.dateTime = this.personForm.get('birthDay').value;
    // alert( this.dateTime.getDate() + '/'+ this.dateTime.getMonth()+ '/' + this.dateTime.getFullYear());
  }

  getAddress(place: object) {
     let address = place['formatted_address'];
     this.address = address;
    //  alert(place);
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 700) ? 1 : 3;
  }

}
