import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewsSummaryComponent } from './product-reviews-summary.component';

describe('ProductReviewsSummaryComponent', () => {
  let component: ProductReviewsSummaryComponent;
  let fixture: ComponentFixture<ProductReviewsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductReviewsSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
