import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCartRoutingModule } from './product-cart-routing.module';
import { ProductCartComponent } from './product-cart.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [
    ProductCartComponent
  ],
  imports: [
    CommonModule,
    ProductCartRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule.forChild({
      defaultLanguage: localStorage.getItem("lang") || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: cartTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
})
export class ProductCartModule { }
function cartTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/cart/', '.json')
}
