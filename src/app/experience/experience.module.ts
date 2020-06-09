import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceLayoutComponent } from './experience-layout/experience-layout.component';
import { ExperienceListingComponent } from './pages/experience-listing/experience-listing.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [CommonModule, ExperienceRoutingModule, SharedModule],
  declarations: [ExperienceLayoutComponent, ExperienceListingComponent]
})
export class ExperienceModule { }
