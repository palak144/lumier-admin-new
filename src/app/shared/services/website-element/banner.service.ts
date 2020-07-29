import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
    baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;
  } 

  addBanner(data ) {
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
    return this.http.post(this.baseUrl + 'admin/banner' , dataForm).pipe(
      retry(3),
      catchError(this.errorHandler.handleError)
    );
  }

  getAllBanners(page) {
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/banner',
      { params: params }).pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }

  deleteBanner(id) {
    return this.http.delete(this.baseUrl + 'admin/banner/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
getBannerDetails(id) {
    return this.http.get(this.baseUrl + 'admin/banner/' + id)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }
  updateBannerStatus(statusData: {id: Number; adminStatus: Number }){
    
    return this.http.put(this.baseUrl + 'admin/banner', statusData)
      .pipe(
        retry(3),
        catchError(this.errorHandler.handleError)
      );
  }


}