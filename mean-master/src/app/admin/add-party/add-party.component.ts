import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { AddRedbookComponent } from '../form/add-redbook/add-redbook.component';
import { AddPersonComponent } from '../form/add-person/add-person.component';
import { AddAssetComponent } from '../form/add-asset/add-asset.component';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DialogService } from '../../services/common/dialog.service';
import { Router } from '@angular/router';
import { AddressService } from '../../services/common/address.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent implements OnInit {

  @ViewChild('redbook') redbookForm: AddRedbookComponent;
  @ViewChild('person') personForm: AddPersonComponent;
  @ViewChild('asset') asset: AddAssetComponent;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: DialogService,
    private router: Router,
    private addrService: AddressService
  ) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      birthDay: [new Date(), Validators.required],
      gender: ['2', Validators.required],
      card_id: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      area: ['0', Validators.required],
      no_land: ['0', Validators.required],
      type: ['1'],
      use_for: ['1'],
      exp: ['50', Validators.required],
      num_license: [''],
      source_provide: ['1'],

    });

    this.thirdFormGroup = this._formBuilder.group({
      area: ['0', Validators.required],
      type: ['1', Validators.required],
      created: [''],
      images: ['', Validators.required],
      detail: ['']
    });
  }

  completeAdd() {
    var person_id, rb_id, asset_id;
    this.addrService.addAdress(this.personForm.getPostalAddr()).subscribe((res: any) => {
      if (res.code == '1000') {
        let addrPerson_id = res.addr_id;
        let personData = this.personForm.getPersonData(addrPerson_id);
        this.personForm.uploadPersonData(personData).subscribe((res: any) => {
          if (res.code == '1000') {
            person_id = res.owner_id;
            let rbData = this.redbookForm.getRBData(person_id);
            this.redbookForm.uploadRBData(rbData).subscribe((res: any) => {
              if (res.code == '1000') {
                rb_id = res.rb_id;
                // this.asset.getDataAsset(rb_id).then((assetData: any) => {
                  this.asset.uploadAsset(this.asset.getDataAsset(rb_id)).subscribe((res: any) => {
                    if (res.code == '1000') {
                      asset_id = res.asset_id;
                      this.dialog.showNotification('Thành công', 'Đã thêm thông tin về chủ sở hữu, đất, tài sản thành công!', 'success');
                      this.asset.uploadMediaAsset(asset_id, rb_id);
                      this.router.navigate(['/admin/add']);
                    }else{
                      this.dialog.showNotification('Thất bại', 'Có lỗi khi thêm thông tin sổ đỏ', 'error');
                    }
                  })
                // });
              }
            })
          }
        })
      }
    });
    // this.addrService.addAdress(this.personForm.getPostalAddr())
    //         .map((res : Response) => res.json())
    //         .mergeMap(addr_id => {
    //           if (addr_id) {
    //             return this.personForm.uploadPersonData(this.personForm.getPersonData(addr_id));
    //           }
    //         })
    //         .map((res: Response) => res.json())
    //         .mergeMap(res => {

    //         });


    // this.personForm.setPersonData();
    // var owner_id = this.personForm.owner_id;
    // var rb_id;
    // if( owner_id){
    //   alert('nam');
    //   this.redbookForm.setRBData(owner_id);
    //   rb_id = this.redbookForm.uploadRBData();
    //   if(rb_id){
    //    var asset_id = this.asset.setDataAsset(rb_id);
    //    if( asset_id){
    //      this.dialog.showNotification('Thành công', 'Đã thêm thông tin về chủ sở hữu, đất, tài sản thành công!', 'success');
    //      this.router.navigate(['/admin/add']);
    //    }
    //   }
    // }
    // this.dialog.showNotification('Thất bại', 'Có lỗi khi thêm thông tin sổ đỏ', 'error');
  }
}
