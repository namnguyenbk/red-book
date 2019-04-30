import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CommonModuleUi} from './common-ui-module.module';

import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';
import { GuestModule } from './guest/guest.module';
import { AppRoutingModule } from './app-routing.module';
import { ImageViewerModule } from "ngx-image-viewer";


import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RedbooksComponent } from './components/redbook/redbooks/redbooks.component';
import { RedbookInfoComponent } from './components/redbook/redbook-info/redbook-info.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AssetInfoComponent} from './components/redbook/asset-info/asset-info.component';
import { TransactionInfoComponent} from './components/redbook/transaction-info/transaction-info.component';

import { TdDialogService} from '@covalent/core/dialogs';
import { TdLoadingService} from '@covalent/core/loading';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { AddressComponent } from './components/address/address.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { GeneralInfoComponent } from './components/redbook/general-info/general-info.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import { RedbookListComponent} from './admin/redbooks/redbooks.component'
import { RedbookListItemComponent } from './components/redbook/redbook-list-item/redbook-list-item.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RedbooksComponent,
    RedbookInfoComponent,
    SearchBarComponent,
    GeneralInfoComponent,
    AssetInfoComponent,
    TransactionInfoComponent,
    ImageViewComponent,
    RedbookListComponent,
    RedbookListItemComponent,
    // SearchItemComponent,
    // AddressComponent, 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AuthModule,
    AdminModule,
    GuestModule,
    AppRoutingModule,
    CommonModuleUi,
    ImageViewerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
  })
  ],
  exports:[
    CommonModuleUi,
  ],
  providers: [
    TdDialogService,
    TdLoadingService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  }
],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
