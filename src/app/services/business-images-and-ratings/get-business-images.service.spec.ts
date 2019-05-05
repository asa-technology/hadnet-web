import { TestBed } from '@angular/core/testing';

import { GetBusinessImagesService } from './get-business-images.service';

describe('GetBusinessImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetBusinessImagesService = TestBed.get(GetBusinessImagesService);
    expect(service).toBeTruthy();
  });
});
