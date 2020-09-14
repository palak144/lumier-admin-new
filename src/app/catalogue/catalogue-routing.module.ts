import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogueLayoutComponent } from './catalogue-layout/catalogue-layout.component';
import { ManufacturingBrandComponent } from './pages/manufacturing-brand/manufacturing-brand.component';
import { AddManufacturerBrandComponent } from './pages/manufacturing-brand/add-manufacturer-brand/add-manufacturer-brand.component';
import {CategoriesComponent  } from './pages/categories/categories.component';
import { AddNewCategoryComponent } from './pages/categories/add-new-category/add-new-category.component';
import { ParentCategoryComponent } from './pages/parent-category/parent-category.component';
import { AddParentCategoryComponent } from './pages/parent-category/add-parent-category/add-parent-category.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { CombosComponent } from './pages/products/combos/combos.component';
import { AddCombosComponent } from './pages/products/combos/add-combos/add-combos.component';
import { ImportProductComponent } from './pages/products/Import Product/import.component';

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
          path: 'products',
          component: ProductsComponent,
          data: {
            title: 'Products'
          }
        },
        {
          path: 'combos',
          component: CombosComponent,
          data: {
            title: 'Combos'
          }
        },
        {
          path: 'new-combos',
          component: AddCombosComponent,
          
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
          path: 'parent-categories',
          component: ParentCategoryComponent,
          data: {
            title: 'Parent Categories'
          }
        },
        {
          path: 'new-product',
          component: AddProductComponent,
          
        },
        {
          path: 'import-product',
          component: ImportProductComponent,
          
        },
        {
          path: 'new-category',
          component: AddNewCategoryComponent,
          
        },
        
        {
          path: 'new',
          component: AddManufacturerBrandComponent,
          
        },
     
        {
          path: 'new-parent-categories',
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
        {
          path: ':id',
          component: AddNewCategoryComponent,
          
        },
        {
          path: 'edit-category/:id',
          component: AddNewCategoryComponent,
          
        },
        {
          path: ':id',
          component: AddParentCategoryComponent,
          
        },
        {
          path: 'edit-parent-category/:id',
          component: AddParentCategoryComponent,
          
        },
        {
          path: ':id',
          component: AddProductComponent,
          
        },
        {
          path: 'edit-product/:id',
          component: AddProductComponent,
          
        },
      
        
        
      ],
    }
  ]

}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogueRoutingModule { }
