import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventLayoutComponent } from './event-layout/event-layout.component';
import { EventListingComponent } from './pages/event-listing/event-listing.component';

const routes: Routes = [{

  path: '',
  component: EventLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'listing',
      pathMatch: 'full'
    },
    {
      path: 'listing',
      component: EventListingComponent
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
