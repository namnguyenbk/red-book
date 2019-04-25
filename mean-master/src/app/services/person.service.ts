import { Injectable } from '@angular/core';
import { personData, address} from '../interface/common-interface';
import { HttpClient } from '@angular/common/http';

const addPersonAPI = "/api/person/add";
const listPersonAPI= "/api/person/list";
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor( private http: HttpClient) { }
  getGender( typeId : string){
    if(typeId == '1'){
      return 'Nam';
    }else{
      if( typeId == '2'){
        return 'Nữ';
      }
    }
    return 'Khác';
  }

  addPerson( data : personData){
    return this.http.post(addPersonAPI, data);
  }

  getListPerson(){
    return this.http.post( listPersonAPI, {});
  }
}
