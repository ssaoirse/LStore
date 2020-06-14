/**
 * Wishlist Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { StorageService } from '../../services/storage.service';
import { ModalController, ToastController,LoadingController, Platform } from '@ionic/angular';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { CartComponent } from '../cart/cart.component';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateConfigService } from '../../services/translate-config.service';
import { AppComponent } from '../../app.component';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

import { Location } from "@angular/common";
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit {


  products: any;
  userID="";
  chkWishList=false;
  backButtonSubscription:any;

  public counter=0;
  constructor(private productsService: ProductsService, public modalController: ModalController, public storageService: StorageService, private toastCtrl: ToastController, private router: Router, private translateConfigService: TranslateConfigService, private appComponent: AppComponent,public loadingCtrl:LoadingController,public http: HttpClient, public translate: TranslateService,private platform:Platform,private location: Location) {

    this.translateConfigService.getDefaultLanguage();


  }


  
  ionViewWillEnter() {
    this.storageService.getStorage('userDetails').then((userData) => {
      if (userData != null) {
        this.getProductList(userData['id']);
        this.userID = userData['id'];
      } 
    });


  }
  ngOnInit() {

    // this.getProductList();

  }


  
  
  ngAfterViewInit() {
    this.backButtonSubscription =  this.platform.backButton.subscribe(()=>{
      this.location.back();
    })
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  

 async presentToast() {
   

  let toast = await this.toastCtrl.create({
    message: this.translate.instant("menu.exit_app"),
    duration: 3000,
    position: 'bottom',
  
   
  });
  return await toast.present();
}


  // Get Products
  getProductList(userId) {
   // this.products = this.productsService.getAllWishList();
   this.loadingCtrl.create({
    message: this.translate.instant("account.loading"),
  }).then((res) => {
    res.present();
    let body = `user_id=${userId}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_wishlist', body, { headers }).subscribe((result) => {
     
      if (result.status == true) {
        this.products = result.wishlist_details.records;
        this.chkWishList=false;
       // console.log(result);
      }else{
        this.chkWishList=true;
      }
      res.dismiss();
    })
  });

  }

  // Go to product details page
  async goToProductDetails(product) {
    //console.log("Product==>",product);
    let pro = {
      id:product.pro_id,
      name:product.pro_name,
      description:product.description,
      original_price:product.original_price,     
      discount_price:product.discount_price,
      default_image:product.default_image,
      product_size:product.product_size,
      product_color:product.product_color,
      product_reviews:product.product_reviews,
      currency_symble:product.currency_symble
    };
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: pro
    });
    return await modal.present();
  }

  // Go to cart page
  async gotoCartPage() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }
  removeFromWishList(item){
    this.loadingCtrl.create({
      message: this.translate.instant("account.loading"),
    }).then((res) => {
      res.present();
      let body = `user_id=${this.userID}&product_id=${item.pro_id}`;
      let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      return this.http.post<any>(this.storageService.baseUrl + 'api/remove_wishlist', body, { headers }).subscribe((result) => {
     
        if(result.wishlist_details==""){
          this.chkWishList=true;
        }else{
          this.chkWishList=false;
        }
        this.products = result.wishlist_details.records;
        res.dismiss();
      })
    });
  }
}
