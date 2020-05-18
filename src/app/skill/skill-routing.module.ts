import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillLayoutComponent } from './skill-layout/skill-layout.component';
import { SkillListingComponent } from './pages/skill-listing/skill-listing.component';

const routes: Routes = [
  {
    path: '',
    component: SkillLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listing',
        pathMatch: 'full'
      },
      {
        path: 'listing',
        component: SkillListingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule { }
