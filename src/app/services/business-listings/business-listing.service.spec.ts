import { TestBed } from '@angular/core/testing';

import { BusinessListingService } from './business-listing.service';

describe('BusinessListingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessListingService = TestBed.get(BusinessListingService);
    expect(service).toBeTruthy();
  });
});
