import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IFile } from 'src/app/shared/models/product';

@UntilDestroy()
@Component({
  selector: 'app-upload-product-preview',
  templateUrl: './upload-product-preview.component.html',
  styleUrls: ['./upload-product-preview.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadProductPreviewComponent),
      multi: true
    }
  ]
})
export class UploadProductPreviewComponent implements ControlValueAccessor {

  @Input() label!: string;
  galleryItem!: IFile;

  constructor(private productsService: ProductsService) { }

  writeValue(galleryItem: IFile) {
		this.galleryItem = galleryItem;
	}

  uploadFile(event: any) {
    let file = event.target.files[0] as File;

    if (file) {
      // Max 2mb
      if (file.size > 2000000) {
        console.error(`Please upload a file of maximum 2mb`);
      }
      this.productsService.uploadProductPreview(file).pipe(
        untilDestroyed(this)
      ).subscribe(result => {
        this.galleryItem = {
          size: file.size,
          name: file.name,
          url: result
        };
        this.propagateChange(this.galleryItem);
      });
    }
  }

  fileDropped(file: any) {
    if (file) {
      // Max 2mb
      if (file.size > 2000000) {
        console.error(`Please upload a file of maximum 2mb`);
      }
      this.productsService.uploadProductPreview(file).pipe(
        untilDestroyed(this)
      ).subscribe(result => {
        this.galleryItem = {
          size: file.size,
          name: file.name,
          url: result
        };
        this.propagateChange(this.galleryItem);
      });
    }
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }
}
