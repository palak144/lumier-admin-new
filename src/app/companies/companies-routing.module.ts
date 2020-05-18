import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesLayoutComponent } from './companies-layout/companies-layout.component';
import { CompanyListingComponent } from './pages/company-listing/company-listing.component';

const routes: Routes = [
  {
    path: '',
    component: CompaniesLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full'
      },
      {
        path: 'listing',
        component: CompanyListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniesRoutingModule { }
