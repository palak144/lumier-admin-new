import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteElementsLayoutComponent } from '../website-elements/website-elements-layout/website-elements-layout/website-elements-layout.component';
import { BannersComponent } from './pages/banners/banners.component';
import { AddBannerComponent } from './pages/banners/add-banner/add-banner.component';

const routes: Routes = [
  { 
    path: '',
    component: WebsiteElementsLayoutComponent,
    children: [
      { 
        path: '',
        redirectTo: 'website-elements',
        pathMatch: 'full'
      },
      {
        path: 'banners',
        component: BannersComponent,
        data: {
          title: 'Banners'
        }
      },
      {
        path: 'new',
        component: AddBannerComponent,
        
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteElementsRoutingModule { }
