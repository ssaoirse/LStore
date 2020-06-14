import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TrackingdetailsComponent } from './trackingdetails.component';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
	ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TrackingdetailsComponent
      }
    ]),
    TranslateModule
  ],
  declarations: [TrackingdetailsComponent]
})
export class TrackingdetailsModule { }
