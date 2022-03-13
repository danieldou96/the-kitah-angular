import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    DefaultLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DefaultLayoutComponent
  ]
})
export class CoreModule { }
