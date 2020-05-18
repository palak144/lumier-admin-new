import { Routes, RouterModule } from '@angular/router';

// Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
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
