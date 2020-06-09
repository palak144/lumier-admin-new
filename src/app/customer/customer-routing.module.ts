import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListingComponent } from './pages/customer-listing/customer-listing.component';
import { AddCustomerComponent } from './pages/customer-listing/add-customer/add-customer.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerGroupComponent } from './pages/customer-group/customer-group.component';
import { AddCustomerGroupComponent } from './pages/customer-group/add-customer-group/add-customer-group.component';

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
<<<<<<< HEAD
          path: 'customer-groups',
          component: CustomerGroupComponent,
          data: {
            title: 'Customer Groups'
          }
        },
        {
=======
>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
          path: 'customers',
          component: CustomerListingComponent,
          data: {
            title: 'Customers'
          }
        },
        {
          path: 'new',
          component: AddCustomerComponent,
          
        },
        {
          path: 'newGroup',
          component: AddCustomerGroupComponent,
        },
        {
<<<<<<< HEAD
          path: ':id',
          component: CustomerListingComponent,
          
        },
        {
          path: ':id/edit',
          component: AddCustomerComponent,
          
        },
        {
          path: ':id',
          component: CustomerGroupComponent,
          
        },
        {
          path: ':id/editGroup',
          component: AddCustomerGroupComponent,
          
        },
        
=======
          path: 'customer-groups',
          component: CustomerGroupComponent,
          data: {
            title: 'Customer Groups'
          }
        }
>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
      ]
    }
  ]

}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
