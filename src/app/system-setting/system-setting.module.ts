import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { SystemLayoutComponent } from '../system-setting/system-layout/system-layout.component';
import { SystemTypeComponent } from './pages/system-type/system-type.component';
import { AddSystemSettingComponent } from './pages/system-type/add-system-setting/add-system-setting.component';
import { CountryComponent } from './pages/country/country.component';
import { AddCountryComponent } from './pages/country/add-country/add-country.component';


@NgModule({
  imports: [
    CommonModule,
    SystemSettingRoutingModule,
    SharedModule
 
  ],
// tslint:disable-next-line: max-line-length
  declarations: [SystemLayoutComponent, SystemTypeComponent, AddSystemSettingComponent, CountryComponent, AddCountryComponent,]
})
export class SystemSettingModule { }
