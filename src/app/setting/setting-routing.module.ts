import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingLayoutComponent } from './setting-layout/setting-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [

  {
    path: '',
    component: SettingLayoutComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '',
      //   pathMatch: 'full'
      // },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
