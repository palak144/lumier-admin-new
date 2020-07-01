import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueLayoutComponent } from './catalogue-layout/catalogue-layout.component';
import { ManufacturingBrandComponent } from './pages/manufacturing-brand/manufacturing-brand.component';
import { AddManufacturerBrandComponent } from './pages/manufacturing-brand/add-manufacturer-brand/add-manufacturer-brand.component';


@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    CatalogueRoutingModule
  ],
  declarations: [CatalogueLayoutComponent, ManufacturingBrandComponent, AddManufacturerBrandComponent]
})
export class CatalogueModule {  }
