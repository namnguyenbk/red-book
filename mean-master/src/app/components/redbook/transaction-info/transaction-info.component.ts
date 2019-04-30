import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../../../services/transaction.service';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.css']
})
export class TransactionInfoComponent implements OnInit {

  @Input() rbId : string;
  @Input() listTransId : any;
  listTrans : Array<any>;
  
  constructor(
    private transService : TransactionService
  ) { }

  ngOnInit() {
    this.transService.getListTrans(this.listTransId, this.rbId).subscribe( (res : any) => {
      this.listTrans = res.trans_data;
    });
  }

}
