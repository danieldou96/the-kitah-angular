import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductComponent } from './pages/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
		path: 'shop',
		component: ShopComponent
	},
  {
		path: 'product',
		component: ProductComponent
	},
  {
		path: 'cart',
		component: CartComponent
	},
];

@NgModule({
  declarations: [
    ShopComponent,
    CartComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ShopModule { }
