import { Injectable } from '@angular/core';
import { combineLatest, filter, first, map, merge, Observable, scan, shareReplay, startWith, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { IStore } from 'src/app/shared/models/product';
import { AuthService } from '../../authentication/auth.service';
import { ApiService } from '../../http/api.service';

export interface FavoriteSellersItem extends IStore {
  remove?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteSellersService {

  favoriteSellers$: Observable<IStore[]>;
  favoriteSellersActions$: Observable<FavoriteSellersItem | null>;

  private favoriteSellersAdd$ = new Subject<FavoriteSellersItem>();
  private favoriteSellersRemove$ = new Subject<FavoriteSellersItem>();

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.favoriteSellersActions$ = merge(this.favoriteSellersRemove$, this.favoriteSellersAdd$).pipe(
      startWith(null),
      shareReplay(1)
    );
    this.favoriteSellers$ = combineLatest([
      this.favoriteSellersActions$,
      this.authService.loggedInUser$.pipe(
        filter(loggedInUser => Boolean(loggedInUser)),
        switchMap(() => this.apiService.getFavoriteSellers())
      )
    ]).pipe(
      scan((acc: FavoriteSellersItem[], [item, initialValue]: [(FavoriteSellersItem | null), IStore[]]) => {
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
      withLatestFrom(this.favoriteSellersActions$),
      tap(([newFavoriteSellersValue, item]) => {
        if (item === null) {
          return;
        }
        this.apiService.updateFavoriteSellers(newFavoriteSellersValue).pipe(
          first()
        ).subscribe();
      }),
      map(([cartValue]) => cartValue),
      shareReplay(1)
    );
  }

  addFavoriteSellersItem(item: FavoriteSellersItem) {
    this.favoriteSellersAdd$.next(item);
  }
  
  removeFavoriteSellersItem(item: FavoriteSellersItem) {
    this.favoriteSellersRemove$.next({ ...item, remove: true });
  }
}
