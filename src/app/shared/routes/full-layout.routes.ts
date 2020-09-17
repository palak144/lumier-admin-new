import { Routes, RouterModule } from '@angular/router';
import { 
  AuthGuardService as AuthGuard 
} from '../../shared/services/auth/auth-guard.service';

// Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
     loadChildren: './dashboard/dashboard.module#DashboardModule',
   // loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
     canActivate: [AuthGuard] 

  },
  {
    path: 'customer',
     loadChildren: './customer/customer.module#CustomerModule',
    //loadChildren: () => import('../../customer/customer.module').then(m => m.CustomerModule),
     canActivate: [AuthGuard] 

  },
  {
    path: 'seller',
     loadChildren: './seller/seller.module#SellerModule',
    //loadChildren: () => import('../../seller/seller.module').then(m => m.SellerModule),
     canActivate: [AuthGuard] 

  },
  {
    path: 'catalogues',
    loadChildren: './catalogue/catalogue.module#CatalogueModule',
   //  loadChildren: () => import('../../catalogue/catalogue.module').then(m => m.CatalogueModule),
     canActivate: [AuthGuard] 

  },
  {
    path: 'systemsetting',
     loadChildren: './system-setting/system-setting.module#SystemSettingModule',
   // loadChildren: () => import('../../system-setting/system-setting.module').then(m => m.SystemSettingModule),
     canActivate: [AuthGuard] 

  },
  {
    path: 'user-permissions',
    loadChildren: './users-permissions/users-permissions.module#UsersPermissionsModule',
    // loadChildren: () => import('../../users-permissions/users-permissions.module').then(m => m.UsersPermissionsModule),
     canActivate: [AuthGuard] 

  },
  {
    path: 'website-elements',
     loadChildren: './website-elements/website-elements.module#WebsiteElementsModule',
   // loadChildren: () => import('../../website-elements/website-elements.module').then(m => m.WebsiteElementsModule),
     canActivate: [AuthGuard] 
  }
];
