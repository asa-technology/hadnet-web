/**
 * This is a service to get images.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BusinessImage } from '../../models/BusinessImage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * GetBusinessImagesService is a class for getting images from the server.
 */
export class GetBusinessImagesService {
  /**
   * businessImagesEndpoint is a variable to hold the server endpoint for business images.
   */
  businessImagesEndpoint = '/api/image/business/';
  constructor(private http: HttpClient) { }
/**
 * getBusinessImages gets an image for a business.
 * @param id id is the database id number of the business.
 * @returns an observable for the image.
 */
  getBusinessImages(id: number): Observable<BusinessImage> {
    return this.http.get<BusinessImage>(this.businessImagesEndpoint.concat(`${id}`));
  }
/**
 * getImageById gets an image by its database id.
 * @param id id is the datsabase id number of the image.
 * @returns an observable for the image.
 */
  getImageById(id: number) {
    return this.http.get<BusinessImage>(`/api/image/${id}`);
  }
/**
 * getFeaturedImage gets an image for a business.
 * @param id id is the datsabase id number of the featured image.
 * @returns an observable for the image.
 */
  getFeaturedImage(id: number) {
    return this.http.get<BusinessImage>(`/api/image/${id}`);
  }
}
