import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { redbookData } from '../interface/common-interface';

const addRBAPI = "/api/redbook/add";
@Injectable({
  providedIn: 'root'
})
export class RedbookService {

  constructor( private http: HttpClient) { }
  
  getType( typeId : string){
    if(typeId == '1'){
      return 'Sử dụng chung';
    }else{
      if( typeId == '2'){
        return 'Sử dụng riêng';
      }
    }
    return 'Khác';
  }
  
  getuse_for( typeId : string){
    if(typeId == '1'){
      return 'Đất ở đô thị';
    }else{
      if( typeId == '2'){
        return 'Đất xây dựng công trình';
      }
    }
    return 'Khác';
  }

  getres( typeId : string){
    if(typeId == '1'){
      return 'Nhà nước công nhận quyền sử dụng và giao đất có thu tiền';
    }
    return 'Khác';
  }

  addRB( rbData : any){
    let redbook_id : string ;
    this.http.post(addRBAPI, rbData).subscribe( (res : any) => {
      if(res.code == '1000'){
        redbook_id = res.rb_id;
      }
      if(res.code == '1001'){

      }
    });
    return redbook_id;
  }
}
