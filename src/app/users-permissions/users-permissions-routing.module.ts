import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { AddPermissionComponent } from './pages/permissions/add-permission/add-permission.component';

const routes: Routes = [{

  path: '',
  children: [
    {
      path: '',
     component: UsersLayoutComponent,
      children: [
        {
          path: '',
          redirectTo: 'users',
          pathMatch: 'full'
        },
        {
          path: 'users',
          component: UsersComponent,
          data: {
            title: 'Employee'
          }
        },
        {
          path: 'user-permissions',
          component: PermissionsComponent,
          data: {
            title: 'Permissions'
          }
        },
        {
          path: 'new',
          component: AddUserComponent,
          
        },
        {
          path: 'newPermission',
          component: AddPermissionComponent,
        },
        {
          path: ':id',
          component: UsersComponent,
          
        },
        {
          path: 'edit/:id',
          component: AddUserComponent,
          
        },
        {
          path: ':id',
          component: PermissionsComponent,
          
        },
        {
          path: 'editPermission/:id',
          component: AddPermissionComponent,
          
        },
      ]
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersPermissionsRoutingModule { }
