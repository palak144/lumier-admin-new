import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogueLayoutComponent } from './catalogue-layout/catalogue-layout.component';
import { ManufacturingBrandComponent } from './pages/manufacturing-brand/manufacturing-brand.component';
import { AddManufacturerBrandComponent } from './pages/manufacturing-brand/add-manufacturer-brand/add-manufacturer-brand.component';
import {CategoriesComponent  } from './pages/categories/categories.component';
import { AddNewCategoryComponent } from './pages/categories/add-new-category/add-new-category.component';
import { ParentCategoryComponent } from './pages/parent-category/parent-category.component';
import { AddParentCategoryComponent } from './pages/parent-category/add-parent-category/add-parent-category.component';
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
          path: 'categories',
          component: CategoriesComponent,
          data: {
            title: 'Categories'
          }
        },
        {
          path: 'new',
          component: AddManufacturerBrandComponent,
          
        },
       
        {
          path: 'new-category',
          component: AddNewCategoryComponent,
          
        },
        {
          path: 'parent-categories',
          component: ParentCategoryComponent,
          data: {
            title: 'Parent Categories'
          }
        },
        {
          path: 'new-parent-categories',
          component: AddParentCategoryComponent,
          
        },
        {
          path: 'edit/:id',
          component: AddParentCategoryComponent,
          
        },
        {
          path: ':id',
          component: ManufacturingBrandComponent,
          
        },
        {
          path: 'edit/:id',
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
