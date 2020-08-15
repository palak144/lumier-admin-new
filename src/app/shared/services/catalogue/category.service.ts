import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string;

  constructor(
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;
   }

  getAllCategories(page) 
  {
    
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/category',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }

  getCategory() 
  {
    return this.http.get(this.baseUrl + 'admin/category')
      .pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }

  getAllCategoriesSearch(page?, searchKey?, exportAll?, countryId?) 
  {
    const params = { page: page, searchKey: searchKey , exportAll: exportAll ,countryId: countryId}
    return this.http.get(this.baseUrl + 'admin/category',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
}
deleteCategory(id) {
  return this.http.delete(this.baseUrl + 'admin/category/' + id)
  .pipe(
    
    catchError(this.errorHandler.handleError)
  );
} 
updateCategoryStatus(statusData: {id: Number; adminStatus: Number }){
  return this.http.put(this.baseUrl + 'admin/category', statusData)
  .pipe(
    
    catchError(this.errorHandler.handleError)
  );
}
addcategory(data)
{
  
  const dataForm = new FormData();
    if(data.id != null){
      dataForm.append('id', data['id']);

    }
    if(data.file != ""){
      dataForm.append('image', data['file']);
    }
    if(data.categoryId != ""){
      dataForm.append('categoryId', data['categoryId']);
    }
    dataForm.append('categoryName', data['categoryName']);
    dataForm.append('countries', data['countries']);
    dataForm.append('parentCategoryId', data['parentCategoryId']);
    dataForm.append('languageId', data['languageId']);
    dataForm.append('metaTitle', data['metaTitle']);
    dataForm.append('metaDescription', data['metaDescription']);
    dataForm.append('metaKeyword', data['metaKeyword']);
    dataForm.append('isStaticMetaTag',data['isStaticMetaTag']);
    dataForm.append('description', data['description']);
  
  return this.http.post(this.baseUrl + 'admin/category' , dataForm).pipe(
    
    catchError(this.errorHandler.handleError)
  ); 
}
  getCategoryDetails(id)
  {
    return this.http.get(this.baseUrl + 'admin/category/' + id)
    .pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
}
 