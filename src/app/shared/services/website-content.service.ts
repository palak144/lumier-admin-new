import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebsiteContentService {
  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }

  // BANNER

  // get all banners
  getAllBanners() {
    return this.http.get(this.baseUrl + 'banner').pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // add banner
  addEditBanner(data) {
    return this.http.post(this.baseUrl + 'addUpdateBanner', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // delete banner
  deleteBanner(id) {
    return this.http.get(this.baseUrl + 'deleteBanner/' + id).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // ----------------------------------------------------------

  // TESTIMONIALS

  getTestimonial() {
    return this.http.get(this.baseUrl + 'testimonial').pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  addUpdateTestimonial(data) {
    return this.http.post(this.baseUrl + 'addUpdateTestimonial', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  deleteTestimonial(data) {
    return this.http.post(this.baseUrl + 'activeDeleteTestimonial', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // ----------------------------------------------------------

  // TERMS AND CONDITIONS

  // get t&c
  getTermsAndConditions() {
    return this.http.get(this.baseUrl + 'termsCondition').pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // update t&C
  updateTermsAndConditions(data) {
    return this.http.post(this.baseUrl + 'saveTermsAndConditions', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // ----------------------------------------------------------

  // PRIVACY POLICY
  // get privacy policy
  getPrivacyPolicy() {
    return this.http.get(this.baseUrl + 'privacyPolicy').pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // update privacy policy
  updatePrivacyPolicy(data) {
    return this.http.post(this.baseUrl + 'savePrivacyPolicy', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // ----------------------------------------------------------

  // CONTACT INFORMATION

  // get contact information
  getContactInformation() {
    return this.http.get(this.baseUrl + 'contact').pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // update contact information
  updateContactInformation(data) {
    return this.http.post(this.baseUrl + 'saveContactDetails', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // ----------------------------------------------------------

  // FAQ

  // get faq
  getFaq() {
    return this.http.get(this.baseUrl + 'faq').pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // add and update faq
  addUpdateFaq(data) {
    return this.http.post(this.baseUrl + 'addUpdateFaq', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  // delete faq
  deleteFaq(data) {
    return this.http.get(this.baseUrl + 'deleteFaq/' + data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
}
