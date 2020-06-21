import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import { UsersComponent } from './pages/users/users.component';
import { PermissionsComponent } from './pages/permissions/permissions.component';

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
            title: 'Users'
          }
        },
        {
          path: 'permissions',
          component: PermissionsComponent,
          data: {
            title: 'Permissions'
          }
        }
      ]
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersPermissionsRoutingModule { }
