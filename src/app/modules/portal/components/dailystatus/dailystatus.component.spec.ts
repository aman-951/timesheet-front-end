import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailystatusComponent } from './dailystatus.component';

describe('DailystatusComponent', () => {
  let component: DailystatusComponent;
  let fixture: ComponentFixture<DailystatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailystatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailystatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
