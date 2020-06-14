import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FCM } from '@ionic-native/fcm/ngx';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from './services/translate-config.service';

import { PayPal} from '@ionic-native/paypal/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 
export function LanguageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductDetailsHomePageModule } from './pages/product-details-home/product-details-home.module';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutModule } from './pages/checkout/checkout.module';
import { SigninModule } from './pages/auth/signin/signin.module';
import { AuthguardService } from './services/authguard.service';
import { StorageService } from './services/storage.service';
import { SignupModule } from './pages/auth/signup/signup.module';
import { FilterModule } from './pages/filter/filter.module';
import { ForgetPasswordModule } from './pages/auth/forget-password/forget-password.module';
import { AddRatingPageModule } from './pages/add-rating/add-rating.module';
import { AddaddressModule } from './pages/account/myaddresses/add/addaddress.module';
import { EditaddressModule } from './pages/account/myaddresses/edit/editaddress.module';
import { MyprofileModule } from './pages/account/myprofile/myprofile.module';
import { SearchModule } from './pages/search/search.module';


@NgModule({
  declarations: [AppComponent,
    ProductDetailsComponent,
    CartComponent],
  entryComponents: [ProductDetailsComponent,
    CartComponent
    ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (LanguageLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(), 
    AppRoutingModule,
    BrowserAnimationsModule, 
    IonicStorageModule.forRoot(),
    SignupModule,
    SigninModule,
    ForgetPasswordModule,
    MyprofileModule,
    AddaddressModule,
    EditaddressModule,
    AddRatingPageModule,
    CheckoutModule,
    FilterModule,
    ProductDetailsHomePageModule,
    SearchModule],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,
    Facebook,
    GooglePlus,
    TranslateConfigService,
    AuthguardService,
	FCM,
    StorageService,    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
