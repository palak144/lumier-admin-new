import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DeliveryChargeService {

  baseUrl: string;

  constructor(
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) { 
    this.baseUrl = this.baseService.baseUrl;
  } 

  addDelivery(data) {
    return this.http.post(this.baseUrl + 'admin/deliveryCharge', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  updateDeliveryChargeStatus(statusData: {id: Number; adminStatus: Number }){
    return this.http.put(this.baseUrl + 'admin/deliveryCharge', statusData)
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getAllDeliveryChargeSearch(page?, searchKey?) {
    const params = { page: page, searchKey: searchKey  }
    return this.http.get(this.baseUrl + 'admin/deliveryCharge', { params: params })
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  
  getAllDeliveryCharge(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/deliveryCharge',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  deleteDeliveryCharge(id){ 
    return this.http.delete(this.baseUrl + 'admin/deliveryCharge/' + id)
    .pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }


}
