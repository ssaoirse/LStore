/**
 * Search Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { ModalController,LoadingController } from '@ionic/angular';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartComponent } from '../cart/cart.component';
import { StorageService } from '../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { TranslateConfigService } from '../../services/translate-config.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  // List of Products
  products: Product[];
  public searchTerm: string = "";
  // Check is product available or not
  isProductAvailable: boolean = false;
   userId = "";
  constructor(public modalController: ModalController,
    private productsService: ProductsService, public storageService: StorageService, private translateConfigService: TranslateConfigService,public http:HttpClient,public loadingCtrl:LoadingController) {
    this.translateConfigService.getDefaultLanguage();

    this.storageService.getStorage('userDetails').then((userData) => {
     
      if (userData != null) {
        this.userId = userData['id'];
      }

     this.getProductList();
      
    });

  }

  
  ngOnInit() {
    //this.setFilteredItems();
  }

  // Get All Products
  getProductList() {
    this.loadingCtrl.create({
      message: 'Loading...',
    }).then((res) => {
      res.present();
    let body = `category_id=&product=All&user_id=${this.userId}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_feature', body, { headers }).subscribe(product=>{     
      this.products = product.feature_detail.records;
      res.dismiss();
    });
  });

  }

  setFilteredItems() {
    let body = `category_id=&product=All&user_id=${this.userId}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_feature', body, { headers }).subscribe(product=>{
     
      this.products = product.feature_detail.records;
      this.products = this.filterItems(this.searchTerm);
    });
    
    
  }
  filterItems(searchTerm) {
    
    return this.products.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  // // Get Search Result
  // getProducts(ev: any) {

  //   //this.getProductList();

  //   // set val to the value of the searchbar
  //   const val = ev.target.value;

  //   // if the value is an empty string don't filter the product
  //   if (val && val.trim() != '') {
  //     this.isProductAvailable = true;

  //     this.products = this.products.filter((item) => {

  //      // return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //      return (item.name.toLowerCase()==val.toLowerCase() );
  //     })
  //   }else{
  //     this.getProductList();
  //   }
  // }

  // Go to product details page function
  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product
    });
    modal.onDidDismiss()
      .then((data) => {
        this.setFilteredItems();

      });
    return await modal.present();
  }

  // Go to cart page function
  async gotoCartPage() {
    this.dismiss();
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

  // Back to previous page function
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
}
