import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManufactureService {


  baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  }
  addBrand(data ) {
    const dataForm = new FormData();
      if(data.id != null){
        dataForm.append('id', data['id']);
      }
      dataForm.append('manufacturerName', data['manufacturerName']);
      dataForm.append('walletDiscount', data['walletDiscount']);
      dataForm.append('file', data['file']);
      dataForm.append('logoName', data['logoName']);
      dataForm.append('countryId', data['countryId']);
      dataForm.append('supplyTypeId', data['supplyTypeId']);
      
    return this.http.post(this.baseUrl + 'admin/manufacturer' , dataForm).pipe(
     
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  addcategory(data)
  {
    const dataForm = new FormData();
      if(data.id != null){
        dataForm.append('id', data['id']);
      }
      dataForm.append('categoryName', data['fname']);
      dataForm.append('countries', data['countryId']);
      dataForm.append('parentCategoryId', data['parentCategory']);
      dataForm.append('filtersTitle', data['filterTitle']);
      dataForm.append('filtersDetail', data['filterDetail']);
      dataForm.append('categoryId', data['category']);
      dataForm.append('sort', data['sort']);
      dataForm.append('metaTitle', data['metaTitle']);
      dataForm.append('metaDescription', data['metaDescription']);
      dataForm.append('metaKeyword', data['metaKeyword']);
      dataForm.append('isStaticMetaTag', "");
      dataForm.append('description', data['description']);
      dataForm.append('icon',"");
      dataForm.append('image', "");
      console.log(dataForm);
    return this.http.post(this.baseUrl + 'admin/category' , dataForm).pipe(
     
      retry(3),
      catchError(this.errorHandler.handleError)
    ); 
  }
  updateBrand(data)
  {
    return this.http.post(this.baseUrl + 'admin/manufacturer', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  updatecategory(data)
  {
    return this.http.post(this.baseUrl + 'admin/category', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  addParentCategory(data)
  {
    return this.http.post(this.baseUrl + 'admin/parentCategory', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  updateParentCategory(data)
  {
    return this.http.post(this.baseUrl + 'admin/parentCategory', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getAllBrands(page) {
    
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/manufacturer',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getAllParentCategory(page) {
  
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/parentCategory',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getAllBrandsSearch(page?, searchKey?, exportAll?, countryId?) {
    
  
    const params = { page: page, searchKey: searchKey , exportAll: exportAll ,countryId: countryId}
    return this.http.get(this.baseUrl + 'admin/manufacturer',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getAllParentCategorysSearch(page?, searchKey?,  countryId?) {

    const params = { page: page, searchKey: searchKey ,countryId: countryId}
    return this.http.get(this.baseUrl + 'admin/parentCategory',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getBrandDetails(id) {
    return this.http.get(this.baseUrl + 'admin/manufacturer/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getParentCategoryDetails(id)
  {
    return this.http.get(this.baseUrl + 'admin/parentCategory/' + id)
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getCategoryDetails(id)
  {
    return this.http.get(this.baseUrl + 'admin/category/' + id)
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  deleteBrand(id) {
    
    return this.http.delete(this.baseUrl + 'admin/manufacturer/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  deleteParentCategory(id) {
    
    return this.http.delete(this.baseUrl + 'admin/parentCategory/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  updateBrandStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/manufacturer', statusData)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  updateparentCategoryStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/parentCategory', statusData)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  public upload(formData) {

    return this.http.post<any>(this.baseUrl, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }
}
