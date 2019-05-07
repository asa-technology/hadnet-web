import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessVerified } from '../../app/models/BusinessVerified';

@Injectable({
  providedIn: 'root'
})
export class GoogleTextService {
verifiedBusinessEndpoint = '/api/business/isVerfied';
  constructor(private http: HttpClient) { }
  isBusinessVerified(image: any): Observable <any>{
    return this.http.post<any>(this.verifiedBusinessEndpoint, image);
  }
}
