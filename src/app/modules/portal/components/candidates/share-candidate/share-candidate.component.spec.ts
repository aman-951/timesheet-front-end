import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCandidateComponent } from './share-candidate.component';

describe('ShareCandidateComponent', () => {
  let component: ShareCandidateComponent;
  let fixture: ComponentFixture<ShareCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
