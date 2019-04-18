import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { DialogService } from '../../../services/common/dialog.service'
import { map } from 'rxjs/operators';

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
taskUpload : any;
  constructor( 
    private _formBuilder: FormBuilder,
    private afStorage: AngularFireStorage,
    private dialogSeervice : DialogService) {
      this.images = new Array(2);
     }

  ngOnInit() {
    this.assetForm = this._formBuilder.group({
      area: ['', Validators.required],
      type: ['0', Validators.required],
      created: [''],
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

  upload() {
    const randomId1 = Math.random().toString(36).substring(2);
    const randomId2 = Math.random().toString(36).substring(2);

    let ref1  = this.afStorage.ref(randomId1);
    let ref2  = this.afStorage.ref(randomId2);

    this.taskUpload = ref1.put(this.image1);
    this.uploadProgress = this.taskUpload.percentageChanges();
    this.images.push(this.taskUpload.downloadURL());

    this.taskUpload = ref2.put(this.image2);
    this.uploadProgress = this.taskUpload.percentageChanges();
    this.images.push(this.taskUpload.downloadURL());
    
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
