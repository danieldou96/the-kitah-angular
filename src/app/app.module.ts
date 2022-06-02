import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CamelCaseInterceptor } from './core/interceptors/camel-case/camel-case.interceptor';
import { DateInterceptor } from './core/interceptors/date/date.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt/jwt.interceptor';
import { HttpCacheInterceptorModule } from '@ngneat/cashew';
import { HotToastModule } from '@ngneat/hot-toast';
import { NgxStripeModule } from 'ngx-stripe';
import { environment } from 'src/environments/environment';
import * as Hammer from '@egjs/hammerjs';
import { QueryParamModule } from '@ngqp/core';

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  override overrides = {
    pan: {
      direction: Hammer.DIRECTION_ALL
    },
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,// .withServerTransition({ appId: 'serverApp' }),
    HttpCacheInterceptorModule.forRoot(),
		NgxStripeModule.forRoot(environment.stripePublicKey),
    HotToastModule.forRoot(),
    CoreModule,
    HttpClientModule,
    SharedModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CamelCaseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DateInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
