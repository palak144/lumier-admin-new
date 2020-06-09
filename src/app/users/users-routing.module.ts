import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { ExpertListingComponent } from './pages/expert-listing/expert-listing.component';
import { ProfessionalListingComponent } from './pages/professional-listing/professional-listing.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: UsersLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full'
      },
      {
        path: 'expert-listing',
        component: ExpertListingComponent
      },
      {
        path: 'professional-listing',
        component: ProfessionalListingComponent
      },
      {
        path: 'detail/:id',
        component: DetailComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
