import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsLayoutComponent } from './questions-layout/questions-layout.component';
import { QuestionsListingComponent } from './pages/questions-listing/questions-listing.component';
import { QuestionsDetailComponent } from './pages/questions-detail/questions-detail.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    SharedModule
  ],
  declarations: [QuestionsLayoutComponent, QuestionsListingComponent, QuestionsDetailComponent]
})
export class QuestionsModule { }
