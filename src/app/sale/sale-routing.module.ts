import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleLayoutComponent } from '../sale/sale-layout/sale-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SaleLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'sale',
        pathMatch: 'full'
      },
    
    ]
  } 
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemSettingRoutingModule {}
