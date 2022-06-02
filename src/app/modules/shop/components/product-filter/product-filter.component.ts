import { AfterViewInit, Component, ContentChildren, forwardRef, Input, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IFilterItem } from 'src/app/shared/models/filter';
import { ProductFilterRowComponent } from '../product-filter-row/product-filter-row.component';

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
export class ProductFilterComponent implements ControlValueAccessor, AfterViewInit {

  @Input() title!: string;
  @Input() searchable = false;
  @Input() items: IFilterItem[] = [];
  //@ViewChildren(ProductFilterRowComponent) productFilterRowComponents!: QueryList<ProductFilterRowComponent>;

  selectedItems: string[] = [];

  constructor() { }

  writeValue(selectedItems: string[] | null) {
		this.selectedItems = selectedItems ?? [];
	}

  ngAfterViewInit() {
    /*console.log(this.selectedItems)
    this.productFilterRowComponents*/
  }

  selectItem(event: { value?: string, checked: boolean; }) {
    if (event.checked) {
      this.selectedItems.push(event.value!);
    } else {
      this.selectedItems = this.selectedItems.filter(i => i != event.value);
    }
    this.propagateChange(this.selectedItems);
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  isChecked(itemValue: string) {
    return this.selectedItems.includes(itemValue);
  }
}
