import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  baseUrl = APIEndpoint;
  constructor() { }
}
