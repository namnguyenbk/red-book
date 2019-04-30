import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import dataProvince from '../local-data/tinh_tp.json';
import dataDistrict from '../local-data/quan_huyen.json';
import dataWard from '../local-data/xa_phuong.json';
import {address} from '../../interface/common-interface';

const addAdressAPI = "/api/address/add";
const getAdressAPI = "/api/address/get";

var provinces: Array<any> = (<any>dataProvince);
provinces = converJSONtoArray(provinces);

var disctricts: Array<any> = (<any>dataDistrict);
disctricts = converJSONtoArray(disctricts);

var wards: Array<any> = (<any>dataWard);
wards = converJSONtoArray(wards);

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getAdrrById(type, preId) {
    if (type == 'province') {
      return provinces;
    }
    if (type == 'district') {
      return filterAddr(disctricts, preId);
    }
    if (type == 'ward') {
      return filterAddr(wards, preId);
    }
  }

  addAdress(addrData : address) {
     return this.http.post(addAdressAPI, addrData);
  }

  async addLox(){
    var addr_id;
    await this.http.post(addAdressAPI, null).toPromise().then( (res: any) =>{
       addr_id = res.addr_id;
       return addr_id;
    });
  }

  getDate( dateTime : Date){
    return dateTime.getDate() + '/'+ dateTime.getMonth()+ '/' + dateTime.getFullYear();
  }

  getAddr( addrId : string){
    return this.http.post(getAdressAPI, { addr_id : addrId});
  }


}

export function converJSONtoArray(data) {
  var result = [];
  var keys = Object.keys(data);
  keys.forEach(function (key) {
    result.push(data[key]);
  });
  return result;
}

export function filterAddr(data, preId) {
  var result = data.filter(item => {
    if (item.parent_code.toString() == preId) {
      return true;
    }
  });
  return result;
}

