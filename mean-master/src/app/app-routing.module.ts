import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { ImageViewComponent } from './components/image-view/image-view.component';
import {RedbookListComponent} from './admin/redbooks/redbooks.component';
const routes: Routes = [{
  path: '',
  component: RedbookListComponent
}, {
  path: 'auth',
  loadChildren: 'app/auth/auth.module#AuthModule'
}, {
  path: 'admin',
  loadChildren: 'app/admin/admin.module#AdminModule'
},
{
  path: 'control',
  loadChildren: 'app/guest/guest.module#GuestModule'
},
{
  path: 'testimageview',
  component: ImageViewComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: []
})

export class AppRoutingModule {}
