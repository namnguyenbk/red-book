import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { AddRedbookComponent } from '../form/add-redbook/add-redbook.component';
import { AddPersonComponent } from '../form/add-person/add-person.component';
import { AddAssetComponent } from '../form/add-asset/add-asset.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.css']
})
export class AddPartyComponent implements OnInit {

  @ViewChild(AddRedbookComponent) redbookForm: AddRedbookComponent;
  @ViewChild(AddPersonComponent) personForm: AddPersonComponent;
  @ViewChild(AddAssetComponent) asset: AddAssetComponent;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      fname: ['', Validators.required],
      mname: ['', Validators.required],
      lname: ['', Validators.required],
      birthDay: ['', Validators.required],
      gender: ['2', Validators.required],
      card_id: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      area: ['', Validators.required],
      no_land: ['', Validators.required],
      type: [''],
      use_for: ['0'],
      exp: ['50', Validators.required],
      num_license: [''],
      source_provide: [''],

    });

    this.thirdFormGroup = this._formBuilder.group({
      area: ['', Validators.required],
      type: ['', Validators.required],
      created : [''],
      images : ['', Validators.required],
      detail : ['']
    });
  }

  completeAdd(){
    
  }
}
