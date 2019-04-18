import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchBarComponent} from '../../search-bar/search-bar.component';

@Component({
  selector: 'app-redbooks',
  templateUrl: './redbooks.component.html',
  styleUrls: ['./redbooks.component.css']
})
export class RedbooksComponent implements OnInit {
  @ViewChild(SearchBarComponent) search : SearchBarComponent;

  // redbooks = this.search.resultSearch;
  redbooks = [
    {
      "header" : "TEST CARD",
      "title" : "TEST TITLE",
      "content" : "TEST CONTENT"
    },
    {
      "header" : "TEST CARD",
      "title" : "TEST TITLE",
      "content" : "TEST CONTENT"
    },
    {
      "header" : "TEST CARD",
      "title" : "TEST TITLE",
      "content" : "TEST CONTENT"
    },
    {
      "header" : "TEST CARD",
      "title" : "TEST TITLE",
      "content" : "TEST CONTENT"
    },
    {
      "header" : "TEST CARD",
      "title" : "TEST TITLE",
      "content" : "TEST CONTENT"
    },
  ]



  constructor() { }

  ngOnInit() {
  }

}
