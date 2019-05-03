import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessListingsComponent } from './business-listings.component';

describe('BusinessListingsComponent', () => {
  let component: BusinessListingsComponent;
  let fixture: ComponentFixture<BusinessListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
