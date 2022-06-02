import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

const routes: Routes = [
	{
		path: '404-not-found',
		component: NotFoundComponent,
	},
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
  {
		path: 'auth',
		loadChildren: () =>
			import('./modules/auth/auth.module').then((m) => m.AuthModule),
	},
  {
		path: '',
		loadChildren: () =>
			import('./modules/account/account.module').then((m) => m.AccountModule),
	},
	{ path: '**', redirectTo: '404-not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking',
		relativeLinkResolution: 'legacy',
		scrollPositionRestoration: 'enabled',
		//enableTracing: true
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
