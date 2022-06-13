import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { IProduct } from '../../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: IProduct;
  @Input() mode: 'grid-1' | 'grid-2' | 'list' = 'grid-1';

  constructor(public cartService: CartService) { }
}
