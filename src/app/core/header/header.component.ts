import { ChangeDetectionStrategy, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, Event, NavigationEnd } from '@angular/router';
import { WINDOW } from '@ng-web-apis/common';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, combineLatest, filter, first, map, Observable, of, switchMap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { ICartItem, IProduct } from 'src/app/shared/models/product';
import { User } from 'src/app/shared/models/user';
import { AuthService } from '../authentication/auth.service';
import { ApiService } from '../http/api.service';
import { CartService } from '../services/cart/cart.service';
import { HeaderService } from '../services/header/header.service';
import { StoreService } from '../services/store/store.service';
import { WishlistService } from '../services/wishlist/wishlist.service';

@UntilDestroy()
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

  searchFormControl = new FormControl();
  @ViewChild('searchInput') searchInputElement!: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    public headerService: HeaderService,
    private authService: AuthService,
    private apiService: ApiService,
    public storeService: StoreService,
    public cartService: CartService,
    public wishlistService: WishlistService,
    public hotToastService: HotToastService,
    @Inject(WINDOW) private window: Window
  ) {
    this.stickyHeader$ = this.headerService.stickyHeader$;
    this.loggedInUser$ = this.authService.loggedInUser$.pipe(
      map(apiAuthResponse => apiAuthResponse ?? null),
      map(userToken => userToken?.user!)
    );
    this.cart$ = this.cartService.cart$;
    this.wishlist$ = this.wishlistService.wishlist$;
    this.cartTotal$ = this.cartService.cartTotal$;

    this.router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd),
      untilDestroyed(this)
    ).subscribe(() => {
      //this.searchFormControl.reset();
      this.searchInputElement.nativeElement.blur();
    });
  }
  
  logout() {
    this.authService.logout();
  }

  search() {
    this.router.navigate(['/shop'], {
      queryParams: {
        search: this.searchFormControl.value
      }
    });
  }

  openStripeDashboard() {
    this.apiService.getStripeDashboardLink().pipe(
      first(),
      catchError(err => of(err.error)),
      switchMap(apiResponse => combineLatest([
        of(apiResponse),
        this.apiService.stripeAccountLink()
      ]))
    ).subscribe(([apiResponse, stripeAccountLink]: [ApiResponse<string>, string]) => {
      if (apiResponse.statusCode !== 200) {
        this.hotToastService.error(`${apiResponse.message} <a target="_blank" href="${stripeAccountLink}">Click here</a> to complete Stripe Onboarding.`, {
          duration: 6000
        });
      } else {
        this.window.open(apiResponse.data, '_blank');
      }
    });
  }
}
