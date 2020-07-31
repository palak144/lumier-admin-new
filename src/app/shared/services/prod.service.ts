import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;
  } 

  addProduct(data ) {
    const dataForm = new FormData();
      if(data.id != null){
        dataForm.append('id', data['id']);
      }
      if(data.file != ""){
        dataForm.append('image', data['file']);
      }
      dataForm.append('name', data['name']);
      dataForm.append('sequenceNumber', data['sequenceNumber']);
      dataForm.append('page', data['page']);
      dataForm.append('countryId', data['countryId']);
      dataForm.append('supplyTypeId', data['supplyTypeId']);
      dataForm.append('position', data['position']);
      dataForm.append('hyperLink', data['hyperlink']);
      dataForm.append('endDate', data['endDate']);
      dataForm.append('startDate', data['startDate']);

debugger
    return this.http.post(this.baseUrl + 'admin/product' , dataForm).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

getProductDetails(id) {
    return this.http.get(this.baseUrl + 'admin/product/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  updateProductStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/product', statusData)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }


}