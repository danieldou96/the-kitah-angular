import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject } from 'rxjs';
import { IState, StatesAU, StatesCA, StatesUS } from 'src/app/shared/data/phone-country-code';

@UntilDestroy()
@Component({
  selector: 'app-state-input',
  templateUrl: './state-input.component.html',
  styleUrls: ['./state-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StateInputComponent),
      multi: true
    }
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateInputComponent implements ControlValueAccessor, OnChanges {

  @Input() selectedCountry!: string;
  @Output() statesChanged = new EventEmitter<void>();
  requireState$ = new ReplaySubject<boolean>(1);

  UsStates = StatesUS;
  AuStates = StatesAU;
  CaStates = StatesCA;
  states: IState[] = [];
  state = new FormControl<string | null>(null);

  constructor(private cd: ChangeDetectorRef) {
    this.state.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(state => this.propagateChange(state));
  }

  ngOnChanges() {
    this._updateStatesList(this.selectedCountry);
  }

  private _updateStatesList(country: string) {
    switch(country) {
      case 'US': { this.states = this.UsStates; break; }
      case 'CA': { this.states = this.CaStates; break; }
      case 'AU': { this.states = this.AuStates; break; }
      default: { this.states = []; break; }
    };
    this.requireState$.next(Boolean(this.states.length));
    this.state.setValue(null);
    this.statesChanged.emit();
    this.cd.detectChanges();
  }

  writeValue(state: string | null) {
    this.state.setValue(state);
	}

  propagateChange = (_: string | null) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }
}
