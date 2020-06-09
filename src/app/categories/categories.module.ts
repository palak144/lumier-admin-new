import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesLayoutComponent } from './categories-layout/categories-layout.component';
import { CategoryListingComponent } from './pages/category-listing/category-listing.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [CommonModule, CategoriesRoutingModule, SharedModule],
  declarations: [CategoriesLayoutComponent, CategoryListingComponent]
})
export class CategoriesModule {}
