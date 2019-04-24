import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { DialogService } from '../../../services/common/dialog.service'
import { AssetService } from '../../../services/asset.service';
import { AddressService} from '../../../services/common/address.service';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css']
})
export class AddAssetComponent implements OnInit {
@Input() assetForm : FormGroup;
@Output() onComplete : EventEmitter<any> = new EventEmitter<any>();
image1 : any;
image2 : any;
images : Array<string>;
uploadProgress : any;
taskUpload : AngularFireUploadTask;

  constructor( 
    private _formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    private assetService : AssetService,
    private dialogSeervice : DialogService,
    private addrService : AddressService,) {
      this.images = new Array(2);
     }

  ngOnInit() {
    this.assetForm = this._formBuilder.group({
      area: ['', Validators.required],
      type: ['0', Validators.required],
      created: [ new Date(), Validators.required],
      detail: ['', Validators.required],
    })
  }

  onChangeImage(event, name ){
    if( name == 'image1'){
      this.image1 = event.target.files[0];
    }else{
      this.image2 = event.target.files[0];
    }
  }

  async upload() {
    const randomId1 = Math.random().toString(36).substring(2);
    const randomId2 = Math.random().toString(36).substring(2);

    let ref1  = this.afStorage.ref(randomId1);
    let ref2  = this.afStorage.ref(randomId2);

    await ref1.put(this.image1).then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      alert('nam1');
      const imageUrl1 = uploadSnapshot.downloadURL;
      this.images.push(imageUrl1);
     });

    await ref2.put(this.image2).then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      alert('NAM2');
      const imageUrl2 = uploadSnapshot.downloadURL;
      this.images.push(imageUrl2);
     });
    
  }

  async getDataAsset( rbId : string){

    var dateTime = this.assetForm.get('created').value ;
    await this.upload();
    alert('nam1');
    // ( async function(){
    //   await this.upload();
    // }());

    var asset :  any = {
      rb_id : rbId,
      type : this.assetService.getType(this.assetForm.get('type').value),
      area : this.assetForm.get('area').value,
      images : this.images,
      detail_info : this.assetForm.get('detail').value,
      date : dateTime.getDate() + '/'+ dateTime.getMonth()+ '/' + dateTime.getFullYear()
    }
    return asset;
  }

  // async upload2(){
  //   await this.upload();
  //   alert('nam');
  // }
  uploadAsset(data){
    return this.assetService.addAsset(data);
  }


  confirmComplete(){
    this.dialogSeervice.openConfirm('Xác nhận', 'Bạn đã kiểm tra kĩ các thông tin, vui lòng đồng ý để tiếp tục!')
    .afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.onComplete.emit();
      } else {
        
      }
    });
  }

}
