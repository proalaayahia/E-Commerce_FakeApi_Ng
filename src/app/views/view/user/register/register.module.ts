import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      defaultLanguage: localStorage.getItem("lang") || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (registerTranslateLoaderFactory),
        deps: [HttpClient]
      }
    }),
    SharedModule
  ]
})
export class RegisterModule { }
function registerTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/user/register/', '.json')
}
