import { Routes, RouterModule } from '@angular/router';

// Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'customer',
    loadChildren: './customer/customer.module#CustomerModule'
  },
  {
    path: 'seller',
    loadChildren: './seller/seller.module#SellerModule'
  },
  {
    path: 'catalogues',
    loadChildren: './catalogue/catalogue.module#CatalogueModule'
  },
  {
    path: 'systemsetting',
    loadChildren: './system-setting/system-setting.module#SystemSettingModule'
  },
  {
    path: 'user-permissions',
    loadChildren: './users-permissions/users-permissions.module#UsersPermissionsModule'
  },
  {     
    path: 'companies',
    loadChildren: './companies/companies.module#CompaniesModule'
  },
  {
    path: 'categories',
    loadChildren: './categories/categories.module#CategoriesModule'
  },
  {
    path: 'skill',
    loadChildren: './skill/skill.module#SkillModule'
  },
  {
    path: 'experience',
    loadChildren: './experience/experience.module#ExperienceModule'
  },
  {
    path: 'setting',
    loadChildren: './setting/setting.module#SettingModule'
  },
  {
    path: 'event',
    loadChildren: './event/event.module#EventModule'
  },
  {
    path: 'questions',
    loadChildren: './questions/questions.module#QuestionsModule'
  }
];
