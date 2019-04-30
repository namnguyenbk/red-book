import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RedbookService } from '../../../services/redbook.service';

@Component({
  selector: 'app-redbook-info',
  templateUrl: './redbook-info.component.html',
  styleUrls: ['./redbook-info.component.css']
})
export class RedbookInfoComponent implements OnInit {

  rbId : string;
  redbookData : any;
  personData : any;
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private rbService : RedbookService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.rbId = params['redbook_id'];
      if (!this.rbId) this.router.navigate(['']);
      this.getGeneralData(this.rbId);
      });
  }

  getGeneralData(rbId){
    this.rbService.getDetail(rbId).subscribe( (res : any) =>{
      this.redbookData = res.redbook;
      this.personData = res.owner;
    });
  }

}
