import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateRatingService {
  updateRatingEndpoint = '/api/business/avgreviews';
  constructor(private http: HttpClient) { }
  sendUserReview(id: any): Observable <any> {
    console.log('trying to update avg ratings');
    return this.http.put<any>(this.updateRatingEndpoint, id);
  }
}
