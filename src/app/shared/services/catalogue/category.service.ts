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
   addCategory(data) {
    return this.http.post(this.baseUrl + 'admin/category', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  updateCategory(data)
  {
    return this.http.post(this.baseUrl + 'admin/category', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getAllCategories(page) 
  {
    debugger
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/category',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getCategory() 
  {
    return this.http.get(this.baseUrl + 'admin/category')
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getAllCategoriesSearch(page?, searchKey?, exportAll?, countryId?) 
  {
    const params = { page: page, searchKey: searchKey , exportAll: exportAll ,countryId: countryId}
    return this.http.get(this.baseUrl + 'admin/category',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
}
deleteCategory(id) {
  return this.http.delete(this.baseUrl + 'admin/category/' + id)
  .pipe(
    retry(3),
    catchError(this.errorHandler.handleError)
  );
} 
updateCategoryStatus(statusData: {id: Number; adminStatus: Number }){
  return this.http.put(this.baseUrl + 'admin/category', statusData)
  .pipe(
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
    dataForm.append('categoryName', data['categoryName']);
    dataForm.append('countries', data['countries']);
    dataForm.append('parentCategoryId', data['parentCategoryId']);
  
    dataForm.append('categoryId', data['categoryId']);
    dataForm.append('sort', data['sort']);
    dataForm.append('metaTitle', data['metaTitle']);
    dataForm.append('metaDescription', data['metaDescription']);
    dataForm.append('metaKeyword', data['metaKeyword']);
    dataForm.append('isStaticMetaTag', "");
    dataForm.append('description', data['description']);
    dataForm.append('icon',"");
    dataForm.append('image', data['file']);
  return this.http.post(this.baseUrl + 'admin/category' , dataForm).pipe(
   
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
  getCategoryDetails(id)
  {
    return this.http.get(this.baseUrl + 'admin/category/' + id)
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
}
 