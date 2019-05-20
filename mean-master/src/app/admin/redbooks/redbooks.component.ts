import { Component, OnInit, ViewChild } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SearchService } from '../../services/search.service';
import { searchReq } from '../../interface/common-interface';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { RedbookService } from '../../services/redbook.service';
import { DialogService } from '../../services/common/dialog.service';
import { LoadingEffectService } from '../../services/common/loading-effect.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

export interface dataAddTrans{
  rbId : string,
  ownerId : string,
  ownername : string
}

@Component({
  selector: 'app-redbooks',
  templateUrl: './redbooks.component.html',
  styleUrls: ['./redbooks.component.css']
})

export class RedbookListComponent implements OnInit {

  @ViewChild(SearchBarComponent) search : SearchBarComponent;
  numRedbook = 0;
  currentPage = 1;
  totalPage ;
  pageSize = 12;
  rbOnPage : any;
  redbooks : any;
  eventPageSize: IPageChangeEvent;
  isVisibleModalTrans: boolean;
  isVisibleModalMap: boolean;
  isVisibleModalUpload : boolean;
  isVisibleConfirm : boolean;
  dataAddTrans : dataAddTrans;
  image : any;
  imageLink : string;
// item click data
  rbId : string;
  images : string;
  ownerId : string;
  ownername : string;
  address : string;
  area : string;
  lat : string;
  lng : string;

  
  constructor(
    private searchService : SearchService,
    private afStorage: AngularFireStorage,
    private rbService : RedbookService,
    private dialogService : DialogService,
    private loadingEffect : LoadingEffectService,
    private router: Router,
    private authService : AuthService) { }

  ngOnInit() {
    // if(!localStorage.getItem('AuthToken')){
    //   this.router.navigate(['/auth/login'])
    // }
    let searchTemp : searchReq =  {
      owner_name : '',
      province : '',
      district : '',
      street : '',
      max_size : '10000',
      min_size : '0',
    }
    this.searchService.search(searchTemp).subscribe( ( res : any) => {
      this.redbooks = res.result;
      this.redbooks = this.redbooks.filter( item => {
          return item;
        });
        this.rbOnPage = this.redbooks.slice(0, 12);
      this.numRedbook = this.redbooks ? this.redbooks.length : 0;
      this.totalPage = (this.numRedbook / 12).toFixed(0);
      this.pageSize = (this.numRedbook > 11)? 12 : this.numRedbook; 
    });
  }

  updateList(){
    this.redbooks = this.search.resultSearch;
    this.rbOnPage = this.redbooks.slice(0, this.pageSize);
  }

  changePager(event: IPageChangeEvent): void {
    this.eventPageSize = event;
    // this.currentPage = event.toRow;
    // this.pageSize = event.pageSize;
    // this.pageSize = this
  }

  onAddTrans( event : any){
    this.rbId = event.rbId;
    this.ownerId = event.ownerId;
    this.ownername = event.ownername;
    this.displayModalTrans();
  }

  onDisplayMap( event : any){
    this.rbId = event.rbId;
    this.area = event.area;
    this.ownername = event.ownername;
    this.address = event.address;
    this.lat = event.lat;
    this.lng = event.lng;
    this.images = event.images;
    this.displayModalMap();
  }

  onChangeImage( event){
    this.image = event.target.files[0];
  }

  onDelete( event){
    this.rbId = event.rbId;
    this.displayConfirmDelete();
  }

  onUploadImage( event){
    this.rbId = event;
    this.displayModalUpload();
  }

  onSaveImage(){
    this.cancelModalUpload();
    let randomId = this.rbId;
    let ref = this.afStorage.ref(randomId);
    this.loadingEffect.showLoading();
    ref.put(this.image).then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
        this.afStorage.ref(randomId).getDownloadURL().subscribe(url => {
          this.imageLink = url;
          let updateData : any = {
            rb_id: this.rbId,
            images: this.imageLink
          }
          console.log(url);
          this.rbService.update(updateData).subscribe((res: any) => {
            this.loadingEffect.stopLoading();
            if (res.code == "1000") {
              // this.dialogService.showNotification("Upload ảnh", "Upload ảnh thành công", "success");
              this.dialogService.showNotify("success","Upload ảnh","Upload ảnh thành công");
              this.updateList();
            } else {
              // this.dialogService.showNotification("Upload ảnh", "Upload ảnh thất bại", "fail");
              this.dialogService.showNotify("error","Upload ảnh","Upload ảnh thất bại");
            }
          })
        })
     });
  }

  displayModalTrans() {
    this.isVisibleModalTrans = true;
  }

  cancelModalTrans(){
    this.isVisibleModalTrans = false;
  }

  displayModalMap() {
    this.isVisibleModalMap = true;
  }

  cancelModalMap(){
    this.isVisibleModalMap = false;
  }

  displayModalUpload() {
    this.isVisibleModalUpload = true;
  }

  cancelModalUpload(){
    this.isVisibleModalUpload = false;
  }

  displayConfirmDelete() {
    this.isVisibleConfirm = true;
  }

  cancelConfirmDelete(){
    this.isVisibleConfirm = false;
  }

}
