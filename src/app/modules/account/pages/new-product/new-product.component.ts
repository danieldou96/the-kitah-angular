import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { ProductsService } from 'src/app/core/services/products/products.service';
import { ApiResponse } from 'src/app/shared/models/api-response';
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
    this.productsService.save<ApiResponse>(product).subscribe((apiResponse: ApiResponse) => {
      this.hotToastService.success(`The product has been created!`);
      this.router.navigate(['/dashboard/edit-product/' + apiResponse.data]);
    }); 
  }
}
