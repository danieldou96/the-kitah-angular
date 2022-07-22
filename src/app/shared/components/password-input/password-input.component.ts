import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
	]
})
export class PasswordInputComponent implements ControlValueAccessor {

  showPassword = new FormControl(false);
  value = new FormControl('');
  
  constructor() {
    this.value.valueChanges.pipe(
      tap(val => this.propagateChange(val)),
      untilDestroyed(this)
    ).subscribe();
  }

	writeValue(value: string) {
		this.value.setValue(value);
	}

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }
}
