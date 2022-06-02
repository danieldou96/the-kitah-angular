import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProductPreviewComponent } from './upload-product-preview.component';

describe('UploadProductPreviewComponent', () => {
  let component: UploadProductPreviewComponent;
  let fixture: ComponentFixture<UploadProductPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadProductPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProductPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
