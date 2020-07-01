"use strict";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

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

