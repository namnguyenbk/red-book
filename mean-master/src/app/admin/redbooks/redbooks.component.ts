import { Component, OnInit, ViewChild } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SearchService } from '../../services/search.service';
import { searchReq } from '../../interface/common-interface';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { RedbookService } from '../../services/redbook.service';
import { DialogService } from '../../services/common/dialog.service';

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
  ownerId : string;
  ownername : string;
  address : string;
  area : string;

  
  constructor(
    private searchService : SearchService,
    private afStorage: AngularFireStorage,
    private rbService : RedbookService,
    private dialogService : DialogService) { }

  ngOnInit() {
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
    this.address = event.address
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
    this.rbId = event.rbId;
    this.displayModalUpload();
  }

  onSaveImage(){
    let randomId = this.rbId;
    let ref = this.afStorage.ref(randomId);
    ref.put(this.image).then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
        this.afStorage.ref(randomId).getDownloadURL().subscribe(url => {
          this.imageLink = url;
          let imageData = {
            rb_id: this.rbId,
            image: this.imageLink
          }
          console.log(url);
          this.rbService.uploadImage(imageData).subscribe((res: any) => {
            if (res.code == "1000") {
              this.dialogService.showNotification("Upload ảnh", "Upload ảnh thành công", "success");
            } else {
              this.dialogService.showNotification("Upload ảnh", "Upload ảnh thất bại", "success");
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
