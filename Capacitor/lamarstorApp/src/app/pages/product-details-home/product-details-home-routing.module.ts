import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsHomePage } from './product-details-home.page';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailsHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailsHomePageRoutingModule {}
