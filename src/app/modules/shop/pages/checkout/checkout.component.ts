import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StripeCardNumberElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { countries, StatesUS } from 'src/app/shared/data/phone-country-code';
import { ICartItem } from 'src/app/shared/models/product';

@UntilDestroy()
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  elementsOptions: StripeElementsOptions;
  @ViewChild(StripeCardNumberComponent) cardNumberComponent!: StripeCardNumberComponent;
  cart$: Observable<ICartItem[]>;
  cartTotal$: Observable<number>;

  submitted = false;
  checkoutForm!: FormGroup;
  countries = countries.map(c => c.name);
  states = StatesUS.map(c => c.name);

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private stripeService: StripeService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
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

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstname: new FormControl(this.authService.loggedInUser?.user.firstname, [Validators.required]),
      lastname: new FormControl(this.authService.loggedInUser?.user.lastname, [Validators.required]),
      company: new FormControl(undefined),
      country: new FormControl('United States'),
      street: new FormControl(undefined),
      street2: new FormControl(undefined),
      city: new FormControl(undefined),
      state: new FormControl(undefined),
      zipcode: new FormControl(undefined),
      phone: new FormControl(undefined),
      terms: new FormControl(undefined, [Validators.requiredTrue]),
    });
  }

	get formControls() {
		return this.checkoutForm.controls;
	}
  
  submit() {
    this.submitted = true;

    if (!this.checkoutForm.valid) {
      return;
    }

    this.stripeService.createToken(this.cardNumberComponent.element).pipe(
      untilDestroyed(this)
    ).subscribe(result => {
      if (result.error) {
        console.error(result.error);
        return;
      }
      // Execute the custom method defined on the caller component
      this.cartService.checkout(result.token?.id!, this.checkoutForm.value);
    });
  }

}
