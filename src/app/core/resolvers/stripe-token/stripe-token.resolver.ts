import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { ApiService } from '../../http/api.service';
import { CartService } from '../../services/cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class StripeTokenResolver implements Resolve<Observable<string | null>> {

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.cartService.cartTotal$.pipe(
      switchMap(cartTotal => {
        if (cartTotal == 0) {
          return of(null);
        }
        return this.apiService.getStripeIntentSecret();
      })
    );
  }
}