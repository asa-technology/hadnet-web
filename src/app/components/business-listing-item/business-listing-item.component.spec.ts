import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessListingItemComponent } from './business-listing-item.component';

describe('BusinessListingItemComponent', () => {
  let component: BusinessListingItemComponent;
  let fixture: ComponentFixture<BusinessListingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessListingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessListingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
