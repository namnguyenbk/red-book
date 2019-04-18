import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }
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
}
