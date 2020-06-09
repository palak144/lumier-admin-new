import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingLayoutComponent } from './setting-layout/setting-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule
  ],
  declarations: [SettingLayoutComponent, ProfileComponent]
})
export class SettingModule { }
