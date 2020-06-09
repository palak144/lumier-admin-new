import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillRoutingModule } from './skill-routing.module';
import { SkillLayoutComponent } from './skill-layout/skill-layout.component';
import { SkillListingComponent } from './pages/skill-listing/skill-listing.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SkillRoutingModule, SharedModule],
  declarations: [SkillLayoutComponent, SkillListingComponent]
})
export class SkillModule { }
