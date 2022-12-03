import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterConfirmRoutingModule } from './register-confirm-routing.module';
import { RegisterConfirmComponent } from './register-confirm.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    RegisterConfirmComponent
  ],
  imports: [
    CommonModule,
    RegisterConfirmRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: localStorage.getItem("lang") || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (confirmRegisterTranslateLoaderFactory),
        deps: [HttpClient]
      }
    }),
    SharedModule
  ]
})
export class RegisterConfirmModule { }
function confirmRegisterTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/user/register/', '.json')
}
