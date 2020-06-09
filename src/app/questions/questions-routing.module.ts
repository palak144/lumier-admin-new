import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsLayoutComponent } from './questions-layout/questions-layout.component';
import { QuestionsListingComponent } from './pages/questions-listing/questions-listing.component';
import { QuestionsDetailComponent } from './pages/questions-detail/questions-detail.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionsLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full'
      },
      {
        path: 'listing',
        component: QuestionsListingComponent
      },
      {
        path: 'detail/:id',
        component: QuestionsDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
