import { TestBed } from '@angular/core/testing';

import { CommunityListingsService } from './community-listings.service';

describe('CommunityListingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunityListingsService = TestBed.get(CommunityListingsService);
    expect(service).toBeTruthy();
  });
});
