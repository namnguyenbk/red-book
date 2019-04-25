import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const addTransAPI = "/api/transaction/add"
const listTransAPI = "/api/transaction/list"
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http : HttpClient
  ) { }

  addTrans( data : any){
    return this.http.post(addTransAPI, data);
  }

  getType( type_id : string){
    if( type_id == "0"){
      return "Thừa kế (chuyển nhượng)";
    }
    if( type_id == "1"){
      return "Mua bán";
    }
  }

  getListTrans( listId, rbId){
    return this.http.post( listTransAPI, 
      { 
        rb_id : rbId,
        list_tran_id : listId
      }
      );
  }
}
