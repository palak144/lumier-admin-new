import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventLayoutComponent } from './event-layout/event-layout.component';
import { EventListingComponent } from './pages/event-listing/event-listing.component';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule
  ],
  declarations: [EventLayoutComponent, EventListingComponent]
})
export class EventModule { }
