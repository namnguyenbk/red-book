import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const addAssetAPI = "/api/asset/add";
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
}
