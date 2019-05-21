import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  dataNumNewRb : any;
  dataNumRbDis : any;
  areaRatio : string;
  userForRatio : string;
  totalRb : number;

  labelDis : any[];

  constructor(
    private http : HttpClient
  ) { }

  ngOnInit() {
    this.getStatistics().subscribe( (res: any) =>{
      this.dataNumNewRb = res.num_new_rb_byday;
      this.dataNumRbDis = res.num_rb_dis;
      this.totalRb = res.num_rb;
     

    });
  }

  getStatistics(){
    return this.http.post('/api/statis/get', {});
  }
}
