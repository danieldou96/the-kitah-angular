import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { combineLatest, first, map, merge, Observable, of, scan, shareReplay, startWith, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { ICartItem } from 'src/app/shared/models/product';
import { AuthService } from '../../authentication/auth.service';
import { ApiService } from '../../http/api.service';
import cryptoRandomString from 'crypto-random-string';
import { CookieService } from 'ngx-cookie-service';

export interface CartTotals {
  subTot: number;
  tax: number;
  grandTot: number;
}

export interface CartItem extends ICartItem {
  remove?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: Observable<CartItem[]>;
  cartActions$: Observable<CartItem | null | 'checkout'>;
  cartTotal$: Observable<number>;

  private checkoutTrigger$ = new Subject<'checkout'>();
  private cartAdd$ = new Subject<ICartItem>();
  private cartRemove$ = new Subject<CartItem>();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private hotToastService: HotToastService,
    private cookieService: CookieService
  ) {
    this.cartActions$ = merge(this.cartRemove$, this.cartAdd$, this.checkoutTrigger$).pipe(
      startWith(null),
      shareReplay(1)
    );
    this.cart$ = combineLatest([
      this.cartActions$,
      this.authService.loggedInUser$.pipe(
        switchMap(loggedInUser => {
          if (loggedInUser) {
            return this.apiService.getShoppingCart();
          } else {
            return of(JSON.parse(this.cookieService.check('shoppingCart') ? this.cookieService.get('shoppingCart') : '[]') as ICartItem[]);
          }
        })
      )
    ]).pipe(
      scan((acc: CartItem[], [item, initialValue]: [(CartItem | null | 'checkout'), ICartItem[]]) => {
        if (item == 'checkout') {
          return [];
        }
        if (!!item) {
          // Remove item
          if (item.remove) {
            return acc.filter(i => i.id !== item.id);
          }

          // Insert new item
          return [...acc, item];
        }

        // Set inital value from db/localStorage
        return [...initialValue];
      }, []),
      // debounceTime(500),
      withLatestFrom(this.authService.loggedInUser$, this.cartActions$),
      tap(([newCartValue, loggedInUser, item]) => {
        if (item === null) {
          return;
        }

        if (!loggedInUser) {
          this.cookieService.set('shoppingCart', JSON.stringify(newCartValue));
        } else {
          this.apiService.updateShoppingCart(newCartValue).pipe(
            first()
          ).subscribe();
        }
      }),
      map(([cartValue]) => cartValue),
      shareReplay(1)
    );

    this.cartTotal$ = this.cart$.pipe(
      map(cartItems => {
        let total: number = 0;
        cartItems.forEach(i => {
          total += i.product.price;
        });
        return total;
      })
    );
    this.cartAdd$.subscribe(() => this.hotToastService.success('The product has been added to the cart'));
  }

  addCartItem(item: CartItem) {
    this.cartAdd$.next({
      id: Number(cryptoRandomString({length: 10, type: 'numeric'})),
      ...item
    });
  }
  
  removeCartItem(item: CartItem) {
    this.cartRemove$.next({ ...item, remove: true });
  }
  
  checkout() {
    this.checkoutTrigger$.next('checkout');
  }
}
