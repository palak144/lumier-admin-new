import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ExpertListingComponent } from './pages/expert-listing/expert-listing.component';
import { ProfessionalListingComponent } from './pages/professional-listing/professional-listing.component';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { SharedModule } from 'app/shared/shared.module';
import { DetailComponent } from './pages/detail/detail.component';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    PaginatorModule
  ],
  declarations: [ExpertListingComponent, ProfessionalListingComponent, UsersLayoutComponent, DetailComponent]
})
export class UsersModule { }
