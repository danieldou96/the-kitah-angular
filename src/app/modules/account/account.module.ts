import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DownloadsComponent } from './pages/downloads/downloads.component';
import { AccountDetailsComponent } from './pages/account-details/account-details.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountSideMenuComponent } from './components/account-side-menu/account-side-menu.component';
import { AccountLayoutComponent } from './pages/account-layout/account-layout.component';
import { FavoriteSellersComponent } from './pages/favorite-sellers/favorite-sellers.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { FollowersComponent } from './pages/followers/followers.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDirective } from 'src/app/shared/directives/drag-drop-file.directive';
import { ProductResolver } from 'src/app/core/resolvers/product/product.resolver';
import { UploadProductPreviewComponent } from './components/upload-product-preview/upload-product-preview.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MyProductsResolver } from 'src/app/core/resolvers/my-products/my-products.resolver';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { VendorGuard } from 'src/app/core/guards/vendor/vendor.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SettingsComponent } from './pages/settings/settings.component';
import { AccountMigrationComponent } from './pages/account-migration/account-migration.component';
import { BuyerGuard } from 'src/app/core/guards/buyer/buyer.guard';
import { UploadAvatarComponent } from './components/upload-avatar/upload-avatar.component';
import { UserResolver } from 'src/app/core/resolvers/user/user.resolver';
import { MyStoreResolver } from 'src/app/core/resolvers/store/my-store.resolver';
import { StripeDetailsSubmittedGuard } from 'src/app/core/guards/stripe-details-submitted/stripe-details-submitted.guard';
import { ResumeStripeFormComponent } from './pages/resume-stripe-form/resume-stripe-form.component';
import { StripeAccountLinkResolver } from 'src/app/core/resolvers/stripe-account-link/stripe-account-link.resolver';

const buyerRoutes: Routes = [
  {
		path: 'my-account',
    canActivate: [AuthGuard],
		component: AccountLayoutComponent,
    children: [
      {
        path: '',
        component: MyAccountComponent,
        title: 'My account',
        data: {
          title: 'My account'
        }
      },
      {
        path: 'account-migration',
        component: AccountMigrationComponent,
        title: 'Account migration',
        canActivate: [BuyerGuard],
        data: {
          title: 'Account migration'
        }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        title: 'Orders',
        data: {
          title: 'Orders'
        }
      },
      {
        path: 'downloads',
        component: DownloadsComponent,
        title: 'Downloads',
        data: {
          title: 'Downloads'
        }
      },
      {
        path: 'favorite-sellers',
        component: FavoriteSellersComponent,
        title: 'My favorite sellers',
        data: {
          title: 'My favorite sellers'
        }
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        title: 'My wishlist',
        data: {
          title: 'My wishlist'
        }
      },
      {
        path: 'edit-account',
        component: AccountDetailsComponent,
        resolve: {
          user: UserResolver
        },
        title: 'Account details',
        data: {
          title: 'Account details'
        }
      }
    ]
	}
];

const vendorRoutes: Routes = [
  {
		path: 'dashboard',
    canActivate: [AuthGuard, VendorGuard],
		component: AccountLayoutComponent,
    children: [
      {
        path: '',
        canActivate: [StripeDetailsSubmittedGuard],
        component: DashboardComponent,
        title: 'Dashboard',
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'My products',
        data: {
          title: 'Products'
        },
        resolve: { products: MyProductsResolver },
      },
      {
        path: 'new-product',
        component: NewProductComponent,
        title: 'New product',
        data: {
          title: 'New product'
        }
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent,
        data: {
          title: 'Edit product'
        },
        resolve: { product: ProductResolver },
      },
      {
        path: 'analytics',
        canActivate: [StripeDetailsSubmittedGuard],
        component: AnalyticsComponent,
        title: 'My Products Statistics',
        data: {
          title: 'My Products Statistics'
        }
      },
      {
        path: 'followers',
        component: FollowersComponent,
        title: 'Followers',
        data: {
          title: 'Followers'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        resolve: { store: MyStoreResolver },
        title: 'Settings',
        data: {
          title: 'Settings'
        }
      },
      {
        path: 'resume-stripe-form',
        component: ResumeStripeFormComponent,
        data: {
          title: 'Resume Stripe Form'
        },
        resolve: { stripeAccountLink: StripeAccountLinkResolver },
      },
    ]
	}
];

@NgModule({
  declarations: [
    MyAccountComponent,
    AccountLayoutComponent,
    OrdersComponent,
    DownloadsComponent,
    AccountDetailsComponent,
    AccountSideMenuComponent,
    FavoriteSellersComponent,
    WishlistComponent,
    DashboardComponent,
    ProductsComponent,
    FollowersComponent,
    ResumeStripeFormComponent,
    AnalyticsComponent,
    NewProductComponent,
    EditProductComponent,
    ProductFormComponent,
    SettingsComponent,
    DragDirective,
    UploadProductPreviewComponent,
    AccountMigrationComponent,
    UploadAvatarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    EditorModule,
    RouterModule.forChild([...buyerRoutes, ...vendorRoutes]),
    MatTabsModule,
    NgxDatatableModule,
    NgxChartsModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
    DatePipe
  ]
})
export class AccountModule { }
