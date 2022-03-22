import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterItem } from 'src/app/shared/models/filter';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductFilterComponent),
      multi: true
    }
  ]
})
export class ProductFilterComponent implements ControlValueAccessor {

  @Input() title!: string;
  @Input() searchable = false;
  @Input() items: FilterItem[] = [];

  selectedItems: FilterItem[] = [];

  constructor(private fb: FormBuilder) { }

  writeValue(selectedItems: FilterItem[]) {
		this.selectedItems = selectedItems;
	}

  selectItem(checked: boolean, item: FilterItem) {
    if (checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i.value != item.value);
    }
    this.propagateChange(this.selectedItems);
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

}
