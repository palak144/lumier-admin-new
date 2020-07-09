import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemLayoutComponent } from '../system-setting/system-layout/system-layout.component';
import { SystemTypeComponent } from './pages/system-type/system-type.component';
import { AddSystemSettingComponent } from './pages/system-type/add-system-setting/add-system-setting.component';
import { CountryComponent } from './pages/country/country.component';
import { AddCountryComponent } from './pages/country/add-country/add-country.component';
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
        path: 'systemtype',
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
        path: 'new-country',
        component: AddCountryComponent,
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule {}
