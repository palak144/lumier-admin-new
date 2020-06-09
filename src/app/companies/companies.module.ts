import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesLayoutComponent } from './companies-layout/companies-layout.component';
import { CompanyListingComponent } from './pages/company-listing/company-listing.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [CommonModule, CompaniesRoutingModule, SharedModule],
  declarations: [CompaniesLayoutComponent, CompanyListingComponent]
})
export class CompaniesModule { }
