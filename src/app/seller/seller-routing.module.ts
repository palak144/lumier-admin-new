import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerLayoutComponent } from './seller-layout/seller-layout.component';
import { SellerListingComponent } from './pages/seller-listing/seller-listing.component';
import { AddSellerComponent } from './pages/seller-listing/add-seller/add-seller.component';
import { SellerActivitesComponent } from './pages/seller-activites/seller-activites.component';
import { SellerPayoutComponent } from './pages/seller-payout/seller-payout.component';

const routes: Routes = [{

  path: '',
  children: [ 
    {
      path: '',
     component: SellerLayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'sellers',
          pathMatch: 'full'
        },
        {
          path: 'sellers',
          component: SellerListingComponent,
          data: {
            title: 'Sellers'
          }
        },
        {
          path: 'seller-activities', 
          component: SellerActivitesComponent,
          data: {
            title: 'Seller-Activities'
          }
        },
        {
          path: 'seller-payout', 
          component: SellerPayoutComponent,
          data: {
            title: 'Seller-Payout'
          }
        },
        {
          path: 'new',
          component: AddSellerComponent,
          
        },
        {
          path: 'edit/:id',
          component: AddSellerComponent,
          
        },
      ]
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { } 
