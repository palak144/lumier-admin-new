import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  // on production
  //public baseUrl = APIEndpoint;

  // on local
   public baseUrl = 'http://18.141.13.208/api/v1/';

  constructor(private httpClient : HttpClient,) { }
 
}
