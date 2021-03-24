import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// components
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { RadioComponent } from './components/input-fields/radio/radio.component';
import { TextComponent } from './components/input-fields/text/text.component';
import { PasswordComponent } from './components/input-fields/password/password.component';
import { CheckboxComponent } from './components/input-fields/checkbox/checkbox.component';
import { TextareaComponent } from './components/input-fields/textarea/textarea.component';
import { ShowErrorsComponent } from './components/show-errors/show-errors.component';
import { FileComponent } from './components/input-fields/file/file.component';
import { GroupComponent } from './components/input-fields/group/group.component';
import { TrimDirective } from './directives/trim/trim.directive';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SelectComponent } from './components/input-fields/select/select.component';
import { NumberOnlyDirective } from './directives/number-only/number-only.directive';
import { LowercaseDirective } from './directives/lowercase/lowercase.directive';


@NgModule({
  declarations: [
    DynamicFormComponent,
    RadioComponent,
    TextComponent,
    PasswordComponent,
    CheckboxComponent,
    TextareaComponent,
    ShowErrorsComponent,
    FileComponent,
    GroupComponent,
    TrimDirective,
    PaginationComponent,
    SelectComponent,
    NumberOnlyDirective,
    LowercaseDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    PaginationComponent
  ]
})
export class UtilityModule { }
