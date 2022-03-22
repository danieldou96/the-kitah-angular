import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterRowComponent } from './product-filter-row.component';

describe('ProductFilterRowComponent', () => {
  let component: ProductFilterRowComponent;
  let fixture: ComponentFixture<ProductFilterRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductFilterRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
