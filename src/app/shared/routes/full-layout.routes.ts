import { Routes, RouterModule } from '@angular/router';
import { 
  AuthGuardService as AuthGuard 
} from '../../shared/services/auth/auth-guard.service';

// Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    // loadChildren: './dashboard/dashboard.module#DashboardModule'
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'customer',
    // loadChildren: './customer/customer.module#CustomerModule'
    loadChildren: () => import('../../customer/customer.module').then(m => m.CustomerModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'seller',
    // loadChildren: './seller/seller.module#SellerModule'
    loadChildren: () => import('../../seller/seller.module').then(m => m.SellerModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'catalogues',
    // loadChildren: './catalogue/catalogue.module#CatalogueModule',
    loadChildren: () => import('../../catalogue/catalogue.module').then(m => m.CatalogueModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'systemsetting',
    // loadChildren: './system-setting/system-setting.module#SystemSettingModule'
    loadChildren: () => import('../../system-setting/system-setting.module').then(m => m.SystemSettingModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'user-permissions',
    // loadChildren: './users-permissions/users-permissions.module#UsersPermissionsModule'
    loadChildren: () => import('../../users-permissions/users-permissions.module').then(m => m.UsersPermissionsModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'website-elements',
    // loadChildren: './website-elements/website-elements.module#WebsiteElementsModule'
    loadChildren: () => import('../../website-elements/website-elements.module').then(m => m.WebsiteElementsModule),
    canActivate: [AuthGuard] 

  },
  {     
    path: 'companies',
    // loadChildren: './companies/companies.module#CompaniesModule'
    loadChildren: () => import('../../companies/companies.module').then(m => m.CompaniesModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'skill',
    // loadChildren: './skill/skill.module#SkillModule'
    loadChildren: () => import('../../skill/skill.module').then(m => m.SkillModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'experience',
    // loadChildren: './experience/experience.module#ExperienceModule'

    loadChildren: () => import('../../experience/experience.module').then(m => m.ExperienceModule),
    canActivate: [AuthGuard] 

  },
  {
    path: 'setting',
    // loadChildren: './setting/setting.module#SettingModule'
    loadChildren: () => import('../../setting/setting.module').then(m => m.SettingModule),
    canActivate: [AuthGuard] 
  
  },
  {
    path: 'event',
    // loadChildren: './event/event.module#EventModule'
    loadChildren: () => import('../../event/event.module').then(m => m.EventModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'questions',
    // loadChildren: './questions/questions.module#QuestionsModule'
    loadChildren: () => import('../../questions/questions.module').then(m => m.QuestionsModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'sale',
    // loadChildren: './questions/questions.module#QuestionsModule'
    loadChildren: () => import('../../sale/sale.module').then(m => m.SaleModule ),
    canActivate: [AuthGuard] 
  }
];
