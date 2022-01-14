import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {AdminAboutComponent} from './admin-about.component';

describe('AdminAboutComponent', () => {
  let component: AdminAboutComponent;
  let fixture: ComponentFixture<AdminAboutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAboutComponent],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
