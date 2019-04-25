import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const assetDetailAPI = "/asset/get";
const addAssetAPI = "/api/asset/add";
const uploadAPI = "/api/asset/upload_image";
@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(
    private http : HttpClient
  ) { }

  getType( type_id : string) : string{
    if( type_id == '0'){
      return 'Xây nhà hợp pháp';
    }
    if( type_id == '1'){
      return 'Mua nhà theo Nghị định 61/CP';
    }
    if( type_id == '2'){
      return 'Nhà được cấp theo quy định';
    }
    return 'Khác';
  }

  addAsset( data : any){
    return this.http.post( addAssetAPI, data);
  }

  uploadImage( data : any){
    return this.http.post ( uploadAPI, data);
  }

  getListAsset( rdId){
    return this.http.post( assetDetailAPI, { rb_id : rdId});
  }

}
