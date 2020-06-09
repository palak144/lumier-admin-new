import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SkillService {
    baseUrl: string;
    constructor(
        private errorHandler: ErrorHandlerService,
        private http: HttpClient,
        private baseSevice: BaseService
    ) {
        this.baseUrl = this.baseSevice.baseUrl;
    }

    getSkills(page) {
        const params = { page: page }
        return this.http.get(this.baseUrl + 'skills',
            { params: params }).pipe(
                retry(3),
                catchError(this.errorHandler.handleError)
            );
    }

    getSkillsSearch(page, searchKey) {
        const params = { page: page, searchKey: searchKey }
        return this.http.get(this.baseUrl + 'skills',
            { params: params }).pipe(
                retry(3),
                catchError(this.errorHandler.handleError)
            );
    }

    createSkill(data) {
        return this.http.post(this.baseUrl + 'skill', data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    updateSkill(data, skillId) {
        return this.http.put(this.baseUrl + 'skill/' + skillId, data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    updateStatus(data) {
        return this.http.put(this.baseUrl + `skillStatus`, data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    activecategory() {
        return this.http.get(this.baseUrl + 'category').pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }
}
