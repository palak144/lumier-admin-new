import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ErrorHandlerService } from './error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  } 
  addSeller(data) {
    
    const dataForm = new FormData();
      dataForm.append('IFSCCode', data['IFSCCode']);
      dataForm.append('sort', data['accHolderName']);
      dataForm.append('walletDiscount', data['accountNumber']);
      dataForm.append('file', data['bankName']);
      dataForm.append('countryId', data['buildingName']);
      dataForm.append('supplyTypeId', data['ccEmail']);
      dataForm.append('commission', data['commission']);
      dataForm.append('socountryIdrt', data['countryId']);
      dataForm.append('file', data['file']);
      dataForm.append('floorNo', data['floorNo']);
      dataForm.append('houseNo', data['houseNo']);
      dataForm.append('mobileNo', data['mobileNo']);
      dataForm.append('password', data['password']);
      dataForm.append('pickupAddress', data['pickupAddress']);
      dataForm.append('pincode', data['pincode']);
      dataForm.append('sellerEmail', data['sellerEmail']);
      dataForm.append('sellerName', data['sellerName']);
      dataForm.append('streetName', data['streetName']);
      dataForm.append('supplyType', data['supplyType']);
      dataForm.append('unitNo', data['unitNo']);
      dataForm.append('userName', data['userName']);
      
    return this.http.post(this.baseUrl + 'admin/seller', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  updateSeller(data)
  {
    return this.http.post(this.baseUrl + 'admin/seller', data).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }
  getAllSellers(page) {
    
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/seller',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  getAllSellersSearch(page?, searchKey?, exportAll?, countryId?) {
    
    (countryId == "null") ? '':page = 0
    const params = { page: page, searchKey: searchKey , exportAll: exportAll ,countryId: countryId}
    return this.http.get(this.baseUrl + 'admin/seller',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  getSellerdetails(id) {
    return this.http.get(this.baseUrl + 'admin/seller/detail/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  deleteSeller(id) {
    return this.http.delete(this.baseUrl + 'admin/seller/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  updateSellerStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/seller', statusData)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
}