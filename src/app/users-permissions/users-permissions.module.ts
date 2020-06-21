import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPermissionsRoutingModule } from './users-permissions-routing.module';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersPermissionsRoutingModule
  ],
  declarations: [UsersLayoutComponent, UsersComponent, PermissionsComponent]
})
export class UsersPermissionsModule { }
