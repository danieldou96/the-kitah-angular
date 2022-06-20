import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { NgPipesModule } from 'ngx-pipes';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { SwiperModule } from 'swiper/angular';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { ErrorTailorModule } from '@ngneat/error-tailor';

@NgModule({
  declarations: [
    PageTitleComponent,
    ShortNumberPipe,
    PhonePipe,
    CheckboxComponent,
    ProductCardComponent,
    ProductsGridComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgPipesModule,
    ErrorTailorModule,
    ReactiveComponentModule,
    ReactiveFormsModule,
    NgxFilesizeModule,
    SwiperModule
  ],
  exports: [
    PageTitleComponent,
    RouterModule,
    FormsModule,
    NgPipesModule,
    CheckboxComponent,
    ShortNumberPipe,
    ErrorTailorModule,
    ReactiveComponentModule,
    ReactiveFormsModule,
    ProductCardComponent,
    ProductsGridComponent,
    NgxFilesizeModule,
    PhonePipe
  ]
})
export class SharedModule { }
