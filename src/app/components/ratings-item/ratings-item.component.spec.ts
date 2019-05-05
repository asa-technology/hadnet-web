import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsItemComponent } from './ratings-item.component';

describe('RatingsItemComponent', () => {
  let component: RatingsItemComponent;
  let fixture: ComponentFixture<RatingsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
