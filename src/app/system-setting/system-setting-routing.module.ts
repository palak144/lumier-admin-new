import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemLayoutComponent } from '../system-setting/system-layout/system-layout.component';
import { SystemTypeComponent } from './pages/system-type/system-type.component';
import { AddSystemSettingComponent } from './pages/system-type/add-system-setting/add-system-setting.component';
import { CountryComponent } from './pages/country/country.component';
import { AddCountryComponent } from './pages/country/add-country/add-country.component';
import { ReturnReasonComponent } from './pages/return-reason/return-reason.component';
import { AddReturnComponent } from './pages/return-reason/add-return/add-return.component';
import { DeliveryChargeComponent } from './pages/delivery-charge/delivery-charge.component';
import { AddDeliveryChargeComponent } from './pages/delivery-charge/add-delivery-charge/add-delivery-charge.component';

import { CancelreasonComponent } from './pages/cancelreason/cancelreason.component';
import { AddCancelComponent } from './pages/cancelreason/add-cancel/add-cancel.component';
import { TaxComponent } from './pages/tax/tax.component';
import { AddTaxComponent } from './pages/tax/add-tax/add-tax.component';
const routes: Routes = [
  {
    path: '',
    component: SystemLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'systemsetting',
        pathMatch: 'full'
      },
      {
        path: 'supplytype',
        component: SystemTypeComponent,
        data: {
          title: 'Supply Type'
        }
      },
      {
        path: 'new',
        component: AddSystemSettingComponent,
        
      },
      {
        path: 'edit/:id',
        component: AddSystemSettingComponent,
        
      },
      {
        path: 'country',
        component: CountryComponent,
        data: {
          title: 'Country'
        }
      },
      {
        path: 'cancel',
        component: CancelreasonComponent,
        data: {
          title: 'Cancel Reason'
        }
      },
      {
        path: 'new-country',
        component: AddCountryComponent,
        
      },
      {
        path: 'new-cancel',
        component: AddCancelComponent,
        
      },
      {
        path: 'edit-country/:id',
        component: AddCountryComponent,
        
      },
      {
        path: 'return-reason',
        component: ReturnReasonComponent,
        data: {
          title: 'Return Reason'
        }
      },
      {
        path: 'new-return-reason',
        component: AddReturnComponent,
        
      },
      {
        path: 'edit-return/:id',
        component: AddReturnComponent,
      },
      {
        path: 'delivery-charge',
        component: DeliveryChargeComponent,
        data: {
          title: 'Delivery Charge'
        }
      },
      {
        path: 'new-delivery-charge',
        component: AddDeliveryChargeComponent, 
      },
      {
        path: 'edit-delivery-charge/:id',
        component: AddDeliveryChargeComponent, 
      },
      {
        path: 'edit-cancel/:id',
        component: AddCancelComponent,
      },
      {
        path: 'tax',
        component: TaxComponent,
        data: {
          title: 'Tax'
        }
      },
      {
        path: 'new-tax',
        component: AddTaxComponent, 
      },
      {
        path: 'edit-tax/:id',
        component: AddTaxComponent,
      },
    ]
  } 
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule {}
