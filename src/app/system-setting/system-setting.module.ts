import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { SystemLayoutComponent } from '../system-setting/system-layout/system-layout.component';
import { SystemTypeComponent } from './pages/system-type/system-type.component';
import { AddSystemSettingComponent } from './pages/system-type/add-system-setting/add-system-setting.component';
import { CountryComponent } from './pages/country/country.component';
import { AddCountryComponent } from './pages/country/add-country/add-country.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ReturnReasonComponent } from './pages/return-reason/return-reason.component';
import { AddReturnComponent } from './pages/return-reason/add-return/add-return.component';
import { DeliveryChargeComponent } from './pages/delivery-charge/delivery-charge.component';
import { AddDeliveryChargeComponent } from './pages/delivery-charge/add-delivery-charge/add-delivery-charge.component';
import { CancelreasonComponent } from './pages/cancelreason/cancelreason.component';
import { AddCancelComponent } from './pages/cancelreason/add-cancel/add-cancel.component';


@NgModule({ 
  imports: [
    CommonModule,
    SystemSettingRoutingModule,
    SharedModule,
    AngularMultiSelectModule
 
  ],
// tslint:disable-next-line: max-line-length
  declarations: [SystemLayoutComponent, SystemTypeComponent, AddSystemSettingComponent, CountryComponent, AddCountryComponent, ReturnReasonComponent, AddReturnComponent, DeliveryChargeComponent, AddDeliveryChargeComponent,CancelreasonComponent, AddCancelComponent,]
})
export class SystemSettingModule { }
