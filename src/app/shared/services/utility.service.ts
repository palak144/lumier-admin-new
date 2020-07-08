"use strict";
import { Injectable } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  baseUrl: string;
  constructor(
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    private baseSevice: BaseService,
    private router: Router
  ) {
    this.baseUrl = this.baseSevice.baseUrl;
  }
  arrayOfStringsToArrayOfObjects(arr: any[]) {
    const newArray = [];
    arr.forEach(element => {
      newArray.push({
        label: element,
        value: element
      });
    });
    return newArray;
  }
  
  arrayOfObjectToConvertInDropdownFormat(arr: any[], labelKey, valueKey, statusKey?, statusNotEqual?) {
    const newArray = [];
    arr.forEach(element => {
      if (statusKey) {
        newArray.push({
          label: element[labelKey],
          value: element[valueKey],
          disabled: element[statusKey] == statusNotEqual
        });
      } else {
        newArray.push({
          label: element[labelKey],
          value: element[valueKey],
        });
      }
  
    });
    return newArray;
  }
  
}

