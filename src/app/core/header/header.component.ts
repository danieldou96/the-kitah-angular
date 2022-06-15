import { Component } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';
import { ERoles } from 'src/app/shared/enums/user';
import { ICartItem, IProduct } from 'src/app/shared/models/product';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../authentication/auth.service';
import { ApiService } from '../http/api.service';
import { CartService } from '../services/cart/cart.service';
import { HeaderService } from '../services/header/header.service';
import { StoreService } from '../services/store/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  stickyHeader$: Observable<boolean>;
  loggedInUser$: Observable<User | null>;
  cart$: Observable<ICartItem[]>;
  cartTotal$: Observable<number>;

  constructor(
    private headerService: HeaderService,
    private authService: AuthService,
    public storeService: StoreService,
    public cartService: CartService
  ) {
    this.stickyHeader$ = this.headerService.stickyHeader$;
    this.loggedInUser$ = this.authService.loggedInUser$.pipe(
      map(apiAuthResponse => apiAuthResponse ?? null),
      map(userToken => userToken?.user!)
    );
    this.cart$ = this.cartService.cart$;
    this.cartTotal$ = this.cartService.cartTotal$;
  }
  
  logout() {
    this.authService.logout();
  }
}
