import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  
  product: IProduct;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private hotToastService: HotToastService
  ) {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  updateProduct(product: IProduct) {
    this.productsService.update<IProduct>(this.product.id!, product).subscribe(updatedProduct => {
      this.hotToastService.success(`The product has been updated!`);
    }); 
  }
}
