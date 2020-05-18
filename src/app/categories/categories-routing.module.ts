import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesLayoutComponent } from './categories-layout/categories-layout.component';
import { CategoryListingComponent } from './pages/category-listing/category-listing.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full'
      },
      {
        path: 'listing',
        component: CategoryListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
