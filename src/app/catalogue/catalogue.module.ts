import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
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
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ImportProductComponent } from './pages/products/Import Product/import.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TableModule } from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import { AddRowDirective } from './pages/products/add-product/add-row.directive';
import { RequiredIfDirective } from './pages/products/add-product/required-if.directive';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    CatalogueRoutingModule,
    CKEditorModule,
    AngularMultiSelectModule,
    NgxDatatableModule,
    TableModule,
    DropdownModule,
    TagInputModule,
    ButtonModule,
    FileUploadModule
  ],
  declarations: [CatalogueLayoutComponent,RequiredIfDirective, AddRowDirective, ManufacturingBrandComponent, AddManufacturerBrandComponent, CategoriesComponent, AddNewCategoryComponent, ParentCategoryComponent, AddParentCategoryComponent, ProductsComponent, AddProductComponent, CombosComponent, AddCombosComponent, ImportProductComponent]
})
export class CatalogueModule {  }
