import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export enum EPriceFilterOptions {
  Free = 'free',
  UnderFive = 'under-5',
  FiveToTen = '5-10',
  TenAndUp = '10-up'
}

@UntilDestroy()
@Component({
  selector: 'app-price-filter',
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriceFilterComponent),
      multi: true
    }
  ]
})
export class PriceFilterComponent implements ControlValueAccessor {

  @Input() title!: string;
  selectedPriceRangeControl = new FormControl();

  constructor() {
    this.selectedPriceRangeControl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(val => this.propagateChange(this.selectedPriceRangeControl.value));
  }

  writeValue(selectedPrice: EPriceFilterOptions) {
		this.selectedPriceRangeControl.setValue(selectedPrice);
	}

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }
}
