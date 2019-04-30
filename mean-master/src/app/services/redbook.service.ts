import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { redbookData } from '../interface/common-interface';

const addRBAPI = "/api/redbook/add";
const changeOwnerAPI = "/api/person/change";
const detailAPI = "/api/redbook/getdetail";

@Injectable({
  providedIn: 'root'
})
export class RedbookService {

  constructor(private http: HttpClient) { }

  getType(typeId: string) {
    if (typeId == '1') {
      return 'Sử dụng chung';
    } else {
      if (typeId == '2') {
        return 'Sử dụng riêng';
      }
    }
    return 'Khác';
  }

  getuse_for(typeId: string) {
    if (typeId == '1') {
      return 'Đất ở đô thị';
    } else {
      if (typeId == '2') {
        return 'Đất xây dựng công trình';
      }
    }
    return 'Khác';
  }

  getres(typeId: string) {
    if (typeId == '1') {
      return 'Nhà nước công nhận quyền sử dụng và giao đất có thu tiền';
    }
    return 'Khác';
  }

  addRB(rbData: any) {
    // let redbook_id : string ;
    return this.http.post(addRBAPI, rbData);
  }

  changOwner( data){
    return this.http.post( changeOwnerAPI, data);
  }

  getDetail( rbId){
    return this.http.post( detailAPI, { rb_id : rbId});
  }

}
