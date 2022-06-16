import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { IProduct } from 'src/app/shared/models/product';
import { StoreService } from '../../services/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class MyProductsResolver implements Resolve<Observable<IProduct[]>> {

  constructor(private storeService: StoreService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.storeService.myProducts().pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as IProduct[])
    );
  }
}