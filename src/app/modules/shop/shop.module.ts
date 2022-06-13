import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { StoreComponent } from './pages/store/store.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { RelatedProductsComponent } from './components/related-products/related-products.component';
import { MoreProductsComponent } from './components/more-products/more-products.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { ProductReviewsSummaryComponent } from './components/product-reviews-summary/product-reviews-summary.component';
import { ProductReviewFormComponent } from './components/product-review-form/product-review-form.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { SliderComponent } from './components/slider/slider.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductFilterRowComponent } from './components/product-filter-row/product-filter-row.component';
import { ProductResolverService } from 'src/app/core/resolvers/product-resolver/product-resolver.service';
import { BarRatingModule } from 'ngx-bar-rating';
import { GalleryModule } from  'ng-gallery';
import { StripeTokenResolverService } from 'src/app/core/resolvers/stripe-token-resolver/stripe-token-resolver.service';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { OrderResolverService } from 'src/app/core/resolvers/order-resolver/order-resolver.service';
import { SwiperModule } from 'swiper/angular';
import { QueryParamModule } from '@ngqp/core';
import { StoreResolver } from 'src/app/core/resolvers/store-resolver/store.resolver';

const routes: Routes = [
  {
		path: 'shop',
		component: ShopComponent
	},
  {
		path: 'product/:id',
		component: ProductComponent,
    resolve: { product: ProductResolverService },
	},
  {
		path: 'store/:url',
		component: StoreComponent,
    resolve: { store: StoreResolver },
	},
  {
		path: 'cart',
		component: CartComponent
	},
  {
		path: 'checkout',
		component: CheckoutComponent,
    resolve: {
      intentSecret: StripeTokenResolverService
    }
	},
  {
		path: 'checkout-success/:id',
		component: CheckoutSuccessComponent,
    resolve: {
      order: OrderResolverService
    }
	},
];

@NgModule({
  declarations: [
    ShopComponent,
    CartComponent,
    ProductComponent,
    CheckoutComponent,
    StoreComponent,
    CheckboxComponent,
    ProductGalleryComponent,
    RelatedProductsComponent,
    MoreProductsComponent,
    ProductReviewsComponent,
    ProductReviewsSummaryComponent,
    ProductReviewFormComponent,
    PriceFilterComponent,
    SliderComponent,
    ProductFilterComponent,
    ProductFilterRowComponent,
    CheckoutSuccessComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BarRatingModule,
    GalleryModule,
    SwiperModule,
    QueryParamModule,
    MatTabsModule,
    NgxStripeModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopModule { }
