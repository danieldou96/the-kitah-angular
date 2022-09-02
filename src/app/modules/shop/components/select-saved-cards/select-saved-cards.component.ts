import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

export interface StripeCard {
  id: string;
  object: 'card';
  account?: string | null;
  addressCity: string | null;
  addressCountry: string | null;
  addressLine1: string | null;
  addressLine1Check: 'pass' | 'fail' | 'unavailable' | 'unchecked' | null;
  addressLine2: string | null;
  addressState: string | null;
  addressZip: string | null;
  addressZipCheck: 'pass' | 'fail' | 'unavailable' | 'unchecked' | null;
  brand: 'American Express' | 'Diners Club' | 'Discover' | 'JCB' | 'MasterCard' | 'UnionPay' | 'Visa' | 'Unknown';
  country: string | null;
  currency?: string | null;
  customer?: string | null;
  cvcCheck: string | null;
  defaultForCurrency?: boolean | null;
  deleted?: void;
  description?: string;
  dynamicLast4: string | null;
  expMonth: number;
  expYear: number;
  fingerprint?: string | null;
  funding: 'credit' | 'debit' | 'prepaid' | 'unknown';
  iin?: string;
  issuer?: string;
  last4: string;
  metadata: { [name: string]: string; } | null;
  name: string | null;
  status?: 'new' | 'errored' | null;
  tokenizationMethod: 'android_pay' | 'apple_pay' | 'masterpass' | 'visa_checkout' | null;
}

@UntilDestroy()
@Component({
  selector: 'app-select-saved-cards',
  templateUrl: './select-saved-cards.component.html',
  styleUrls: ['./select-saved-cards.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSavedCardsComponent),
      multi: true
    }
	],
})
export class SelectSavedCardsComponent implements ControlValueAccessor {

  @Input() cards: StripeCard[] = [];
  @Output() deletedCard = new EventEmitter<string>();
  selectedCard = new FormControl<string | null>(null);

  constructor() {
    this.selectedCard.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(selectedCard => this.propagateChange(selectedCard));
  }

  writeValue(cardId: string | null) {
		this.selectedCard.setValue(cardId);
	}

  propagateChange = (_: string | null) => { };

  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any) { }

  selectCard(cardId: string) {
    this.selectedCard.setValue(cardId);
  }

  deleteCard(cardId: string) {
    this.deletedCard.emit(cardId);
  }
}
