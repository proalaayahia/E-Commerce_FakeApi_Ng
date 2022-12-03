import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { LayoutsModule } from './layouts/layouts.module';
import { ProductService } from './services/product.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { interceptorsProviders } from './core/interceptors';
// import {
//   FacebookLoginProvider,
//   SocialLoginModule,
//   SocialAuthServiceConfig,
//   GoogleLoginProvider,
// } from '@abacritt/angularx-social-login';
// import { environment } from 'src/environments/environment';
import { SumPipe } from './core/pipes/sum.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SumPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutsModule,
    // SocialLoginModule,
    TranslateModule.forRoot({
      defaultLanguage: localStorage.getItem("lang") || 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (translatesLoaderFactory),
        deps: [HttpClient]
      },
      isolate: true
    }),
    HttpClientModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [
    ProductService,
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: FacebookLoginProvider.PROVIDER_ID,
    //         provider: new FacebookLoginProvider(environment.providersKeys.facebook.clientId),
    //       }, {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(environment.providersKeys.google.clientId)
    //       },
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     }
    //   } as SocialAuthServiceConfig
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function translatesLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
