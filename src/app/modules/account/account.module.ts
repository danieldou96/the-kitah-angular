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
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { SalesReportsComponent } from './pages/sales-reports/sales-reports.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { WithdrawComponent } from './pages/withdraw/withdraw.component';
import { NewProductComponent } from './pages/new-product/new-product.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDirective } from 'src/app/shared/directives/drag-drop-file.directive';
import { ProductResolver } from 'src/app/core/resolvers/product/product.resolver';
import { UploadProductPreviewComponent } from './components/upload-product-preview/upload-product-preview.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MyProductsResolver } from 'src/app/core/resolvers/my-products/my-products.resolver';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { VendorGuard } from 'src/app/core/guards/vendor/vendor.guard';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SettingsComponent } from './pages/settings/settings.component';

PlotlyModule.plotlyjs = PlotlyJS;

const buyerRoutes: Routes = [
  {
		path: 'my-account',
    canActivate: [AuthGuard],
		component: AccountLayoutComponent,
    children: [
      {
        path: '',
        component: MyAccountComponent,
        data: {
          title: 'My account'
        }
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: {
          title: 'Orders'
        }
      },
      {
        path: 'downloads',
        component: DownloadsComponent,
        data: {
          title: 'Downloads'
        }
      },
      {
        path: 'favorite-sellers',
        component: FavoriteSellersComponent,
        data: {
          title: 'My favorite sellers'
        }
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        data: {
          title: 'My wishlist'
        }
      },
      {
        path: 'edit-account',
        component: AccountDetailsComponent,
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
        component: DashboardComponent,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'products',
        component: ProductsComponent,
        data: {
          title: 'Products'
        },
        resolve: { products: MyProductsResolver },
      },
      {
        path: 'new-product',
        component: NewProductComponent,
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
        component: AnalyticsComponent,
        data: {
          title: 'My Products Statistics'
        }
      },
      {
        path: 'sales-reports',
        component: SalesReportsComponent,
        data: {
          title: 'Sales Reports'
        }
      },
      {
        path: 'reviews',
        component: ReviewsComponent,
        data: {
          title: 'Reviews'
        }
      },
      {
        path: 'followers',
        component: FollowersComponent,
        data: {
          title: 'Followers'
        }
      },
      {
        path: 'withdraw',
        component: WithdrawComponent,
        data: {
          title: 'Withdraw'
        }
      },
      {
        path: 'settings',
        component: SettingsComponent,
        data: {
          title: 'Settings'
        }
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
    ReviewsComponent,
    SalesReportsComponent,
    AnalyticsComponent,
    WithdrawComponent,
    NewProductComponent,
    EditProductComponent,
    ProductFormComponent,
    SettingsComponent,
    DragDirective,
    UploadProductPreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    EditorModule,
    RouterModule.forChild([...buyerRoutes, ...vendorRoutes]),
    //PlotlyModule,
    //NgChartsModule
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
