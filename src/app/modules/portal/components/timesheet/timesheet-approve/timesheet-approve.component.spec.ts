import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetApproveComponent } from './timesheet-approve.component';

describe('TimesheetApproveComponent', () => {
  let component: TimesheetApproveComponent;
  let fixture: ComponentFixture<TimesheetApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetApproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
