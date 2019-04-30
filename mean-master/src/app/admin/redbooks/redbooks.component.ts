import { Component, OnInit, ViewChild } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { SearchService } from '../../services/search.service';
import { searchReq } from '../../interface/common-interface';

export interface dataAddTrans{
  rbId : string,
  ownerId : string,
  ownername : string
}

@Component({
  selector: 'app-redbooks',
  templateUrl: './redbooks.component.html',
  styleUrls: ['./redbooks.component.css']
})

export class RedbookListComponent implements OnInit {

  @ViewChild(SearchBarComponent) search : SearchBarComponent;
  numRedbook = 0;
  currentPage = 1;
  totalPage ;
  pageSize = 12;
  rbOnPage : any;
  redbooks : any;
  eventPageSize: IPageChangeEvent;
  isVisibleModalTrans: boolean;
  dataAddTrans : dataAddTrans;

  rbId : string;
  ownerId : string;
  ownername : string
  
  constructor(
    private searchService : SearchService) { }

  ngOnInit() {
    let searchTemp : searchReq =  {
      owner_name : '',
      province : '',
      district : '',
      street : '',
      max_size : '10000',
      min_size : '0',
    }
    this.searchService.search(searchTemp).subscribe( ( res : any) => {
      this.redbooks = res.result;
      this.redbooks = this.redbooks.filter( item => {
          return item;
        });
        this.rbOnPage = this.redbooks.slice(0, 12);
      this.numRedbook = this.redbooks ? this.redbooks.length : 0;
      this.totalPage = (this.numRedbook / 12).toFixed(0);
      this.pageSize = (this.numRedbook > 11)? 12 : this.numRedbook; 
    });
  }

  updateList(){
    this.redbooks = this.search.resultSearch;
    this.rbOnPage = this.redbooks.slice(0, this.pageSize);
  }

  changePager(event: IPageChangeEvent): void {
    this.eventPageSize = event;
    // this.currentPage = event.toRow;
    // this.pageSize = event.pageSize;
    // this.pageSize = this
  }

  onAddTrans( event : any){
    this.rbId = event.rbId;
    this.ownerId = event.ownerId;
    this.ownername = event.ownername;
    this.displayModalTrans();
  }

  displayModalTrans() {
    this.isVisibleModalTrans = true;
  }

  cancelModalTrans(){
    this.isVisibleModalTrans = false;
  }

}
