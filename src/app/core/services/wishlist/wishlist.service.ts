import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { combineLatest, first, map, merge, Observable, of, scan, shareReplay, startWith, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product';
import { AuthService } from '../../authentication/auth.service';
import { ApiService } from '../../http/api.service';

export interface WishlistItem extends IProduct {
  remove?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlist$: Observable<IProduct[]>;
  wishlistActions$: Observable<WishlistItem | null>;

  private wishlistAdd$ = new Subject<WishlistItem>();
  private wishlistRemove$ = new Subject<WishlistItem>();

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private hotToastService: HotToastService
  ) {
    this.wishlistActions$ = merge(this.wishlistRemove$, this.wishlistAdd$).pipe(
      startWith(null),
      shareReplay(1)
    );
    this.wishlist$ = combineLatest([
      this.wishlistActions$,
      this.authService.loggedInUser$.pipe(
        switchMap(loggedInUser => loggedInUser ? this.apiService.getWishlist() : of([]))
      )
    ]).pipe(
      scan((acc: WishlistItem[], [item, initialValue]: [(WishlistItem | null), IProduct[]]) => {
        if (!!item) {
          // Remove item
          if (item.remove) {
            return acc.filter(i => i.id !== item.id);
          }

          // Insert new item
          return [...acc, item].filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
        }

        // Set inital value from db/localStorage
        return [...initialValue].filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
      }, []),
      // debounceTime(500),
      withLatestFrom(this.wishlistActions$),
      tap(([newWishlistValue, item]) => {
        if (item === null) {
          return;
        }
        this.apiService.updateWishlist(newWishlistValue).pipe(
          first()
        ).subscribe();
      }),
      map(([cartValue]) => cartValue),
      shareReplay(1)
    );

    this.wishlistAdd$.subscribe(() => this.hotToastService.success('The product has been added to the Wishlist'));
  }

  addWishlistItem(item: WishlistItem) {
    this.wishlistAdd$.next(item);
  }
  
  removeWishlistItem(item: WishlistItem) {
    this.wishlistRemove$.next({ ...item, remove: true });
  }
}
