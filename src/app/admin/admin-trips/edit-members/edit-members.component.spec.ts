import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {EditMembersComponent} from './edit-members.component';

describe('EditMembersComponent', () => {
  let component: EditMembersComponent;
  let fixture: ComponentFixture<EditMembersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditMembersComponent],
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
