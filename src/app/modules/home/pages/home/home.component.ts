import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';
import { IProduct } from 'src/app/shared/models/product';
import { DocumentService } from 'src/app/core/services/document/document.service';
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { CartService } from 'src/app/core/services/cart/cart.service';
import { RecentlyViewedProductService } from 'src/app/core/services/recently-viewed-product/recently-viewed-product.service';
// install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  featuredProducts$: Observable<IProduct[]>;
  monthlyProducts$: Observable<IProduct[]>;
  recentlyViewedProducts$: Observable<IProduct[]>;
  
  constructor(
    private apiService: ApiService,
    public documentService: DocumentService,
    private recentlyViewedProductsService: RecentlyViewedProductService
  ) {
    this.featuredProducts$ = this.apiService.getHomepageProducts().pipe(
      map(h => h.featuredProducts)
    );
    this.monthlyProducts$ = this.apiService.getHomepageProducts().pipe(
      map(h => h.monthlyProducts)
    );
    this.recentlyViewedProducts$ = this.recentlyViewedProductsService.recentlyViewedProducts$;
  }
}
