import { TestBed } from '@angular/core/testing';

import { GetUsersWhoReviewedService } from './get-users-who-reviewed.service';

describe('GetUsersWhoReviewedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUsersWhoReviewedService = TestBed.get(GetUsersWhoReviewedService);
    expect(service).toBeTruthy();
  });
});
