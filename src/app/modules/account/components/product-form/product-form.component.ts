import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WINDOW } from '@ng-web-apis/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { first, Observable, shareReplay } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IFile, IProduct } from 'src/app/shared/models/product';
import { conditionalValidator } from 'src/app/shared/validators/validators';

@UntilDestroy()
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() product!: IProduct;
  @Output() submitFormEvent = new EventEmitter();
  form!: FormGroup;
  generatedPreviewImages: IFile[] = [];
  fileUploaded = false;
  productFile!: IFile;
  stripeDetailsSubmitted$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private productsService: ProductsService,
    public categoriesService: CategoriesService,
    @Inject(WINDOW) private readonly window: Window
  ) {
    this.stripeDetailsSubmitted$ = this.apiService.checkIfStripeDetailsSubmitted().pipe(shareReplay(1));
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: new FormControl(this.product?.name ?? null, [Validators.required]),
      price: new FormControl(this.product?.price ?? null, [Validators.required]),
      file: new FormControl(this.product?.file ?? null, [Validators.required]),
      previewsType: new FormControl(this.product?.previewsType ? 'later' : 'auto', [Validators.required]),
      previews: new FormControl(this.product?.previewsType == 'auto' ? [
        this.product.mainPicture,
        ...this.product?.gallery
      ] : [], [
        conditionalValidator(
          () => this.form.controls['previewsType'].value == 'auto',
          [Validators.required]
        )
      ]),
      uploadedPreview1: new FormControl(this.product?.previewsType == 'upload' ? this.product?.mainPicture ?? null : null, [
        conditionalValidator(
          () => this.form.controls['previewsType'].value == 'upload',
          [Validators.required]
        )
      ]),
      uploadedPreview2: new FormControl(this.product?.previewsType == 'upload' ? this.product?.gallery[0] ?? null : null),
      uploadedPreview3: new FormControl(this.product?.previewsType == 'upload' ? this.product?.gallery[1] ?? null : null),
      uploadedPreview4: new FormControl(this.product?.previewsType == 'upload' ? this.product?.gallery[2] ?? null : null),
      grades: new FormControl(this.product?.grades?.map(g => g.id) ?? [], [Validators.required, Validators.minLength(1)]),
      subjects: new FormControl(this.product?.subjects?.map(s => s.id) ?? [], [Validators.required, Validators.minLength(1)]),
      resourceTypes: new FormControl(this.product?.resourceTypes?.map(r => r.id) ?? [], [Validators.required, Validators.minLength(1)]),
      description: new FormControl(this.product?.description ?? null, [Validators.required]),
      published: new FormControl(false, [Validators.required]),
      myOwn: new FormControl(false, [Validators.requiredTrue])
    });
    this.form.controls['previewsType'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(() => {
      this.formControls['previews'].updateValueAndValidity({ emitEvent: false });
    });
  }

  uploadFile(event: any) {
    const file = event.target.files[0] as File;
    
    if (file) {
      // Max 50mb
      if (file.size > 50000000) {
        console.error(`Please upload a file of maximum 5mb`);
      }
      this.productsService.uploadProductFile(file, this.form.controls['previewsType'].value == 'auto').pipe(
        untilDestroyed(this)
      ).subscribe(result => {
        this.form.patchValue({ file });
        this.form.patchValue({ previews: result.generatedThumbnails ?? [] });
        this.fileUploaded = true;
        this.productFile = {
          url: result.fileUrl,
          size: file.size,
          name: file.name
        };
        this.generatedPreviewImages = result.generatedThumbnails ?? [];
      });
    }
  }

  fileDropped(file: any) {
    if (file) {
      // Max 50mb
      if (file.size > 50000000) {
        console.error(`Please upload a file of maximum 5mb`);
      }
      this.productsService.uploadProductFile(file, this.form.controls['previewsType'].value == 'auto').pipe(
        untilDestroyed(this)
      ).subscribe(result => {
        this.form.patchValue({ file });
        this.form.patchValue({ previews: result.generatedThumbnails ?? [] });
        this.fileUploaded = true;
        this.productFile = {
          url: result.fileUrl,
          size: file.size,
          name: file.name
        };
        this.generatedPreviewImages = result.generatedThumbnails ?? [];
      });
    }
  }

  get formControls() {
    return this.form.controls;
  }

  resumeStripeForm() {
    this.apiService.stripeAccountLink().pipe(
      first()
    ).subscribe(stripeAccountLink => this.window.open(stripeAccountLink, '_blank')?.focus());
  }

  submit() {
    if (this.form.invalid) {
      Object.values(this.formControls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.submitFormEvent.emit(<IProduct>{
      name: this.form.controls['title'].value,
      price: this.form.controls['price'].value,
      file: this.productFile,
      previewsType: this.form.controls['previewsType'].value,
      ...(this.form.controls['previewsType'].value != 'later' && {
        mainPicture: this.form.controls['uploadedPreview1'].value ?? this.generatedPreviewImages[0] ?? null,
        gallery: ([
          this.form.controls['uploadedPreview2'].value ?? this.generatedPreviewImages[1] ?? null,
          this.form.controls['uploadedPreview3'].value ?? this.generatedPreviewImages[2] ?? null,
          this.form.controls['uploadedPreview4'].value ?? this.generatedPreviewImages[3] ?? null
        ] as IFile[]).filter(g => g != null && g != undefined)
      }),
      description: this.form.controls['description'].value,
      grades: this.form.controls['grades'].value,
      subjects: this.form.controls['subjects'].value,
      resourceTypes: this.form.controls['resourceTypes'].value,
      published: this.form.controls['published'].value,
    });
  }
}
