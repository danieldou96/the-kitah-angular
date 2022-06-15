import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { withCache } from '@ngneat/cashew';
import { filter, map, Observable, switchMap } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { PageRequest } from 'src/app/shared/models/pagination/page-request.model';
import { IProduct, IStore } from 'src/app/shared/models/product';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../authentication/auth.service';
import { AbstractCrudService } from '../crud/abstract-crud.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService extends AbstractCrudService<IStore, number, PageRequest> {
  
  public salesAmount$: Observable<number>;

  constructor(
    protected override _http: HttpClient,
    private authService: AuthService
  ) {
    super(_http, `${environment.apiUrl}/store`);
    this.salesAmount$ = this.authService.isVendor$.pipe(
      filter(isVendor => isVendor),
      switchMap(() => this.myStore()),
      map(store => store.salesAmount ?? 0)
    );
  }

  myProducts() {
    return this._http.get<ApiResponse>(`${this._base}/my-products`);
  }

  myStore() {
    const url = `${environment.apiUrl}/users/store`;
    return this._http.get<ApiResponse>(url, {
      context: withCache()
    }).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as IStore)
    );
  }
}