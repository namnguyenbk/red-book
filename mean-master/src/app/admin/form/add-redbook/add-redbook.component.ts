import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddressComponent} from '../../../components/address/address.component';
import { redbookData, address} from '../../../interface/common-interface';
import { AddressService} from '../../../services/common/address.service';
import { RedbookService} from '../../../services/redbook.service';
@Component({
  selector: 'app-add-redbook',
  templateUrl: './add-redbook.component.html',
  styleUrls: ['./add-redbook.component.css']
})
export class AddRedbookComponent implements OnInit {

  @Input() redbookForm : FormGroup;
  @ViewChild('addrRB') addrRB : AddressComponent;
  rb_data : any;
  addr : address;
  exp : any;
  constructor(
    private _formBuilder: FormBuilder,
    private addrService : AddressService,
    private rbService : RedbookService) {
   }

  ngOnInit() {
  }

  getRBData( owner_id : string){
    return this.rb_data = {
      owner_id : owner_id,
      area : this.redbookForm.get('area').value,
      type : this.rbService.getType( this.redbookForm.get('type').value ),
      exp : this.redbookForm.get('exp').value,
      created : this.addrService.getDate(new Date()).toString(),
      no_license : this.redbookForm.get('num_license').value,
      use_for : this.rbService.getuse_for(this.redbookForm.get('use_for').value),
      no_land : this.redbookForm.get('no_land').value,
      source_provide : this.rbService.getres(this.redbookForm.get('source_provide').value),
      address : this.addrRB.detail? this.addrRB.detail : '',
      street : this.addrRB.wardName,
      district : this.addrRB.districtName,
      province : this.addrRB.provinceName,
    }
  }

  uploadRBData( data){
    return this.rbService.addRB(data);
  }

  display(){
    alert(this.redbookForm.get('exp').value);
  }

}
