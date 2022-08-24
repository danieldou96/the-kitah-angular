import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HandheldToolbarComponent } from './components/handheld-toolbar/handheld-toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LetModule } from '@ngrx/component';
import { NgPipesModule } from 'ngx-pipes';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DefaultLayoutComponent,
    NotFoundComponent,
    HandheldToolbarComponent,
    MobileSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgPipesModule,
    LetModule,
    LayoutModule
  ],
  exports: [
    DefaultLayoutComponent,
    NotFoundComponent
  ]
})
export class CoreModule { }
