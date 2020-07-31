import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
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
    if(data.id != null){
      dataForm.append('id', data['id']);
    }
    if(data.file != ""){
      dataForm.append('file', data['file']);
    }
      dataForm.append('IFSCCode', data['IFSCCode']);
      dataForm.append('accHolderName', data['accHolderName']);
      dataForm.append('accountNumber', data['accountNumber']);
      dataForm.append('bankName', data['bankName']);
      dataForm.append('buildingName', data['buildingName']);
      dataForm.append('ccEmail', data['ccEmail']);
      dataForm.append('commission', data['commission']);
      dataForm.append('countryId', data['countryId']);
      dataForm.append('floorNo', data['floorNo']);
      dataForm.append('houseNo', data['houseNo']);
      dataForm.append('mobileNo', data['mobileNo']);
      dataForm.append('password', data['password']);
      dataForm.append('pickupAddress', data['pickupAddress']);
      dataForm.append('pincode', data['pincode']);
      dataForm.append('sellerEmail', data['sellerEmail']);
      dataForm.append('sellerName', data['sellerName']);
      dataForm.append('streetName', data['streetName']);
      dataForm.append('supplyTypeId',data['supplyTypeId']);
      dataForm.append('unitNo', data['unitNo']);
      dataForm.append('userName', data['userName']);
      
    return this.http.post(this.baseUrl + 'admin/seller', dataForm).pipe(
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