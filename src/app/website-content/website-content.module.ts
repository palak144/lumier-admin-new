import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteContentRoutingModule } from './website-content-routing.module';
import { WebsiteContentLayoutComponent } from './website-content-layout/website-content-layout.component';
import { BannerComponent } from './pages/banner/banner.component';
import { TestimonialsComponent } from './pages/testimonials/testimonials.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ContactInformationComponent } from './pages/contact-information/contact-information.component';
import { SharedModule } from 'app/shared/shared.module';
import { FaqComponent } from './pages/faq/faq.component';

@NgModule({
  imports: [
    CommonModule,
    WebsiteContentRoutingModule,
    SharedModule
  ],
// tslint:disable-next-line: max-line-length
  declarations: [WebsiteContentLayoutComponent, BannerComponent, TestimonialsComponent, TermsAndConditionsComponent, PrivacyPolicyComponent, ContactInformationComponent, FaqComponent]
})
export class WebsiteContentModule { }
