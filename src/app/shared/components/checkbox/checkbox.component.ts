import { Component, forwardRef, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent implements ControlValueAccessor {

	@Input() checked = false;
	@Input() disabled = false;
	@Input() colored = false;
	@Output() private readonly changed = new EventEmitter<boolean>();

  constructor() { }

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
