import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { map } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product';
import { ProductsService } from '../../services/products/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductTitleResolver implements Resolve<string> {

  constructor(private productService: ProductsService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.productService.findOne<IProduct>(route.params['id']).pipe(
      map(product => product.name)
    );
  }
}