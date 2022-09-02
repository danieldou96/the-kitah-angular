import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { CartService } from '../../services/cart/cart.service';
import { HeaderService } from '../../services/header/header.service';
import { ShopService } from '../../services/shop/shop.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@UntilDestroy()
@Component({
  selector: 'app-handheld-toolbar',
  templateUrl: './handheld-toolbar.component.html',
  styleUrls: ['./handheld-toolbar.component.scss']
})
export class HandheldToolbarComponent {

  public readonly handheldToolbarOpened$ = new BehaviorSubject<boolean>(true);
  isShop$: Observable<boolean>;
  
  constructor(
    public router: Router,
    public authService: AuthService,
    public wishlistService: WishlistService,
    public cartService: CartService,
    public shopService: ShopService,
    public headerService: HeaderService
  ) {
    this.headerService.mobileSidebarOpened$.pipe(
      tap(mobileSidebarOpened => this.handheldToolbarOpened$.next(!mobileSidebarOpened)),
      untilDestroyed(this)
    ).subscribe();
    
    this.isShop$ = this.router.events.pipe(
      filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.url.startsWith('/shop'))
    );
  }
}
