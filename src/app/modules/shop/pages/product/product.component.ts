import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import { IProduct } from 'src/app/shared/models/product';
import { Gallery, GalleryItem, GalleryRef, ImageItem } from 'ng-gallery';
import { map, Observable, tap } from 'rxjs';
import SwiperCore, { FreeMode, Navigation, Thumbs, Keyboard, Lazy, Zoom, Swiper, Pagination } from "swiper";
import { SwiperComponent } from "swiper/angular";
import { RecentlyViewedProductService } from 'src/app/core/services/recently-viewed-product/recently-viewed-product.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
SwiperCore.use([FreeMode, Navigation, Thumbs, Keyboard, Lazy, Zoom, Pagination]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
	//encapsulation: ViewEncapsulation.None
})
export class ProductComponent {

	thumbsSwiper!: Swiper;

  product$: Observable<IProduct>;
	galleryItems$: Observable<string[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    public cartService: CartService,
    private recentlyViewedProductsService: RecentlyViewedProductService
  ) {
    this.product$ = this.activatedRoute.data.pipe(
      map(data => data['product']),
      tap(t=>console.log(t)),
      tap(product => this.recentlyViewedProductsService.addItem({ product }))
    );

		// Gallery items to be shown on the gallery slider
		this.galleryItems$ = this.product$.pipe(
      map(product => {
        return [
          ...(product.mainPicture ? [product?.mainPicture?.url] : []),
          ...product.gallery.map(i => i.url)
        ]
      })
    );
  }
}
