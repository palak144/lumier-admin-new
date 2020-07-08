import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogueLayoutComponent } from './catalogue-layout/catalogue-layout.component';
import { ManufacturingBrandComponent } from './pages/manufacturing-brand/manufacturing-brand.component';
import { AddManufacturerBrandComponent } from './pages/manufacturing-brand/add-manufacturer-brand/add-manufacturer-brand.component';
import {CategoriesComponent  } from './pages/categories/categories.component';
import { AddNewCategoryComponent } from './pages/categories/add-new-category/add-new-category.component';
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
            title: 'Manufacturer / Brands'
          }
        },
        {
          path: 'new',
          component: AddManufacturerBrandComponent,
          
        },
        {
          path: 'categories',
          component: CategoriesComponent,
          data: {
            title: 'Categories'
          }
        },
        {
          path: 'new-category',
          component: AddNewCategoryComponent,
          
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
