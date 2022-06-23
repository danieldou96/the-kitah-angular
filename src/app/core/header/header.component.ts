import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICartItem, IProduct } from 'src/app/shared/models/product';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../authentication/auth.service';
import { CartService } from '../services/cart/cart.service';
import { HeaderService } from '../services/header/header.service';
import { StoreService } from '../services/store/store.service';
import { WishlistService } from '../services/wishlist/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  stickyHeader$: Observable<boolean>;
  loggedInUser$: Observable<User | null>;
  cart$: Observable<ICartItem[]>;
  wishlist$: Observable<IProduct[]>;
  cartTotal$: Observable<number>;

  constructor(
    public headerService: HeaderService,
    private authService: AuthService,
    public storeService: StoreService,
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {
    this.stickyHeader$ = this.headerService.stickyHeader$;
    this.loggedInUser$ = this.authService.loggedInUser$.pipe(
      map(apiAuthResponse => apiAuthResponse ?? null),
      map(userToken => userToken?.user!)
    );
    this.cart$ = this.cartService.cart$;
    this.wishlist$ = this.wishlistService.wishlist$;
    this.cartTotal$ = this.cartService.cartTotal$;
  }
  
  logout() {
    this.authService.logout();
  }
}
