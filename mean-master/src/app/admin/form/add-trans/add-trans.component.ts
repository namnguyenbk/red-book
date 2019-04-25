import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AddressService } from '../../../services/common/address.service';
import { TransactionService } from '../../../services/transaction.service';
import { PersonService } from '../../../services/person.service';
import { DialogService } from '../../../services/common/dialog.service';
import { RedbookService } from '../../../services/redbook.service';

@Component({
  selector: 'app-add-trans',
  templateUrl: './add-trans.component.html',
  styleUrls: ['./add-trans.component.css']
})
export class AddTransComponent implements OnInit {

  listOwner : any;
  isHasOwner : true;
  type : string;
  amount : Number;
  date = new Date();
  detail : "";
  new_owner : "";
  
  rb_id : string;
  myOwner = new FormControl();
  listOwnerName = [];
  filteredOptions: Observable<string[]>;
  personFormGroup : FormGroup;
  _formBuilder: FormBuilder;

  constructor( 
    private addService : AddressService,
    private transService : TransactionService,
    private personService : PersonService,
    private dialog : DialogService,
    private rbService : RedbookService

  ) { 
    
  }

  ngOnInit() {
    this.personService.getListPerson().subscribe( (res : any) => {
      var i = 0;
      res.list_owner.forEach( owner => {
        if( owner._id){
          this.listOwnerName.push({
            id : "OWNER120"+ i,
            owner_id : owner._id,
            owner_name : owner.fullname,
            code : owner.fullname + "- OWNER120" + i
          });
          i++;
        }
      });
    })

    this.filteredOptions = this.myOwner.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
   

    // this.personFormGroup = this._formBuilder.group({
    //   fname: ['', Validators.required],
    //   mname: ['', Validators.required],
    //   lname: ['', Validators.required],
    //   birthDay: [new Date(), Validators.required],
    //   gender: ['2', Validators.required],
    //   card_id: ['', Validators.required],
    // });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.listOwnerName.filter(option => option.owner_name.toLowerCase().includes(filterValue));
    // return this.listOwnerName.filter(option => option.owner_name.toLowerCase().indexOf(filterValue) === 0);
  }

  addTrans(){
    alert( this.type);
    let transData : any = {
      rb_id : "5cc0ac901977554034f70d5d",
      owner_old : "5cc0ac901977554034f70d5b",
      owner_id : this.getOnwerId(this.myOwner.value),
      transaction_amount : this.amount,
      type : this.transService.getType(this.type),
      created : this.addService.getDate(this.date),
      description : this.detail
    }
    
    this.transService.addTrans(transData).subscribe( (res : any) => {
      if( res.code == "1000"){
        this.rbService.changOwner({
          rb_id : "5cc0ac901977554034f70d5d",
          owner_id : transData.owner_id
        }).subscribe( (res : any) => {
          if( res.code == "1000"){
            this.dialog.showNotification("OK", "Thêm giao dịch thành công!", "success");
          }
        })
      }else{
        this.dialog.showNotification("OK", "Có lỗi khi thêm giao dịch!", "warn");
      }
    })
  }

  getOnwerId( code : string){
    var pos_ = code.indexOf("-");
    var code = code.slice( pos_ + 2, code.length  ); 
    var ownerid = "";
    this.listOwnerName.forEach( owner =>{
      // alert(code)
      // alert(owner.id)

      if( owner.id === code){
        alert(ownerid)
        ownerid = owner.owner_id;
      }
    })
    return ownerid;
    // alert(code.slice(0, pos_ ));
  }

  // displayWith(key) {
  //   if( this.listOwnerName){
  //     let selection : any = this.listOwnerName.filter(e => e.owner_id === key);
  //   if (selection)
  //   return selection.owner_name;
  //   }
  //  return ''; 
  // }
}
