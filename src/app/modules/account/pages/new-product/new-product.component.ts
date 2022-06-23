import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent {

  constructor(
    private productsService: ProductsService,
    private hotToastService: HotToastService,
    private router: Router,
  ) { }

  createProduct(product: IProduct) {
    this.productsService.save(product).subscribe(() => {
      this.hotToastService.success(`The product has been created!`);
      this.router.navigate(['/dashboard/products']);
    }); 
  }
}
