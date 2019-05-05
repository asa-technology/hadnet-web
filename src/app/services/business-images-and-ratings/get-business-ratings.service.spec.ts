import { TestBed } from '@angular/core/testing';

import { GetBusinessRatingsService } from './get-business-ratings.service';

describe('GetBusinessRatingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetBusinessRatingsService = TestBed.get(GetBusinessRatingsService);
    expect(service).toBeTruthy();
  });
});
