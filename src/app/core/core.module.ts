import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HandheldToolbarComponent } from './components/handheld-toolbar/handheld-toolbar.component';
import { CartWidgetComponent } from './components/cart-widget/cart-widget.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DefaultLayoutComponent,
    NotFoundComponent,
    HandheldToolbarComponent,
    CartWidgetComponent,
    DrawerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule
  ],
  exports: [
    DefaultLayoutComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
