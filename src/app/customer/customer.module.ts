import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListingComponent } from './pages/customer-listing/customer-listing.component';
import { SharedModule } from 'app/shared/shared.module';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { AddCustomerComponent } from './pages/customer-listing/add-customer/add-customer.component';
import { CustomerGroupComponent } from './pages/customer-group/customer-group.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CustomerRoutingModule
  ],
  declarations: [CustomerListingComponent, CustomerLayoutComponent, AddCustomerComponent , CustomerGroupComponent]
})
export class CustomerModule {  }
