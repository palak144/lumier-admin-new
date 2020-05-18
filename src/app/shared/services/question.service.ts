import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    baseUrl: string;
    constructor(
        private errorHandler: ErrorHandlerService,
        private http: HttpClient,
        private baseSevice: BaseService
    ) {
        this.baseUrl = this.baseSevice.baseUrl;
    }

    // get all User with paging
    getUserList(page) {
        const params = { page: page }
        return this.http.get(this.baseUrl + 'professionalExpertQuestionAnswer',
            {
                params: params
            }).pipe(
                retry(3),
                catchError(this.errorHandler.handleError)
            );
    }

    // get all user by search value with paging
    getUserListSearch(page, searchKey) {
        const params = { page: page, searchKey: searchKey }
        return this.http.get(this.baseUrl + 'professionalExpertQuestionAnswer',
            {
                params: params
            }).pipe(
                retry(3),
                catchError(this.errorHandler.handleError)
            );
    }
    questionDetail(relationId, offsetPayload) {
        const params = { relationId: relationId, limit: offsetPayload.limit, offset: offsetPayload.offset };
        return this.http.get(this.baseUrl + 'getQuestionAnswerList/', {
            params: params
        })
            .pipe(
                retry(3),
                catchError(this.errorHandler.handleError)
            );
    }

}
