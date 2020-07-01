import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SellerLayoutComponent } from './seller-layout/seller-layout.component';
import { SellerListingComponent } from './pages/seller-listing/seller-listing.component';
import { SellerActivitesComponent } from './pages/seller-activites/seller-activites.component';
import { SellerPayoutComponent } from './pages/seller-payout/seller-payout.component';
import { AddSellerComponent } from './pages/seller-listing/add-seller/add-seller.component';

@NgModule({
  imports: [
    CommonModule,
    SellerRoutingModule,
    SharedModule
  ],
  declarations: [SellerLayoutComponent, SellerListingComponent, SellerActivitesComponent, SellerPayoutComponent, AddSellerComponent,]
})
export class SellerModule { }
