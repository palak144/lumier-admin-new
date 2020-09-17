import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleLayoutComponent } from '../sale/sale-layout/sale-layout.component';
import { QuotationComponent } from './pages/quotation/quotation.component';
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
      {
        path: 'quotations',
        component: QuotationComponent
      }
    
    ]
  } 
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule {}
