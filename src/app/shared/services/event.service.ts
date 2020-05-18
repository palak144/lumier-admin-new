import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    baseUrl: string;
    constructor(
        private errorHandler: ErrorHandlerService,
        private http: HttpClient,
        private baseSevice: BaseService
    ) {
        this.baseUrl = this.baseSevice.baseUrl;
    }

    // get all event with paging
    getEvent(page) {
        const params = { page: page }
        return this.http.get(this.baseUrl + 'eventList',
            { params: params }).pipe(
                retry(3),
                catchError(this.errorHandler.handleError)
            );
    }
    // get all event by search value with paging
    getEventSearch(page, searchKey) {
        const params = { page: page, searchKey: searchKey }
        return this.http.get(this.baseUrl + 'eventList',
            { params: params }).pipe(
                retry(3),
                catchError(this.errorHandler.handleError)
            );
    }

    updateStatus(data) {
        return this.http.put(this.baseUrl + 'eventStatus/', data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

}
