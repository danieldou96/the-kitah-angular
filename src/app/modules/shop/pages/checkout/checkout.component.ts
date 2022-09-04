import { Component, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { StripeCardNumberElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { combineLatest, filter, first, map, merge, Observable, of, ReplaySubject, shareReplay, startWith, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { DocumentService } from 'src/app/core/services/document/document.service';
import { ICartItem } from 'src/app/shared/models/product';
import { IBilling } from 'src/app/shared/models/user';
import { DynamicStateDirective } from 'src/app/shared/modules/dynamic-state/directives/dynamic-state/dynamic-state.directive';
import { StripeCard } from '../../components/select-saved-cards/select-saved-cards.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  
  cardOptions: StripeCardNumberElementOptions;
  @ViewChild(StripeCardNumberComponent) cardNumberComponent!: StripeCardNumberComponent;
  @ViewChild(DynamicStateDirective) dynamicStateDirective?: DynamicStateDirective;

  elementsOptions$: Observable<StripeElementsOptions>;
  paymentIntentSecret$: Observable<string | null>;
  form$: Observable<FormGroup>;
  submitted = false;

  private _savedCardSubject$ = new ReplaySubject<void>(1);
  useNewCardSubject$ = new ReplaySubject<boolean>(1);
  useNewCard$: Observable<boolean>;
  savedCards$: Observable<StripeCard[]>;
  

  billing$: Observable<IBilling | null>;
  editBilling$: Observable<boolean>;
  private _editBillingSubject$ = new ReplaySubject<boolean>(1);

  cart$: Observable<ICartItem[]>;
  cartTotal$: Observable<number>;

  constructor(
    private cartService: CartService,
    private hotToastService: HotToastService,
    private router: Router,
    private apiService: ApiService,
    private documentService: DocumentService,
    private authService: AuthService,
    private stripeService: StripeService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.cardOptions = {
      showIcon: true,
      style: { base: { fontFamily: '"Lato", "Helvetica Neue", sans-serif', fontSize: '15px' } },
    };
    this.billing$ = this.route.data.pipe(map(data => data['billing']));
    this.editBilling$ = merge(
      this._editBillingSubject$,
      this.billing$.pipe(map(billing => !billing))
    );
    this.cart$ = this.cartService.cart$;
    this.cartTotal$ = this.cartService.cartTotal$;

    this.savedCards$ = this._savedCardSubject$.pipe(
      startWith(void 0),
      switchMap(() => this.apiService.getSavedCards()),
      shareReplay(1)
    );

    this.form$ = combineLatest([
      this.savedCards$,
      this.billing$,
      this.useNewCardSubject$.pipe(
        startWith(false),
        shareReplay(1)
      )
    ]).pipe(
      map(([savedCards, billing, useNewCard]) => this.fb.group({
        firstname: new FormControl(billing?.firstname ?? this.authService.loggedInUser?.user.firstname, [Validators.required]),
        lastname: new FormControl(billing?.lastname ?? this.authService.loggedInUser?.user.lastname, [Validators.required]),
        company: new FormControl(billing?.company ?? undefined),
        street1: new FormControl(billing?.street1 ?? undefined),
        street2: new FormControl(billing?.street2 ?? undefined),
        country: new FormControl(billing?.country ?? 'US'),
        city: new FormControl(billing?.city ?? undefined),
        state: new FormControl(billing?.state ?? undefined),
        zipcode: new FormControl(billing?.zipcode ?? undefined),
        terms: new FormControl(false, [Validators.requiredTrue]),
        selectedSavedCard: new FormControl<string | null>(savedCards.length == 0 || useNewCard ? null : savedCards[0].id),
        noRefunds: new FormControl(false, [Validators.requiredTrue]),
        personalUse: new FormControl(false, [Validators.requiredTrue]),
        saveForFuture: new FormControl(false),
      })),
      tap(form => this.useNewCardSubject$.next(!form.controls.selectedSavedCard.value)),
      shareReplay(1)
    );

    this.useNewCard$ = merge(
      this.form$.pipe(
        switchMap(form => form.controls['selectedSavedCard'].valueChanges),
        map(selectedSavedCard => !selectedSavedCard),
      ),
      this.useNewCardSubject$.pipe(
        withLatestFrom(this.form$),
        tap(([useNewCard, form]) => {
          if (useNewCard) {
            form.controls['selectedSavedCard'].setValue(null)
          }
        }),
        map(([useNewCard]) => useNewCard)
      )
    ).pipe(shareReplay(1));
    
    this.paymentIntentSecret$ = this.route.data.pipe(
      map(data => data['intentSecret']),
      shareReplay(1)
    );

    this.elementsOptions$ = this.useNewCard$.pipe(
      filter(useNewCard => useNewCard),
      switchMap(() => this.paymentIntentSecret$),
      filter(paymentIntentSecret => !!paymentIntentSecret),
      map(paymentIntentSecret => paymentIntentSecret!),
      map(clientSecret => ({
        clientSecret,
        locale: 'en',
        loader: 'always'
      }))
    );
  }

  setEditBillingDetails(edit: boolean) {
    this._editBillingSubject$.next(edit);
  }

  deleteCard(cardId: string) {
    this.apiService.deleteSavedCard(cardId).pipe(first()).subscribe(() => {
      this._savedCardSubject$.next();
      this.useNewCardSubject$.next(true);
      this.hotToastService.success('The card has been deleted successfuly.');
    });
  }
  
  submit() {
    this.submitted = true;

    combineLatest([
      this.form$,
      this.cartTotal$.pipe(take(1))
    ]).pipe(
      tap(([form]) => {
        if (form.invalid) {
          this.documentService.scrollToError();
          return;
        }
      }),
      filter(([form]) => !form.invalid),
      switchMap(([form, cartTotal]) => {
        if (cartTotal > 0) {
          let token$: Observable<string>;
          if (form.controls['selectedSavedCard'].value) {
            token$ = of(form.controls['selectedSavedCard'].value)
          } else {
            token$ = this.stripeService.createToken(this.cardNumberComponent.element, {
              name: `${form.controls['firstname'].value} ${form.controls['lastname'].value}`,
              address_line1: form.controls['street1'].value,
              address_line2: form.controls['street2'].value ?? '',
              address_zip: form.controls['zipcode'].value,
              address_city: form.controls['city'].value,
              address_state: form.controls['state'].value,
              address_country: form.controls['country'].value
            }).pipe(
              tap(stripeResult => {
                if (stripeResult.error) {
                  this.hotToastService.error(stripeResult.error.message);
                  console.error(stripeResult.error);
                  return;
                }
              }),
              filter(stripeResult => !stripeResult.error),
              map(stripeResult => stripeResult.token?.id!)
            );
          }
          return token$.pipe(
            withLatestFrom(this.form$),
            map(([token, form]: [string, FormGroup]) => ({
              token,
              ...form.value
            })),
            switchMap(paymentForm => this.checkout(paymentForm)),
            first()
          );
        }
        return this.checkout(form.value);
      }),
      first()
    ).subscribe(orderId => {
      this.router.navigate(['checkout-success'], { state: { orderId } });
      this.cartService.checkout();
    });
  }

  checkout(paymentForm: any) {
    return this.apiService.checkout(paymentForm).pipe(
      this.hotToastService.observe({
        loading: 'Processing...',
        success: 'Order placed successfully!',
        error: 'Error!'
      })
    );
  }
}
