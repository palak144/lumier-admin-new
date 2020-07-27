import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';0
import { SharedModule } from 'app/shared/shared.module';

import { WebsiteElementsRoutingModule } from './website-elements-routing.module';
import { WebsiteElementsLayoutComponent } from './website-elements-layout/website-elements-layout/website-elements-layout.component';
import { BannersComponent } from './pages/banners/banners.component';

@NgModule({
  imports: [
    CommonModule,
    WebsiteElementsRoutingModule,
    SharedModule
  ],
  declarations: [WebsiteElementsLayoutComponent, BannersComponent]
})
export class WebsiteElementsModule { }
