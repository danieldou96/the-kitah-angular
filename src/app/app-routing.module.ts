import { NgModule, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes, TitleStrategy } from '@angular/router';
import { NotFoundComponent } from './core/components/not-found/not-found.component';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title !== undefined) {
      this.title.setTitle(`${title} - The Kitah`);
    } else {
      this.title.setTitle(`The Kitah`);
		}
  }
}

const routes: Routes = [
	{
		path: '404-not-found',
		component: NotFoundComponent,
		title: 'Not found'
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
		scrollPositionRestoration: 'enabled'
	})],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy
    }
  ]
})
export class AppRoutingModule { }
