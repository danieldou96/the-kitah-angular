import { AbstractControl, ValidatorFn } from "@angular/forms";

export function minArrayLength(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
		if (control.value.length >= minLength) {
			return null;
		} else {
			return { 'minArrayLength' : { value: control.value } };
		}
  };
}

export function expirationDate(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
		if (control.value) {
			const month: string = control.value.substr(0,2);
			const year: string = control.value.substr(2,4);
			if (month.length != 2 || year.length != 2 || Number(month) > 12 || Number(month) <= 0) {
				return { 'inValidFormat' : { value: control.value } };
			}
			const expiry = new Date(Number('20' + year), Number(month));
			if (isNaN(expiry.getTime())) {
				return { 'inValidFormat' : { value: control.value } };
			}
			const current = new Date();
			const notExpired = expiry.getTime() > current.getTime();
			if (notExpired) {
				return null;
			} else {
				return { 'expirationDate' : { value: control.value } };
			}
		} else {
			return null;
		}
  };
}

export function conditionalValidator(
	predicate: { (): boolean; },
	validators: ValidatorFn[]
): ValidatorFn {
	return (formControl) => {
		if (!formControl.parent) {
			return null;
		}
		let error: {} | null = null;
		if (predicate()) {
			for (const validator of validators) {
				error = {
					...error!,
					...validator(formControl)
				}
			}
		}
		return error;
	};
}
