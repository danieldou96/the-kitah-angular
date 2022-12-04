import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { filter, map, Observable, shareReplay, switchMap } from 'rxjs';
import { IProductAnalyticsActivity, IProductAnalyticsSales } from 'src/app/modules/account/pages/analytics/analytics.component';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { PageRequest } from 'src/app/shared/models/pagination/page-request.model';
import { IProduct, IStore } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { AbstractCrudService } from '../crud/abstract-crud.service';

export interface IFollower {
  avatar?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService extends AbstractCrudService<IStore, number, PageRequest> {
  
  public balance$: Observable<number>;
  public sales$: Observable<IProductAnalyticsSales[]>;
  public analytics$: Observable<IProductAnalyticsActivity[]>;
  public monthSalesAmount$: Observable<number>;
  public salesAmount$: Observable<number>;
  public followers$: Observable<IFollower[]>;
  public myProducts$: Observable<IProduct[]>;
  public store$: Observable<IStore>;

  constructor(
    protected override _http: HttpClient,
    private authService: AuthService
  ) {
    super(_http, `${environment.apiUrl}/store`);
    this.store$ = this.myStore().pipe(
      shareReplay(1)
    );
    this.myProducts$ = this.myProducts().pipe(
      map(apiResponse => apiResponse.data),
      shareReplay(1)
    );
    this.followers$ = this.myFollowers().pipe(
      map(apiResponse => apiResponse.data),
      shareReplay(1)
    );
    this.salesAmount$ = this.authService.isVendor$.pipe(
      filter(isVendor => isVendor),
      switchMap(() => this.store$),
      map(store => store.salesAmount ?? 0)
    );
    this.balance$ = this.authService.isVendor$.pipe(
      filter(isVendor => isVendor),
      switchMap(() => this.store$),
      map(store => store.balance ?? 0)
    );
    this.monthSalesAmount$ = this.authService.isVendor$.pipe(
      filter(isVendor => isVendor),
      switchMap(() => this.store$),
      map(store => store.monthSalesAmount ?? 0)
    );
    this.sales$ = this.sales().pipe(
      shareReplay(1)
    );
    this.analytics$ = this.analytics().pipe(
      shareReplay(1)
    );
  }

  myProducts() {
    return this._http.get<ApiResponse<IProduct[]>>(`${this._base}/my-products`);
  }

  myFollowers() {
    return this._http.get<ApiResponse<IFollower[]>>(`${this._base}/my-followers`);
  }

  myStore() {
    const url = `${environment.apiUrl}/users/store`;
    return this._http.get<ApiResponse<IStore>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
  }

  sales() {
    const url = `${this._base}/sales`;
    return this._http.get<ApiResponse<IProductAnalyticsSales[]>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
  }

  analytics() {
    const url = `${this._base}/analytics`;
    return this._http.get<ApiResponse<IProductAnalyticsActivity[]>>(url, {
      context: withCache()
    }).pipe(map(apiResponse => apiResponse.data));
  }
}