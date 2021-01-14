import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SaleLayoutComponent } from '../sale/sale-layout/sale-layout.component';
import { QuotationComponent } from './pages/quotation/quotation.component';
import { AddQuotationComponent } from './pages/add-quotation/add-quotation.component';
import { InprogressComponent } from './pages/inprogress/inprogress.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { RejectedComponent } from './pages/rejected/rejected.component';
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
      },
      {
        path: 'new',
        component: AddQuotationComponent
      },
      {
        path: 'inprogress',
        component: InprogressComponent
      },
      {
        path: 'completed',
        component: CompletedComponent
      },
      {
        path: 'rejected',
        component: RejectedComponent
      },


    
    ]
  } 
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule {}
