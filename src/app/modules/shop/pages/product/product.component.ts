import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';
import { IProduct } from 'src/app/shared/models/product';
import { Gallery, GalleryItem, GalleryRef, ImageItem } from 'ng-gallery';
import { Observable } from 'rxjs';
import SwiperCore, { FreeMode, Navigation, Thumbs, Keyboard, Lazy, Zoom, Swiper, Pagination } from "swiper";
import { SwiperComponent } from "swiper/angular";
SwiperCore.use([FreeMode, Navigation, Thumbs, Keyboard, Lazy, Zoom, Pagination]);

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {

	thumbsSwiper!: Swiper;

  product: IProduct;
	galleryItems: string[] = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.product = this.activatedRoute.snapshot.data['product'];

		// Gallery items to be shown on the gallery slider
		this.galleryItems = [
      ...(this.product.mainPicture ? [this.product?.mainPicture?.url] : []),
      ...this.product.gallery.map(i => i.url)
    ];
  }

  ngOnInit(): void {
  }

}
