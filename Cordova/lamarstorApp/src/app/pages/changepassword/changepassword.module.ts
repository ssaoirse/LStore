import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChangepasswordComponent } from './changepassword.component';

@NgModule({
  imports: [
    CommonModule,
	ReactiveFormsModule,
    //FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChangepasswordComponent
      }
    ])
  ],
  declarations: [ChangepasswordComponent]
})
export class ChangepasswordModule { }
