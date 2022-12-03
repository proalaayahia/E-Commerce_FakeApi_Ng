import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      defaultLanguage: localStorage.getItem("lang") || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (forgetPasswordTranslateLoaderFactory),
        deps: [HttpClient]
      }
    }),
    SharedModule
  ]
})
export class ForgetPasswordModule { }
function forgetPasswordTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/user/register/', '.json')
}
