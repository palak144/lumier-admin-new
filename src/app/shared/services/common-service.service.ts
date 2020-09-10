import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  baseUrl: string;
  relatedParams: any;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService,
    private router: Router
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }

  getCountry()
  {
    return this.http.get(this.baseUrl + 'admin/country')
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
    
  }
  getCountryOrigin()
  {
    return this.http.get(this.baseUrl + 'admin/getCountryOrigin')
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
    
  }
  getparentCategory(languageId)
  {
    const params = { languageId: languageId }
    return this.http.get(this.baseUrl + 'admin/parentCategoryList' , { params: params })
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
    
  }

  getCategory(languageId)
  {
    const params = { languageId: languageId }
    return this.http.get(this.baseUrl + 'admin/categoryList' ,{ params: params })
    .pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  getRelatedProducts(languageId?, searchKey? , relatedId?)
  {
    if(relatedId == undefined){
      this.relatedParams = { languageId: languageId , searchKey:searchKey}
    }
    else{
      this.relatedParams = { languageId: languageId , searchKey:searchKey , relatedId:relatedId}
    }
    console.log(relatedId)
    
    return this.http.get(this.baseUrl + 'admin/productList' ,{ params: this.relatedParams })
    .pipe(
      catchError(this.errorHandler.handleError)
    );
  }
  getSupplyType(country){
    
    const params = { countryId: country }
    return this.http.get(this.baseUrl + 'admin/supplyTypeList',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }

  getAllCountries()
  {
    return this.http.get(this.baseUrl + 'web/countries')
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
    
  }

  getLanguage() {
    
    return this.http.get(this.baseUrl + 'admin/language').pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  getCountryLanguage(country) {
    
    return this.http.get(this.baseUrl + 'admin/getCountryLanguage/' + country ).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  getCountryCurrency(country) {

    return this.http.get(this.baseUrl + 'admin/getCountryCurrency/'+ country).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  getManufacturerList(country) {
    const params = { countryId: country }

    return this.http.get(this.baseUrl + 'admin/manufacturerList/' , { params: params }).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  getSellerList(country) {
    
    const params = { countryId: country }

    return this.http.get(this.baseUrl + 'admin/sellerList/' , { params: params } ).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  getSeller() {
   

    return this.http.get(this.baseUrl + 'admin/sellerList'  ).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  getCategoryList()
  {
   
    return this.http.get(this.baseUrl + 'admin/categoryList' )
    .pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }

  getCurrency() {
    return this.http.get(this.baseUrl + 'admin/currency').pipe(
      
      catchError(this.errorHandler.handleError)
    );  
  }
  getSpeciality(){
    
    return this.http
    .get(this.baseUrl + 'customer/speciality')
    .pipe(
      
    );
   }
}
