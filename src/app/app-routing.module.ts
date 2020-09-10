import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules , CanActivate} from '@angular/router';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';
import { 
  AuthGuardService as AuthGuard 
} from './shared/services/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'auth',    
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [AuthGuard] ,
    data: { title: 'content Views' },
    children: CONTENT_ROUTES
  },
  {
    path: '',
    component: FullLayoutComponent,
    // canActivate: [AuthGuard] ,
    data: { title: 'full Views' },
    children: Full_ROUTES
  },
  {
    path: '**',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
