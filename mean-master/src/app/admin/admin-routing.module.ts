import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './admin.component';
// import { SearchBarComponent } from '../components/search-bar/search-bar.component';
// import { ManageListComponent } from './manage-list/manage-list.component';
// import { RedbooksComponent} from '../components/redbook/redbooks/redbooks.component';
import { RedbookListComponent} from './redbooks/redbooks.component';
import { AddPartyComponent} from '../admin/add-party/add-party.component';
import { RedbookInfoComponent} from '../components/redbook/redbook-info/redbook-info.component'
import { MapComponent } from '../components/map/map.component';
import { ChartsComponent } from './charts/charts.component';
import { AuthGuard } from '../auth/auth-guard.service';
const routes: Routes = [
  {
  path: 'admin',
  canActivate : [AuthGuard],
  component: AdminComponent,
  children: [
    {
      path: '',
      component: RedbookListComponent,
    },
    {
      path: 'add',
      component: AddPartyComponent,
    },
    {
      path: 'map',
      component: MapComponent,
    },
    {
      path: 'list',
      component: RedbookListComponent,
    },
    {
      path: 'detail/:redbook_id',
      component: RedbookInfoComponent,
    },
    {
      path: 'chart',
      component: ChartsComponent,
    },
    
  ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
