import { AfterViewInit, ChangeDetectorRef, ContentChild, Directive } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ReplaySubject } from 'rxjs';
import { CountryInputComponent } from '../../components/country-input/country-input.component';
import { StateInputComponent } from '../../components/state-input/state-input.component';

@UntilDestroy()
@Directive({
  selector: '[appDynamicState]'
})
export class DynamicStateDirective implements AfterViewInit {

  requireState = true;
  statesUpdated$ = new ReplaySubject<void>();
  @ContentChild(StateInputComponent) stateInputComponent?: StateInputComponent;
  @ContentChild(CountryInputComponent) countryInputComponent?: CountryInputComponent;

  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.stateInputComponent?.requireState$.pipe(
      untilDestroyed(this)
    ).subscribe(requireState => {
      this.requireState = requireState;
      this.statesUpdated$.next();
      this.cd.detectChanges();
    });
  }
}
