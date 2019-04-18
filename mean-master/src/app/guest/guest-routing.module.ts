import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GuestComponent} from '../guest/guest.component';
import {RedbooksComponent} from '../components/redbook/redbooks/redbooks.component';

const routes: Routes = [
  {
  path: 'control',
  component: GuestComponent,
  children: [
    {
      path: 'query',
      component: RedbooksComponent,
    },
    // {
    //   path: 'test2',
    //   component: ManageListComponent,
    // },
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class GuestRoutingModule { }
