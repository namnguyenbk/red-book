import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { RedbookService } from '../../../services/redbook.service';
import { TdMediaService } from '@covalent/core/media';

@Component({
  selector: 'app-redbook-list-item',
  templateUrl: './redbook-list-item.component.html',
  styleUrls: ['./redbook-list-item.component.css'],
  providers : [
    TdMediaService
  ]
})
export class RedbookListItemComponent implements OnInit {

  @Input() redbook : any;
  @Output() onAddTrans : EventEmitter<any> = new EventEmitter<any>(); 
  @Output() onDisplayMap : EventEmitter<any> = new EventEmitter<any>(); 
  @Output() onDelete : EventEmitter<any> = new EventEmitter<any>(); 
  @Output() onUploadImage : EventEmitter<any> = new EventEmitter<any>(); 
  isVisibleModalTrans : boolean;
  isAdmin : boolean;
  generalData : any
  constructor(
    private router : Router,
    private rbService : RedbookService,
    private media : TdMediaService,
  ) { }

  ngOnInit() {
    if( this.router.url.includes('admin')){
      this.isAdmin = true;
    }
    // this.router.url 
    this.rbService.getDetail(this.redbook._id).subscribe( (res : any) =>{
      this.generalData = res;
    });
  }

  detail(){
    if(this.isAdmin){
      this.router.navigate(['/admin/detail/' + this.redbook._id]);
    }else{
      this.router.navigate(['/control/detail/' + this.redbook._id]);
    }
    
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
