import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsThisBlackOwnedComponent } from './is-this-black-owned.component';

describe('IsThisBlackOwnedComponent', () => {
  let component: IsThisBlackOwnedComponent;
  let fixture: ComponentFixture<IsThisBlackOwnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsThisBlackOwnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsThisBlackOwnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
