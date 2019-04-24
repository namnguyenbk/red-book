import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { GuestRoutingModule} from './guest-routing.module';
import {CommonModuleUi} from '../common-ui-module.module';
import {SearchItemComponent} from '../components/search-item/search-item.component';
import { AddressComponent} from '../components/address/address.component'
@NgModule({
  imports: [
    CommonModule,
    CommonModuleUi,
    GuestRoutingModule,
  ],
  declarations: [
    GuestComponent,
    SearchItemComponent,
    AddressComponent
    ],
    exports:[
      GuestRoutingModule,
      SearchItemComponent,
      AddressComponent
    ]
})
export class GuestModule { }
