import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordConfirmRoutingModule } from './password-confirm-routing.module';
import { PasswordConfirmComponent } from './password-confirm.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PasswordConfirmComponent
  ],
  imports: [
    CommonModule,
    PasswordConfirmRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      defaultLanguage: localStorage.getItem("lang") || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (confirmPasswordTranslateLoaderFactory),
        deps: [HttpClient]
      }
    }),
    SharedModule
  ]
})
export class PasswordConfirmModule { }
function confirmPasswordTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/user/register/', '.json')
}
