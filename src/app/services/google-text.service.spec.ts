import { TestBed } from '@angular/core/testing';

import { GoogleTextService } from './google-text.service';

describe('GoogleTextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleTextService = TestBed.get(GoogleTextService);
    expect(service).toBeTruthy();
  });
});
