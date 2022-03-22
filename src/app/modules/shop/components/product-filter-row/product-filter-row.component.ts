import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FilterItem } from 'src/app/shared/models/filter';

@Component({
  selector: 'app-product-filter-row',
  templateUrl: './product-filter-row.component.html',
  styleUrls: ['./product-filter-row.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
        overflow: 'hidden',
        height: '*'
      })),
      state('false', style({
        overflow: 'hidden',
        height: '0px'
      })),
      transition('true => false', animate('.3s ease-in-out')),
      transition('false => true', animate('.3s ease-in-out'))
    ])
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductFilterRowComponent),
      multi: true
    }
  ]
})
export class ProductFilterRowComponent implements ControlValueAccessor {

	@Input() checked = false;
  @Input() item!: FilterItem;
	@Output() private readonly changed = new EventEmitter<boolean>();

  readonly childrenExpanded$ = new BehaviorSubject<boolean>(false);

  toggleChildren() {
    this.childrenExpanded$.next(!this.childrenExpanded$.value);
  }

  writeValue(checked: boolean) {
		this.checked = checked;
	}

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

	toggle(checked: boolean) {
		this.changed.emit(checked);
		this.propagateChange(checked);
	}
}
