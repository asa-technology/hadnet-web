import { TestBed } from '@angular/core/testing';

import { UpdateRatingService } from './update-rating.service';

describe('UpdateRatingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateRatingService = TestBed.get(UpdateRatingService);
    expect(service).toBeTruthy();
  });
});
