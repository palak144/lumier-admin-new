import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
<<<<<<< HEAD
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
=======
>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
const APIEndpoint = environment.APIEndpoint;

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  // on production
<<<<<<< HEAD
  //public baseUrl = APIEndpoint;

  // on local
   public baseUrl = 'http://18.141.13.208/api/v1/';

  constructor(private httpClient : HttpClient,) { }
 
=======
  // public baseUrl = APIEndpoint;

  // on local
  public baseUrl = 'http://18.141.13.208/api/v1/';

  constructor() { }
>>>>>>> ab00378f10aef9276383d015d4e0445f6789afbc
}
