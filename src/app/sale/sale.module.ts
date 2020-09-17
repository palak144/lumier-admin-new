import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleLayoutComponent } from '../sale/sale-layout/sale-layout.component';
import { QuotationComponent } from './pages/quotation/quotation.component';
import { SharedModule } from '../../app/shared/shared.module';
@NgModule({ 
  imports: [
    CommonModule,
    SharedModule,
    SaleRoutingModule
  ],
// tslint:disable-next-line: max-line-length
  declarations: [SaleLayoutComponent,QuotationComponent]
})
export class SaleModule { }
