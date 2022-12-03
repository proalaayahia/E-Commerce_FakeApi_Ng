import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    NgxPaginationModule,
    TranslateModule.forChild({
      defaultLanguage: localStorage.getItem("lang") || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (productTranslateLoaderFactory),
        deps: [HttpClient]
      }
    })
  ]
})
export class ProductsModule { }
function productTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/product/', '.json')
}
