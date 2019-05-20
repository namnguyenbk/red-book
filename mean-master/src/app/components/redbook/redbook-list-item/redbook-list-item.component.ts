import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RedbookService } from '../../../services/redbook.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-redbook-list-item',
  templateUrl: './redbook-list-item.component.html',
  styleUrls: ['./redbook-list-item.component.css']
})
export class RedbookListItemComponent implements OnInit {

  @Input() redbook : any;
  @Output() onAddTrans : EventEmitter<any> = new EventEmitter<any>(); 
  @Output() onDisplayMap : EventEmitter<any> = new EventEmitter<any>(); 
  @Output() onDelete : EventEmitter<any> = new EventEmitter<any>(); 
  @Output() onUploadImage : EventEmitter<any> = new EventEmitter<any>(); 
  isVisibleModalTrans : boolean;
  generalData : any
  constructor(
    private router : Router,
    private rbService : RedbookService,
  ) { }

  ngOnInit() {
    this.rbService.getDetail(this.redbook._id).subscribe( (res : any) =>{
      this.generalData = res;
    })
  }

  detail(){
    this.router.navigate(['/admin/detail/' + this.redbook._id]);
  }


  addTransEvent() {
    let data = {
      rbId : this.generalData.redbook._id,
      ownerId : this.generalData.owner._id,
      ownername : this.generalData.owner.fullname
    }
    this.onAddTrans.emit(data);
  }

  displayMapEvent() {
    // alert(this.generalData.images);
    let data = {
      area : this.redbook.area,
      address : this.generalData.address,
      ownername : this.generalData.owner.fullname,
      lat : this.generalData.lat,
      lng : this.generalData.lng,
      images : this.generalData.redbook.images
    }
    this.onDisplayMap.emit(data);
  }

  deleteEvent(){
    let rb_id = this.generalData.redbook._id;
    this.onDelete.emit( rb_id);
  }

  uploadImageEvent(){
    let rb_id = this.generalData.redbook._id;
    this.onUploadImage.emit(rb_id);
  } 

}
