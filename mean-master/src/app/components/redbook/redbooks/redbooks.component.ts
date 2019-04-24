import { Component, OnInit, ViewChild, AfterContentInit, AfterContentChecked } from '@angular/core';
import { SearchBarComponent} from '../../search-bar/search-bar.component';
import { redbookData, searchReq } from '../../../interface/common-interface';
import { SearchService } from '../../../services/search.service';
import { IPageChangeEvent } from '@covalent/core/paging';

@Component({
  selector: 'app-redbooks',
  templateUrl: './redbooks.component.html',
  styleUrls: ['./redbooks.component.css']
})
export class RedbooksComponent implements OnInit, AfterContentChecked {
  
  @ViewChild(SearchBarComponent) search : SearchBarComponent;
  numRedbook = 0;
  currentPage = 1;
  totalPage ;
  pageSize = 0;
  rbOnPage : any;
  redbooks : any;
  eventPageSize: IPageChangeEvent;

  constructor( private searchService : SearchService) { }

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
        this.rbOnPage = this.redbooks.slice(0, 6);
      this.numRedbook = this.redbooks ? this.redbooks.length : 0;
      this.totalPage = (this.numRedbook / 6).toFixed(0);
      this.pageSize = (this.numRedbook > 5)? 6 : this.numRedbook; 
    });
  }

  ngAfterContentChecked(): void {
   
  }

  updateList(){
    this.redbooks = this.search.resultSearch;
  }

  changePageSize(event: IPageChangeEvent): void {
    this.currentPage
    this.eventPageSize = event;
  }

}
