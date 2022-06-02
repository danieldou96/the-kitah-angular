import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { IProduct } from 'src/app/shared/models/product';
import { DocumentService } from 'src/app/core/services/document/document.service';
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { CartService } from 'src/app/core/services/cart/cart.service';

// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  featuredProducts$: Observable<IProduct[]>;
  monthlyProducts$: Observable<IProduct[]>;
  recentlyViewedProducts$: Observable<IProduct[]>;
  
  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    public documentService: DocumentService
  ) {
    this.featuredProducts$ = this.apiService.getHomepageProducts().pipe(
      map(h => h.featuredProducts)
    );
    this.monthlyProducts$ = this.apiService.getHomepageProducts().pipe(
      map(h => h.monthlyProducts)
    );
    this.recentlyViewedProducts$ = this.apiService.getHomepageProducts().pipe(
      map(h => h.recentlyViewedProducts)
    );
  }

  ngOnInit(): void {
  }

  addCartItem(item: IProduct) {
    this.cartService.addCartItem({
      quantity: 1,
      product: item
    });
  }
}
