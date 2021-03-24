import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApplicationStatusComponent } from './update-application-status.component';

describe('UpdateApplicationStatusComponent', () => {
  let component: UpdateApplicationStatusComponent;
  let fixture: ComponentFixture<UpdateApplicationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateApplicationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
