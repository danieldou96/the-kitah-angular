import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PageTitleComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    PageTitleComponent,
    RouterModule
  ]
})
export class SharedModule { }
