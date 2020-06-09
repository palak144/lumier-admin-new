import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExperienceLayoutComponent } from './experience-layout/experience-layout.component';
import { ExperienceListingComponent } from './pages/experience-listing/experience-listing.component';

const routes: Routes = [
  {
    path: '',
    component: ExperienceLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full'
      },
      {
        path: 'listing',
        component: ExperienceListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceRoutingModule { }
