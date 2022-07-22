import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StripeCardNumberElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';

@Component({
  selector: 'app-saved-cards-list',
  templateUrl: './saved-cards-list.component.html',
  styleUrls: ['./saved-cards-list.component.scss']
})
export class SavedCardsListComponent implements OnInit {
  
  @Input() clientSecret!: string;
  @ViewChild(StripeCardNumberComponent) cardNumberComponent!: StripeCardNumberComponent;
  elementsOptions: StripeElementsOptions;
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

  constructor(private stripeService: StripeService) {
    this.elementsOptions = {
      clientSecret: this.clientSecret,
      locale: 'en',
      loader: 'always'
    };
  }

  ngOnInit(): void {
  }

}
