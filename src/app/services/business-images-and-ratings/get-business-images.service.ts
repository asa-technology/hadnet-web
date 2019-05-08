import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessImage } from '../../models/BusinessImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetBusinessImagesService {
  businessImagesEndpoint = '/api/image/business/';
  constructor(private http: HttpClient) { }

  getBusinessImages(id: number): Observable<BusinessImage> {
    return this.http.get<BusinessImage>(this.businessImagesEndpoint.concat(`${id}`));
  }

  getImageById(id:number) {
    return this.http.get<BusinessImage>(`/api/image/${id}`);
  }
}
