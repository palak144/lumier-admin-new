import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogueLayoutComponent } from './catalogue-layout/catalogue-layout.component';
import { ManufacturingBrandComponent } from './pages/manufacturing-brand/manufacturing-brand.component';
import { AddManufacturerBrandComponent } from './pages/manufacturing-brand/add-manufacturer-brand/add-manufacturer-brand.component';
const routes: Routes = [{

  path: '',
  children: [
    {
      path: '',
     component: CatalogueLayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'catalogues',
          pathMatch: 'full'
        },
        {
          path: 'manufacturing-brand',
          component: ManufacturingBrandComponent,
          data: {
            title: 'Manufacturing Brand'
          }
        },
        {
          path: 'new',
          component: AddManufacturerBrandComponent,
          
        },
        
      ]
    }
  ]

}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
