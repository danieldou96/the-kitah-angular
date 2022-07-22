import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeRefreshComponent } from './stripe-refresh.component';

describe('StripeRefreshComponent', () => {
  let component: StripeRefreshComponent;
  let fixture: ComponentFixture<StripeRefreshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeRefreshComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripeRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
