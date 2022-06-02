import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
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

  public options: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    toolbarButtons: {
      'moreText': {
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'textColor', 'backgroundColor', 'clearFormatting']
      },
      'moreParagraph': {
        'buttons': ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify', 'outdent', 'indent', 'quote']
      },
      'moreRich': {
        'buttons': ['insertLink', 'insertTable']
      },
      'moreMisc': {
        'buttons': ['undo', 'redo'],
        'align': 'right'
      }
    
    }
  }

  @Input() product!: IProduct;
  @Output() submitFormEvent = new EventEmitter();
  form!: FormGroup;
  generatedPreviewImages: string[] = [];
  fileUploaded = false;
  productFile!: IFile;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    public categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: new FormControl(this.product?.name ?? null, [Validators.required]),
      price: new FormControl(this.product?.price ?? null, [Validators.required]),
      file: new FormControl(this.product?.file ?? null, [Validators.required]),
      previewsType: new FormControl(this.product?.previewsType ?? 'auto', [Validators.required]),
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
      description: new FormControl(this.product?.description ?? null, [Validators.required])
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
      this.form.patchValue({ file });
      this.productsService.uploadProductFile(file, this.form.controls['previewsType'].value == 'auto').pipe(
        untilDestroyed(this)
      ).subscribe(result => {
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
      // Max 5mb
      if (file.size > 5000000) {
        console.error(`Please upload a file of maximum 5mb`);
      }
      this.form.patchValue({ file });
    }
  }

  get formControls() {
    return this.form.controls;
  }

  submit() {
    this.submitFormEvent.emit(<IProduct>{
      name: this.form.controls['title'].value,
      price: this.form.controls['price'].value,
      file: this.productFile,
      previewsType: this.form.controls['previewsType'].value,
      ...(this.form.controls['previewsType'].value != 'later' && {
        mainPicture: this.form.controls['uploadedPreview1'].value ?? this.generatedPreviewImages[0],
        gallery: ([
          this.form.controls['uploadedPreview2'].value ?? this.generatedPreviewImages[1],
          this.form.controls['uploadedPreview3'].value ?? this.generatedPreviewImages[2],
          this.form.controls['uploadedPreview4'].value ?? this.generatedPreviewImages[3]
        ] as IFile[]).filter(g => g != null && g != undefined)
      }),
      description: this.form.controls['description'].value,
      grades: this.form.controls['grades'].value,
      subjects: this.form.controls['subjects'].value,
      resourceTypes: this.form.controls['resourceTypes'].value,
    });
  }
}