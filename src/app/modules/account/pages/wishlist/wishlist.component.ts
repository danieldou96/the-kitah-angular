import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  constructor(
    public wishlistService: WishlistService,
    public cartService: CartService,
  ) { }

  addToCart(product: IProduct) {
    this.cartService.addCartItem({ quantity: 1, product });
    this.wishlistService.removeWishlistItem(product);
  }
}
