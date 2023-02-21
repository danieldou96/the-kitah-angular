import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { combineLatest, first, map, Observable, of, scan, shareReplay, startWith, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product';
import { AuthService } from '../../authentication/auth.service';
import { ApiService } from '../../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedProductService {

  recentlyViewedProducts$: Observable<IProduct[]>;

  private _recentlyViewedProductsAddSubject$ = new Subject<IProduct | null>();
  private _recentlyViewedProductsAdd$: Observable<IProduct | null>;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this._recentlyViewedProductsAdd$ = this._recentlyViewedProductsAddSubject$.pipe(
      startWith(null),
      shareReplay(1)
    );

    this.recentlyViewedProducts$ = combineLatest([
      this._recentlyViewedProductsAdd$,
      this.authService.loggedInUser$.pipe(
        switchMap(loggedInUser => {
          if (!loggedInUser) {
            return of(JSON.parse(this.cookieService.check('recentlyViewedProducts') ? this.cookieService.get('recentlyViewedProducts') : '[]') as IProduct[]);
          }
          return this.apiService.getRecentlyViewedProducts();
        })
      )
    ]).pipe(
      scan((acc: IProduct[], [item, initialValue]: [(IProduct | null), IProduct[]]) => {
        if (!!item) {
          // Insert new item
          return [item, ...acc].filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
        }

        // Set inital value from db/localStorage
        return [...initialValue];
      }, []),
      withLatestFrom(this.authService.loggedInUser$, this._recentlyViewedProductsAdd$),
      tap(([newRecentlyViewedProductsValue, loggedInUser, item]) => {
        if (item === null) {
          return;
        }

        if (!loggedInUser) {
          this.cookieService.set('recentlyViewedProducts', JSON.stringify(newRecentlyViewedProductsValue), undefined, '/');
        } else {
          this.apiService.updateRecentlyViewedProducts(newRecentlyViewedProductsValue).pipe(
            first()
          ).subscribe();
        }
      }),
      map(([recentlyViewedProductsValue]) => recentlyViewedProductsValue),
      shareReplay(1)
    );
  }

  addItem(item: IProduct) {
    this._recentlyViewedProductsAddSubject$.next(item);
  }
}
