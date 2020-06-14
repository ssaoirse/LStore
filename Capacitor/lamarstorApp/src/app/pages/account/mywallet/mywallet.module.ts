import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MywalletComponent } from './mywallet.component';
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
        component: MywalletComponent
      }
    ]),
    TranslateModule,
	NgxDatatableModule,
  ],
  declarations: [MywalletComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MywalletModule { }
