import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeStripeFormComponent } from './resume-stripe-form.component';

describe('ResumeStripeFormComponent', () => {
  let component: ResumeStripeFormComponent;
  let fixture: ComponentFixture<ResumeStripeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeStripeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeStripeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
