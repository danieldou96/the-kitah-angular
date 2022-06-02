import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RouterModule } from '@angular/router';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabComponent } from './components/tab/tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { NgPipesModule } from 'ngx-pipes';
import { ShortNumberPipe } from './pipes/short-number.pipe';


@NgModule({
  declarations: [
    PageTitleComponent,
    TabGroupComponent,
    ShortNumberPipe,
    TabComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgPipesModule,
    ReactiveComponentModule,
    ReactiveFormsModule,
    NgxFilesizeModule
  ],
  exports: [
    PageTitleComponent,
    RouterModule,
    FormsModule,
    NgPipesModule,
    ShortNumberPipe,
    ReactiveComponentModule,
    ReactiveFormsModule,
    NgxFilesizeModule
  ]
})
export class SharedModule { }
