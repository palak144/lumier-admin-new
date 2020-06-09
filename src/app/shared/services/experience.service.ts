import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { map } from 'rxjs/operators';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {
    baseUrl: string;
    constructor(
        private errorHandler: ErrorHandlerService,
        private http: HttpClient,
        private baseSevice: BaseService
    ) {
        this.baseUrl = this.baseSevice.baseUrl;
    }


    getExperience() {
        return this.http.get(this.baseUrl + 'AdminexperienceList').pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    update(data, experienceId) {
        return this.http.put(this.baseUrl + 'experience/' + experienceId, data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    add(data) {
        return this.http.post(this.baseUrl + 'AddExperience', data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

    updateStatus(data) {
        return this.http.put(this.baseUrl + 'experienceStatus/', data).pipe(
            retry(3),
            catchError(this.errorHandler.handleError)
        );
    }

}
