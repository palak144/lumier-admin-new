import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SystemSettingsService { 
  baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  }
<<<<<<< HEAD

  addCountry(data) {
    return this.http.post(this.baseUrl + 'admin/countrySetting', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  updateCountry(data)
  {
    return this.http.post(this.baseUrl + 'admin/countrySetting', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


=======
  getSupplyTypedetails(id) {
    return this.http.get(this.baseUrl + 'admin/supplyType/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
>>>>>>> 2373d23b6d53512632c7bb9d6fd8faf5f73857e1
  getAllSupplyType(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/supplyType',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
<<<<<<< HEAD

  getAllCountries(page) {
    
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/countrySetting',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getCountry() 
  {
    return this.http.get(this.baseUrl + 'admin/countrySetting')
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getAllCountriesSearch(page?, searchKey?, exportAll?) {
    
    const params = { page: page, searchKey: searchKey , exportAll: exportAll }
    return this.http.get(this.baseUrl + 'admin/countrySetting',
=======
  addSupply(data) {
    return this.http.post(this.baseUrl + 'admin/supplyType', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getAllSupplysSearch(page?, searchKey?, exportAll?, countryId?) {
    
    const params = { page: page, searchKey: searchKey , exportAll: exportAll ,countryId: countryId}
    return this.http.get(this.baseUrl + 'admin/supplyType',
>>>>>>> 2373d23b6d53512632c7bb9d6fd8faf5f73857e1
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
<<<<<<< HEAD

  // getCountrydetails(id) {
  //   return this.http.get(this.baseUrl + 'admin/seller/detail/' + id)
  //     .pipe(
  //       retry(3),
  //       catchError(this.errorHandler.handleError)
  //     );
  // }

  deleteSeller(id) {
    return this.http.delete(this.baseUrl + 'admin/countrySetting/' + id)
=======
  deleteSupply(id) {
    return this.http.delete(this.baseUrl + 'admin/supplyType/' + id)
>>>>>>> 2373d23b6d53512632c7bb9d6fd8faf5f73857e1
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
<<<<<<< HEAD

  
  updateCountryStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/countrySetting', statusData)
=======
  updateSellerStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/supplyType', statusData)
>>>>>>> 2373d23b6d53512632c7bb9d6fd8faf5f73857e1
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
<<<<<<< HEAD
=======
  updateSupply(data)
  {
    return this.http.post(this.baseUrl + 'admin/supplyType', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
>>>>>>> 2373d23b6d53512632c7bb9d6fd8faf5f73857e1
}

