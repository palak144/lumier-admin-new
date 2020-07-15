import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { CatalogueRoutingModule } from './catalogue-routing.module';
import { CatalogueLayoutComponent } from './catalogue-layout/catalogue-layout.component';
import { ManufacturingBrandComponent } from './pages/manufacturing-brand/manufacturing-brand.component';
import { AddManufacturerBrandComponent } from './pages/manufacturing-brand/add-manufacturer-brand/add-manufacturer-brand.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AddNewCategoryComponent } from './pages/categories/add-new-category/add-new-category.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ParentCategoryComponent } from './pages/parent-category/parent-category.component';
import { AddParentCategoryComponent } from './pages/parent-category/add-parent-category/add-parent-category.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/products/add-product/add-product.component';
import { CombosComponent } from './pages/products/combos/combos.component';
import { AddCombosComponent } from './pages/products/combos/add-combos/add-combos.component';

@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    CatalogueRoutingModule,
    CKEditorModule
  ],
  declarations: [CatalogueLayoutComponent, ManufacturingBrandComponent, AddManufacturerBrandComponent, CategoriesComponent, AddNewCategoryComponent, ParentCategoryComponent, AddParentCategoryComponent, ProductsComponent, AddProductComponent, CombosComponent, AddCombosComponent]
})
export class CatalogueModule {  }
