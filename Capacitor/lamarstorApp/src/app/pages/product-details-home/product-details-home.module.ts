import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsHomePageRoutingModule } from './product-details-home-routing.module';

import { ProductDetailsHomePage } from './product-details-home.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsHomePageRoutingModule,
    TranslateModule
  ],
  declarations: [ProductDetailsHomePage]
})
export class ProductDetailsHomePageModule {}
