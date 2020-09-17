import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleLayoutComponent } from '../sale/sale-layout/sale-layout.component';
import { QuotationComponent } from './pages/quotation/quotation.component';
import { SharedModule } from '../../app/shared/shared.module';
import { AddQuotationComponent } from './pages/add-quotation/add-quotation.component';
import { InprogressComponent } from './pages/inprogress/inprogress.component';
import { CompletedComponent } from './pages/completed/completed.component';
import { RejectedComponent } from './pages/rejected/rejected.component';
@NgModule({ 
  imports: [
    CommonModule,
    SharedModule,
    SaleRoutingModule
  ],
// tslint:disable-next-line: max-line-length
  declarations: [SaleLayoutComponent,QuotationComponent, AddQuotationComponent, InprogressComponent, CompletedComponent, RejectedComponent]
})
export class SaleModule { }
