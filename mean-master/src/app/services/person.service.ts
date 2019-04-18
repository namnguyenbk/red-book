import { Injectable } from '@angular/core';
import { personData, address} from '../interface/common-interface';
import { HttpClient } from '@angular/common/http';
const addPersonAPI = "/api/person/add";
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
}
