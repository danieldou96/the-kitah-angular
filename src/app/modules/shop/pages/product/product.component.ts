import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import { IProduct } from 'src/app/shared/models/product';
import { Gallery, GalleryItem, GalleryRef, ImageItem } from 'ng-gallery';
import { first, map, Observable, tap } from 'rxjs';
import SwiperCore, { FreeMode, Navigation, Thumbs, Keyboard, Lazy, Zoom, Swiper, Pagination } from "swiper";
import { SwiperComponent } from "swiper/angular";
import { RecentlyViewedProductService } from 'src/app/core/services/recently-viewed-product/recently-viewed-product.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
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

  reviewForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    public authService: AuthService,
    public cartService: CartService,
    public wishlistService: WishlistService,
    private hotToastService: HotToastService,
    private recentlyViewedProductsService: RecentlyViewedProductService
  ) {
    this.product$ = this.activatedRoute.data.pipe(
      map(data => data['product']),
      tap(product => this.recentlyViewedProductsService.addItem(product))
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

    this.reviewForm = this.fb.group({
      rate: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required])
    });
  }

  submit() {
    if (this.reviewForm.invalid) {
      Object.values(this.reviewForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    const product = this.activatedRoute.snapshot.data['product'];
    
    this.apiService.submitReview(product.id, this.reviewForm.value).pipe(first()).subscribe(() => {
      this.hotToastService.success('Your review has been successfully submitted.');
      this.router.navigate([this.router.url], { skipLocationChange: true });
    });
  }
}
