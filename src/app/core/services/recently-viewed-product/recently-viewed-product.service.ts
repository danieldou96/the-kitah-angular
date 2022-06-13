import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE } from '@ng-web-apis/common';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, first, map, merge, Observable, of, ReplaySubject, scan, shareReplay, startWith, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { IRecentlyViewedProductItem } from 'src/app/shared/models/product';
import { AuthService } from '../../authentication/auth.service';
import { ApiService } from '../../http/api.service';

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class RecentlyViewedProductService {

  recentlyViewedProducts$: Observable<IRecentlyViewedProductItem[]>;

  private _recentlyViewedProductsAddSubject$ = new Subject<IRecentlyViewedProductItem | null>();
  private _recentlyViewedProductsAdd$: Observable<IRecentlyViewedProductItem | null>;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    @Inject(LOCAL_STORAGE) private localStorage: Storage
  ) {
    this._recentlyViewedProductsAdd$ = this._recentlyViewedProductsAddSubject$.pipe(
      startWith(null),
      shareReplay(1)
    );

    this.recentlyViewedProducts$ = combineLatest([
      this._recentlyViewedProductsAdd$,
      this.authService.loggedInUser$.pipe(
        switchMap(loggedInUser => {
          if (loggedInUser) {
            return this.apiService.getRecentlyViewedProducts();
          } else {
            return of(JSON.parse(this.localStorage.getItem('recentlyViewedProducts') ?? '[]') as IRecentlyViewedProductItem[]);
          }
        })
      )
    ]).pipe(
      scan((acc: IRecentlyViewedProductItem[], [item, initialValue]: [(IRecentlyViewedProductItem | null), IRecentlyViewedProductItem[]]) => {
        if (!!item) {
          // Insert new item
          return [item, ...acc].filter((v,i,a)=>a.findIndex(v2=>(v2.product.id===v.product.id))===i);
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
          this.localStorage.setItem('recentlyViewedProducts', JSON.stringify(newRecentlyViewedProductsValue));
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

  addItem(item: IRecentlyViewedProductItem) {
    this._recentlyViewedProductsAddSubject$.next(item);
  }
}
