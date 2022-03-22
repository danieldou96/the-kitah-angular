import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RouterModule } from '@angular/router';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabComponent } from './components/tab/tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';



@NgModule({
  declarations: [
    PageTitleComponent,
    TabGroupComponent,
    TabComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveComponentModule,
    ReactiveFormsModule
  ],
  exports: [
    PageTitleComponent,
    RouterModule,
    FormsModule,
    ReactiveComponentModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
