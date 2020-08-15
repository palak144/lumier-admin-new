import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { ErrorHandlerService } from '../error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CancelReasonService {
  baseUrl: string;

  constructor(    
    private baseService: BaseService,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient
  ) {
    this.baseUrl = this.baseService.baseUrl;

  }
  addCancel(data) {
    
    return this.http.post(this.baseUrl + 'admin/cancelReason', data).pipe(
      
      catchError(this.errorHandler.handleError)
    );
  }
  getAllCancel(page) {
    
    const params = { page: page }
    return this.http.get(this.baseUrl + 'admin/cancelReason',
      { params: params }).pipe(
        
        catchError(this.errorHandler.handleError)
      );
  }
  getAllCancelSearch(page?, searchKey?) {
    
    const params = { page: page, searchKey: searchKey  }
    return this.http.get(this.baseUrl + 'admin/cancelReason', { params: params })
    .pipe(
      
      catchError(this.errorHandler.handleError)
    );
  } 
  deleteCancel(id)
{ return this.http.delete(this.baseUrl + 'admin/cancelReason/' + id)
.pipe(
  
  catchError(this.errorHandler.handleError)
);

}
updateCancelStatus(statusData: {id: Number; adminStatus: Number }){
  return this.http.put(this.baseUrl + 'admin/cancelReason', statusData)
  .pipe(
    
    catchError(this.errorHandler.handleError)
  );
}
getCancelDetails(id)
{
  return this.http.get(this.baseUrl + 'admin/cancelReason/' + id)
      .pipe(
        
        catchError(this.errorHandler.handleError)
      ); 
}
}
