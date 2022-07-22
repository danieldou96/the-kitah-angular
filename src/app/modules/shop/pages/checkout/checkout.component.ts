import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StripeCardNumberElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { filter, first, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiService } from 'src/app/core/http/api.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { countries, IState, StatesAU, StatesCA, StatesUS } from 'src/app/shared/data/phone-country-code';
import { ICartItem } from 'src/app/shared/models/product';
import { IBilling } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@UntilDestroy()
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  elementsOptions: StripeElementsOptions;
  @ViewChild(StripeCardNumberComponent) cardNumberComponent!: StripeCardNumberComponent;
  billing: IBilling | null;
  cart$: Observable<ICartItem[]>;
  cartTotal$: Observable<number>;

  editBilling: boolean;

  submitted = false;
  checkoutForm!: FormGroup;
  countries = countries;
  UsStates = StatesUS;
  AuStates = StatesAU;
  CaStates = StatesCA;
  states: IState[] = this.UsStates;

  constructor(
    private cartService: CartService,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService,
    private stripeService: StripeService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.billing = this.route.snapshot.data['billing'];
    this.editBilling = !this.billing;
    this.cart$ = this.cartService.cart$;
    this.cartTotal$ = this.cartService.cartTotal$;
    this.elementsOptions = {
      clientSecret: this.route.snapshot.data['intentSecret'],
      locale: 'en',
      loader: 'always'
    };
  }

  cardOptions: StripeCardNumberElementOptions = {
    showIcon: true,
    style: {
      base: {
        lineHeight: 'normal',
        fontFamily: '"Lato", "Helvetica Neue", sans-serif',
        fontSize: '15px'
      },
    },
  };

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      firstname: new FormControl(this.billing?.firstname ?? this.authService.loggedInUser?.user.firstname, [Validators.required]),
      lastname: new FormControl(this.billing?.lastname ?? this.authService.loggedInUser?.user.lastname, [Validators.required]),
      company: new FormControl(this.billing?.company ?? undefined),
      street1: new FormControl(this.billing?.street1 ?? undefined),
      street2: new FormControl(this.billing?.street2 ?? undefined),
      country: new FormControl(this.billing?.country ?? 'US'),
      city: new FormControl(this.billing?.city ?? undefined),
      state: new FormControl(this.billing?.state ?? undefined),
      zipcode: new FormControl(this.billing?.zipcode ?? undefined),
      phone: new FormControl(this.billing?.phone ?? undefined),
      terms: new FormControl(false, [Validators.requiredTrue]),
      saveForFuture: new FormControl(false),
    });

    this.formControls['country'].valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(country => {
      if (country == 'US') {
        this.states = this.UsStates;
      } else if (country == 'CA') {
        this.states = this.CaStates;
      } else if (country == 'AU') {
        this.states = this.AuStates;
      } else {
        this.states = [];
      }
      this.formControls['state'].reset();
    });
  }

	get formControls() {
		return this.checkoutForm.controls;
	}

  editBillingDetails() {
    this.editBilling = !this.editBilling;
  }
  
  submit() {
    this.submitted = true;

    if (!this.checkoutForm.valid) {
      return;
    }

    this.cartTotal$.pipe(
      first(),
      switchMap(cartTotal => {
        if (cartTotal > 0) {
          return this.stripeService.createToken(this.cardNumberComponent.element, {
            name: `${this.formControls['firstname'].value} ${this.formControls['lastname'].value}`,
            address_line1: this.formControls['street1'].value,
            address_line2: this.formControls['street2'].value ?? '',
            address_zip: this.formControls['zipcode'].value,
            address_city: this.formControls['city'].value,
            address_state: this.formControls['state'].value,
            address_country: this.formControls['country'].value
          }).pipe(
            tap(result => {
              if (result.error) {
                console.error(result.error);
              }
            }),
            filter(result => !Boolean(result.error)),
            switchMap(result => this.apiService.checkout(result.token?.id!, this.checkoutForm.value))
          )
        } else {
          return this.apiService.checkout(undefined, this.checkoutForm.value);
        }
      })
    ).subscribe(orderId => {
      this.router.navigate(['checkout-success'], { state: { orderId } });
      this.cartService.checkout();
    });
  }
}
