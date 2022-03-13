import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
		path: '',
		loadChildren: () =>
			import('./modules/home/home.module').then((m) => m.HomeModule),
	},
  {
		path: '',
		loadChildren: () =>
			import('./modules/shop/shop.module').then((m) => m.ShopModule),
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
