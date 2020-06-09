import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteContentLayoutComponent } from './website-content-layout/website-content-layout.component';
import { BannerComponent } from './pages/banner/banner.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ContactInformationComponent } from './pages/contact-information/contact-information.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: WebsiteContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'banner',
        pathMatch: 'full'
      },
      {
        path: 'banner',
        component: BannerComponent
      },
      {
        path: 'testimonials',
        component: TestimonialsComponent
      },
      {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'contact-information',
        component: ContactInformationComponent
      },
      {
        path: 'frequently-asked-questions',
        component: FaqComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteContentRoutingModule {}
