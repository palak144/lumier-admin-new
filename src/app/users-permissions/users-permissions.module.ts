import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersPermissionsRoutingModule } from './users-permissions-routing.module';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { SharedModule } from '../shared/shared.module';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { AddPermissionComponent } from './pages/permissions/add-permission/add-permission.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersPermissionsRoutingModule,
    AngularMultiSelectModule
  ],
  declarations: [UsersLayoutComponent, UsersComponent, PermissionsComponent, AddUserComponent, AddPermissionComponent]
})
export class UsersPermissionsModule { }
