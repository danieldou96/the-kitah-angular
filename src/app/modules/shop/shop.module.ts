import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { StoreComponent } from './pages/store/store.component';
import { ProductGalleryComponent } from './components/product-gallery/product-gallery.component';
import { MoreProductsComponent } from './components/more-products/more-products.component';
import { ProductReviewsComponent } from './components/product-reviews/product-reviews.component';
import { ProductReviewsSummaryComponent } from './components/product-reviews-summary/product-reviews-summary.component';
import { ProductReviewFormComponent } from './components/product-review-form/product-review-form.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductFilterRowComponent } from './components/product-filter-row/product-filter-row.component';
import { ProductResolver } from 'src/app/core/resolvers/product/product.resolver';
import { BarRatingModule } from 'ngx-bar-rating';
import { GalleryModule } from  'ng-gallery';
import { StripeTokenResolver } from 'src/app/core/resolvers/stripe-token/stripe-token.resolver';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutSuccessComponent } from './pages/checkout-success/checkout-success.component';
import { OrderResolver } from 'src/app/core/resolvers/order/order.resolver';
import { SwiperModule } from 'swiper/angular';
import { QueryParamModule } from '@ngqp/core';
import { StoreByUrlResolver } from 'src/app/core/resolvers/store/store-by-url.resolver';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { StoreTitleResolver } from 'src/app/core/resolvers/store/store-title.resolver';
import { ProductTitleResolver } from 'src/app/core/resolvers/product/product-title.resolver';
import { BillingResolver } from 'src/app/core/resolvers/billing/billing.resolver';
import { SavedCardsListComponent } from './components/saved-cards-list/saved-cards-list.component';

const routes: Routes = [
  {
		path: 'shop',
		component: ShopComponent,
		title: 'Shop'
	},
  {
		path: 'product/:id',
		component: ProductComponent,
    runGuardsAndResolvers: 'always',
    title: ProductTitleResolver,
    resolve: {
      product: ProductResolver
    },
	},
  {
		path: 'store/:url',
		component: StoreComponent,
    title: StoreTitleResolver,
    resolve: {
      store: StoreByUrlResolver
    },
	},
  {
		path: 'cart',
		component: CartComponent,
		title: 'Cart'
	},
  {
		path: 'checkout',
    canActivate: [AuthGuard],
		component: CheckoutComponent,
    resolve: {
      intentSecret: StripeTokenResolver,
      billing: BillingResolver
    },
		title: 'Checkout'
	},
  {
		path: 'checkout-success',
		component: CheckoutSuccessComponent,
    resolve: {
      order: OrderResolver
    },
		title: 'Checkout success'
	},
];

@NgModule({
  declarations: [
    ShopComponent,
    CartComponent,
    ProductComponent,
    CheckoutComponent,
    StoreComponent,
    ProductGalleryComponent,
    MoreProductsComponent,
    ProductReviewsComponent,
    ProductReviewsSummaryComponent,
    ProductReviewFormComponent,
    PriceFilterComponent,
    ProductFilterComponent,
    ProductFilterRowComponent,
    CheckoutSuccessComponent,
    SavedCardsListComponent
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
