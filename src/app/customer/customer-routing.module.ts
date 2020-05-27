import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListingComponent } from './pages/customer-listing/customer-listing.component';
import { AddCustomerComponent } from './pages/customer-listing/add-customer/add-customer.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerGroupComponent } from './pages/customer-group/customer-group.component';

const routes: Routes = [{

  path: '',
  children: [
    {
      path: '',
     component: CustomerLayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'customers',
          pathMatch: 'full'
        },
        {
          path: 'customers',
          component: CustomerListingComponent,
          data: {
            title: 'Customers'
          }, children :[
            {path:'', component:CustomerListingComponent},
            {path:'new', component:AddCustomerComponent},
          ]
        },
        {
          path: 'customer-groups',
          component: CustomerGroupComponent,
          data: {
            title: 'Customer Groups'
          }
        }
      ]
    }
  ]

}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
