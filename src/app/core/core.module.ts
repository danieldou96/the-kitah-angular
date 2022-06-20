import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HandheldToolbarComponent } from './components/handheld-toolbar/handheld-toolbar.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgPipesModule } from 'ngx-pipes';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DefaultLayoutComponent,
    NotFoundComponent,
    HandheldToolbarComponent,
    DrawerComponent,
    MobileSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgPipesModule,
    ReactiveComponentModule,
    LayoutModule
  ],
  exports: [
    DefaultLayoutComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
