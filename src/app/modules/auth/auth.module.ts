import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StripeRefreshComponent } from './pages/stripe-refresh/stripe-refresh.component';
import { StripeAccountLinkResolver } from 'src/app/core/resolvers/stripe-account-link/stripe-account-link.resolver';

const routes: Routes = [
  {
		path: 'login',
		component: LoginComponent,
		title: 'Log in'
	},
  {
		path: 'stripe-refresh',
		component: StripeRefreshComponent,
    title: 'Stripe Refresh',
    resolve: {
      stripeAccountLink: StripeAccountLinkResolver
    }
	},
  {
		path: 'register',
		component: RegisterComponent,
    title: 'Register'
	},
  {
		path: 'forgot-password',
		component: ForgotPasswordComponent,
    title: 'Forgot password'
	}
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    StripeRefreshComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
