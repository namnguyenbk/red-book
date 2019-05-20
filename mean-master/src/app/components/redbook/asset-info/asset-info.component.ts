import { Component, OnInit, Input } from '@angular/core';
import { AssetService } from '../../../services/asset.service';
import { TdMediaService } from '@covalent/core/media';
@Component({
  selector: 'app-asset-info',
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.css'],
  providers : [TdMediaService]
})
export class AssetInfoComponent implements OnInit {

  @Input() rbId : string;
  assetData : any;
  image = [
    "https://firebasestorage.googleapis.com/v0/b/redbook-c0408.appspot.com/o/0efgggjfn03s?alt=media&token=3f994393-3185-4c3b-8f06-6286781e1101",
    "https://firebasestorage.googleapis.com/v0/b/redbook-c0408.appspot.com/o/q5e3hdy2yme?alt=media&token=069a7e77-073c-4be7-ae1d-bc440b31f8ec"
  ]
  constructor(
    private assetService : AssetService,
    private media : TdMediaService,
  ) { }

  ngOnInit() {
    this.assetService.getListAsset(this.rbId).subscribe ((res : any) =>{
      this.assetData = res.assets;      
    })
  }

}
