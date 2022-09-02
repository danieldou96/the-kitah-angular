import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IStore } from 'src/app/shared/models/product';
import slugify from 'slugify';
import { HotToastService } from '@ngneat/hot-toast';
import { ApiService } from 'src/app/core/http/api.service';
import { first } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  form!: FormGroup;
  store: IStore;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private hotToastService: HotToastService,
    private fb: FormBuilder
  ) {
    this.store = this.activatedRoute.snapshot.data['store'];
  }

  ngOnInit() {
    this.form = this.fb.group({
      banner: new FormControl(this.store.banner ?? null),
      avatar: new FormControl(this.store.avatar ?? null),
      name: new FormControl(this.store.name ?? null, [Validators.required]),
      url: new FormControl(this.store.url ?? null, [Validators.required]),
      newOrderNotification: new FormControl(this.store.newOrderNotification ?? false),
      description: new FormControl(this.store.description ?? null),
    });

    this.formControls['name'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe((val: string) => {
      this.formControls['url'].setValue(slugify(val, {
        lower: true,
        strict: true,
        trim: true
      }), { emitEvent: false });
    });

    this.formControls['url'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe((val: string) => {
      this.formControls['url'].setValue(slugify(val, {
        lower: true,
        strict: true,
        trim: true
      }), { emitEvent: false });
    });
  }

  uploadBanner(event: any) {
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      // Max 5mb
      if (file.size > 5000000) {
        this.hotToastService.error(`Please upload a file of maximum 5mb`);
        return;
      }
      this.apiService.uploadBanner(file).pipe(
        untilDestroyed(this)
      ).subscribe(uploadedBannerUrl => {
        this.formControls['banner'].patchValue(uploadedBannerUrl);
        this.hotToastService.success('The banner has been uploaded.');
      });
    }
  }

  get formControls() {
    return this.form.controls;
  }

  reset() {
    this.formControls['banner'].setValue(null);
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

    this.apiService.updateStoreDetails(this.store.id!, this.form.value).pipe(
      first()
    ).subscribe(store => {
      this.store = store;
      this.form.patchValue(store);
      this.hotToastService.success('Success!');
    });
  }
}
