import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddRatingPageRoutingModule } from './add-rating-routing.module';

import { AddRatingPage } from './add-rating.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddRatingPageRoutingModule
  ],
  declarations: [AddRatingPage]
})
export class AddRatingPageModule {}
