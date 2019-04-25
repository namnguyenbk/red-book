import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

import { AdminRoutingModule } from './admin-routing.module';
import { GuestModule} from '../guest/guest.module';
import {AdminComponent} from './admin.component';
import {OnlyAdminUsersGuard} from './admin-user-guard';
import { AddRedbookComponent } from '../admin/form/add-redbook/add-redbook.component';
import { AddAssetComponent } from './form/add-asset/add-asset.component';
import { AddPersonComponent } from './form/add-person/add-person.component';
import { AddTransComponent } from './form/add-trans/add-trans.component';
import { EditRedbookComponent } from './form/edit-redbook/edit-redbook.component';
import { EditPersonComponent } from './form/edit-person/edit-person.component';
import { CommonModuleUi } from '../common-ui-module.module';
import { RedbookListComponent } from './redbooks/redbooks.component';
import { ManageListComponent } from './manage-list/manage-list.component';
import { AddPartyComponent } from './add-party/add-party.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../../environments/environment';

// import { AddressComponent} from '../components/address/address.component';
@NgModule({
  declarations: [
    AdminComponent,
    AddRedbookComponent,
    AddAssetComponent,
    AddPersonComponent,
    AddTransComponent,
    EditRedbookComponent,
    EditPersonComponent,
    RedbookListComponent,
    ManageListComponent,
    AddPartyComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModuleUi,
    GuestModule,
    HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule
  ],
  providers: [
    OnlyAdminUsersGuard
  ]})
export class AdminModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}