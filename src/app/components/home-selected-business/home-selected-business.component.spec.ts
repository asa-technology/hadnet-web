import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSelectedBusinessComponent } from './home-selected-business.component';

describe('HomeSelectedBusinessComponent', () => {
  let component: HomeSelectedBusinessComponent;
  let fixture: ComponentFixture<HomeSelectedBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSelectedBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSelectedBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
