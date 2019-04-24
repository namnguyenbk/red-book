import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {searchReq, redbookData,redbookDetail} from '../interface/common-interface';

const searchApi = "/api/search"
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http : HttpClient) { }

  search( dataReq : searchReq) {
    return this.http.post(searchApi, dataReq);
  }
}
