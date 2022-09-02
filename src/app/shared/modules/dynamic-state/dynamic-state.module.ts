import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CountryInputComponent } from './components/country-input/country-input.component';
import { StateInputComponent } from './components/state-input/state-input.component';
import { DynamicStateDirective } from './directives/dynamic-state/dynamic-state.directive';

@NgModule({
  declarations: [
    CountryInputComponent,
    StateInputComponent,
    DynamicStateDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    CountryInputComponent,
    StateInputComponent,
    DynamicStateDirective
  ]
})
export class DynamicStateModule { }
