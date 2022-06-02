import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { IProduct } from 'src/app/shared/models/product';
import { ProductsService } from '../../services/products/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Observable<IProduct>> {

  constructor(private productService: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.productService.findOne<ApiResponse>(route.params['id']).pipe(
      map((apiResponse: ApiResponse) => apiResponse.data as IProduct)
    );
  }
}