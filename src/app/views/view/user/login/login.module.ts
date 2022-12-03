import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    TranslateModule.forChild({
      defaultLanguage: localStorage.getItem("lang") || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (loginTranslateLoaderFactory),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
function loginTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/user/login/', '.json')
}
