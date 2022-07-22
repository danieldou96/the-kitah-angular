import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ApiService } from 'src/app/core/http/api.service';

@UntilDestroy()
@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadAvatarComponent),
      multi: true
    }
	]
})
export class UploadAvatarComponent implements ControlValueAccessor {

  @Input() alt!: string;
  avatar = new FormControl<string | null>(null);

  constructor(
    private apiService: ApiService,
    private hotToastService: HotToastService
  ) {
    this.avatar.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(val => this.propagateChange(val));
  }

  uploadFile(event: any) {
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      // Max 5mb
      if (file.size > 5000000) {
        this.hotToastService.error(`Please upload a file of maximum 5mb`);
        return;
      }
      this.apiService.uploadAvatar(file).pipe(
        untilDestroyed(this)
      ).subscribe(uploadedAvatarUrl => {
        this.avatar.patchValue(uploadedAvatarUrl);
        this.hotToastService.success('The avatar has been uploaded.');
      });
    }
  }

	writeValue(avatarUrl: string) {
		this.avatar.setValue(avatarUrl);
	}

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  reset() {
    this.avatar.setValue(null);
  }
}
