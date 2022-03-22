import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, filter, map, Observable, ReplaySubject } from 'rxjs';

enum EHandle {
  Lower = 'lower',
  Upper = 'upper'
}

interface IStep {
  position: number;
  value: string;
}

interface IHorizontalBarState {
  position: number;
  width: number;
}

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
  @Input() set min(value: number) {
    this._min$.next(value);
  };
  @Input() set max(value: number) {
    this._max$.next(value);
  };
  @Input() set steps(value: number) {
    this._steps$.next(value);
  };

  EHandle = EHandle;

  currentRange: [number, number] = [0, 100];
  currentPanedHandle: EHandle | undefined;

  initialPanPosition$ = new BehaviorSubject<number>(138);
  currentPanPosition$ = new BehaviorSubject<number>(0);

  private _min$ = new ReplaySubject<number>(1);
  private _max$ = new ReplaySubject<number>(1);
  private _steps$ = new ReplaySubject<number>(1);
  steps$: Observable<IStep[]>;

  lowerHandlePosition$: Observable<number>;
  upperHandlePosition$: Observable<number>;
  //horizontalBarState$: Observable<IHorizontalBarState>;
  
  constructor() {
    this.lowerHandlePosition$ = combineLatest([
      this.initialPanPosition$,
      this.currentPanPosition$
    ]).pipe(
      filter(() => this.currentPanedHandle == EHandle.Lower),
      map(([initialPanPosition, currentPanPosition]) => {
        const finalPosition = currentPanPosition - initialPanPosition + 11;
        if (finalPosition < 11) {
          return 11;
        }
        if (finalPosition > 367) {
          return 100;
        }
        return finalPosition;
      })
    );
    this.upperHandlePosition$ = combineLatest([
      this.initialPanPosition$,
      this.currentPanPosition$
    ]).pipe(
      filter(() => this.currentPanedHandle == EHandle.Upper),
      map(([initialPanPosition, currentPanPosition]) => {
        const finalPosition = initialPanPosition - currentPanPosition - 11;
        if (finalPosition < -11) {
          return -11;
        }
        if (finalPosition > 100) {
          return 100;
        }
        return finalPosition;
      })
    );
    this.steps$ = combineLatest([
      this._steps$,
      this._min$,
      this._max$
    ]).pipe(
      map(([stepsCount, min, max]) => {
        const steps: IStep[] = [];
        for (let index = 0; index < stepsCount; index++) {
          steps.push(<IStep>{
            position: (100 / (stepsCount - 1)) * (index),
            value: Math.round(((max - min) / (stepsCount - 1)) * index).toString()
          });
        }
        return steps;
      })
    );
    /*this.horizontalBarState$ = combineLatest([
      this.initialPanPosition$,
      this.currentPanPosition$
    ]).pipe(
      map(([initialPanPosition, currentPanPosition]) => {

      })
    );*/
  }

  writeValue(currentRange: [number, number]) {
		this.currentRange = currentRange;
	}

  propagateChange = (_: any) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  onPanStart(event: any, handle: EHandle) {
    const hammerEvent = event as HammerInput;
    this.currentPanedHandle = handle;
    //this.initialPanPosition$.next(hammerEvent.center.x);
  }

  onPanEnd(event: any) {
    const hammerEvent = event as HammerInput;
    console.log(event)
    this.currentPanPosition$.next(hammerEvent.center.x);
  }

  onPanSlider(event: any) {
    const hammerEvent = event as HammerInput;
    this.currentPanPosition$.next(hammerEvent.center.x);
  }

}
