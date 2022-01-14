import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {CurrentTripComponent} from './current-trip.component';

describe('CurrentTripComponent', () => {
  let component: CurrentTripComponent;
  let fixture: ComponentFixture<CurrentTripComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentTripComponent],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
