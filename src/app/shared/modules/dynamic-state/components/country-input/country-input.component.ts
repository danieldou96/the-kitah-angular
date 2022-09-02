import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { countries } from 'src/app/shared/data/phone-country-code';

@UntilDestroy()
@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountryInputComponent),
      multi: true
    }
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryInputComponent implements ControlValueAccessor {

  country = new FormControl<string | null>(null);
  countries = countries;

  constructor(private cd: ChangeDetectorRef) {
    this.country.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(country => {
      this.propagateChange(country);
      this.cd.detectChanges();
    });
  }

  writeValue(country: string | null) {
    this.country.setValue(country);
	}

  propagateChange = (_: string | null) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }
}
