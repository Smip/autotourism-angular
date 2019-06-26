import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LastTripsComponent} from './last-trips.component';

describe('LastTripsComponent', () => {
  let component: LastTripsComponent;
  let fixture: ComponentFixture<LastTripsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LastTripsComponent],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
