import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnlyAdminUsersGuard } from './admin-user-guard';

import { AdminComponent } from './admin.component';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { ManageListComponent } from './manage-list/manage-list.component';
import { RedbooksComponent} from '../components/redbook/redbooks/redbooks.component';
import { RedbookListComponent} from './redbooks/redbooks.component';
import { AddPartyComponent} from '../admin/add-party/add-party.component';
import { RedbookInfoComponent} from '../components/redbook/redbook-info/redbook-info.component'
const routes: Routes = [
  {
  path: 'admin',
  canActivate: [OnlyAdminUsersGuard],
  component: AdminComponent,
  children: [
    {
      path: 'add',
      component: AddPartyComponent,
    },
    {
      path: 'query',
      component: RedbooksComponent,
    },
    {
      path: 'list',
      component: RedbookListComponent,
    },
    {
      path: 'detail/:redbook_id',
      component: RedbookInfoComponent,
    },
    
  ]
},
// {
//   path: 'admin/:action',
//   component: AdminComponent,
//   canActivate: [OnlyAdminUsersGuard],
//   children: [
//     { path: 'test1', component: SearchBarComponent },
//     { path: 'test2', component: ManageListComponent }
//   ],
// }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
