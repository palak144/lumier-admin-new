import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    baseUrl: string;
    constructor(
        private errorHandler: ErrorHandlerService,
        private http: HttpClient,
        private baseSevice: BaseService
    ) {
        this.baseUrl = this.baseSevice.baseUrl;
    }

    // get all expert
    getAllExpert(page) {

        const params = { page: page }
        return this.http.get(this.baseUrl + 'experts', { params: params }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    getAllExpertSearch(page, searchKey) {
        const params = { page: page, searchKey: searchKey }
        return this.http.get(this.baseUrl + 'experts', { params: params }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }
    // get all professional
    getAllProfessional(page) {
        const params = { page: page }
        return this.http.get(this.baseUrl + 'professionals', {
            params: params
        }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    /**Get professional by search value with paging */
    getAllProfessionalSearch(page, searchKey) {
        const params = { page: page, searchKey: searchKey }
        return this.http.get(this.baseUrl + 'professionals', { params: params }).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }
    // update category
    updateCategory(data, categoryId) {
        return this.http.put(this.baseUrl + 'category/' + categoryId, data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    createCategory(data) {
        return this.http.post(this.baseUrl + 'category', data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    updateStatus(data) {
        return this.http.put(this.baseUrl + 'changeStatus/', data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    // get user detail
    getUserDetailByUserId(userId) {
        return this.http.post(this.baseUrl + 'getUserDataById', userId).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

}
