
/**
 * Cart Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */


import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Product } from '../../models/product.model';
import { CheckoutComponent } from '../checkout/checkout.component';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { SigninComponent } from '../auth/signin/signin.component';
import { TranslateConfigService } from '../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  cartProducts: Product[] = [];
  total: number = 0;
  currencySymble: any;
  discount_code = "";
  discountAmount = 0;
  grantTotal = 0;
  constructor(public modalController: ModalController, public storageService: StorageService, public alertController: AlertController, private storage: Storage, private router: Router, private translateConfigService: TranslateConfigService, private translate: TranslateService,
    public loadingCtrl: LoadingController, public http: HttpClient) {
    this.currencySymble = this.storageService.currencySymbol;
    this.translateConfigService.getDefaultLanguage();
   
  }

  ionViewWillEnter(){
    this.storage.get('discount').then(res=>{
      if(res!=null){
        this.discountAmount = res;
      }else{
        this.discountAmount = 0;
      }
     
      this.grantTotal =   this.total - this.discountAmount;
    })
    this.storage.get('discountCode').then(res=>{
      this.discount_code = res;
    })
  }
  ngOnInit() {
    this.getCartItems();
  }

  // Get Cart Items From Storage
  getCartItems() {
    this.storageService.getStorage('my-cart').then((products) => {
      this.cartProducts = products;

      // this.currencySymble = this.cartProducts[0].currency_symble;
      // console.log(this.currencySymble);
      if (this.cartProducts != null) {
        for (var i = 0; i < this.cartProducts.length; i++) {
          this.total += this.cartProducts[i].discount_price * this.cartProducts[i].quantity;
        }
      }else{
        this.storage.remove('discount');
        this.storage.remove('discountCode');
      }
      this.grantTotal =   this.total - this.discountAmount;

    });
  }

  // Minus Product Quantity
  minusQuantity(product, index) {
    this.total=0;
    if (product.quantity > 1) {
      product.quantity = Number(product.quantity) - 1;
      this.storageService.getStorage('my-cart').then((products) => {
        for (var i = 0; i < products.length; i++) {
          if (products[i].id == product.id) {
            products[i].quantity = product.quantity;
          }
          this.total += products[i].discount_price * products[i].quantity;
        }
        this.grantTotal =   this.total - this.discountAmount;
        this.storage.set('my-cart', products);
      });
     
      
    }
  }

  // Add More Quantity
  addQuantity(product, index) {
    this.total=0;
    if (product.quantity) {
      product.quantity = Number(product.quantity) + 1;
    } else {
      product.quantity = 1;
      product.quantity = Number(product.quantity) + 1;
    }

    this.storageService.getStorage('my-cart').then((products) => {
      for (var i = 0; i < products.length; i++) {
        if (products[i].id == product.id) {
          products[i].quantity = product.quantity;
        }
        this.total += products[i].discount_price * products[i].quantity;
      }
      this.storage.set('my-cart', products);
      this.grantTotal =   this.total - this.discountAmount;
    });

    
    

  }

  // Remove Product From Cart
  async removeProduct(product, index) {
    const alert = await this.alertController.create({
      header: this.translate.instant("cart.confirm"),
      message: this.translate.instant("cart.sure_delete"),
      buttons: [
        {
          text: this.translate.instant("account.cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant("cart.okay"),
          handler: () => {
            this.total=0;
            this.cartProducts.splice(index, 1);
            this.storageService.removeStorageValue(product.id, 'my-cart').then((carItem) => {
              //console.log("test==>>>", carItem['length']);
              console.log(this.cartProducts);
              if(carItem['length']==0){
                this.storage.remove('discount');
                this.storage.remove('discountCode');
                this.total=0;
                this.grantTotal=0;
                this.discountAmount=0;
                this.discount_code="";
              }else{
                this.total = 0;
                for (var i = 0; i < carItem['length']; i++) {
                  this.total += carItem[i].discount_price * carItem[i].quantity;
                }
                // this.getCartItems();                
                this.grantTotal =   this.total - this.discountAmount;
              }
              
            });



          }
        }
      ]
    });

    await alert.present();

  }

  // Go to checkout page
  async goToCheckout() {
    this.dismiss();
    this.storageService.getUserData().then(userData => {
      if (userData != null) {
        this.chkModalLooad();
      } else {
        // this.router.navigate(['/signin']);
        this.openSignin();
      }
    });
  }

  async openSignin() {
    const modal = await this.modalController.create({
      component: SigninComponent
    });
    return await modal.present();
  }
  async chkModalLooad() {
    const modal = await this.modalController.create({
      component: CheckoutComponent
    });
    return await modal.present();
  }

  // Back to previous page options
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }


  chkDiscountCode() {

    this.loadingCtrl.create({
      message: this.translate.instant("account.loading"),
    }).then((res) => {
      res.present();
      let body = `discount_code=${this.discount_code}&grand_price=${this.total}`;
      let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      this.http.post<any>(this.storageService.baseUrl + 'api/check_discount', body, { headers }).subscribe(result => {
        //console.log(result);
        if (result.status == false) {
          this.storageService.presentToast(this.translate.instant("checkout.invalid_coupon"), 2000);
          this.storage.remove('discount');
          this.storage.remove('discountCode');
          this.discount_code = "";
          this.discountAmount=0;
          this.grantTotal =   this.total - this.discountAmount;
         
        } else {
          this.discountAmount = result.return_data.amount;
          this.storage.set('discount', this.discountAmount);
          this.storage.set('discountCode', this.discount_code);
          this.grantTotal =   this.total - this.discountAmount;
          this.storageService.presentToast(this.translate.instant("checkout.discount_coupon"), 2000);

        }
        res.dismiss();
      })
    });



  }
}
