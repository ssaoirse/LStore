/**
 * Checkout Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

import { TranslateConfigService } from '../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { AddaddressComponent } from '../account/myaddresses/add/addaddress.component';
import { MyprofileComponent } from '../account/myprofile/myprofile.component';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  steps: any = [];
  cards: any = [];
  countryList: any;
  userId: any;
  uid: any;
  rows: any;
  paymentMethod: any;
  bankDetails: any;

  paymentAmount: string = '3.33';
  currency: string = 'USD';
  currencyIcon: string = '$';
  cartItem: any;
  shippingId: any;
  curremt_wallet_balance: any;
  orderNumber: any;
  chkAddress = false;
  chkPersonalAddress = false;
  total=0;
  discountAmount:any;
  is_pickup_from_store=0;
  personalDetails:any;
  constructor(public modalController: ModalController, private router: Router, public orderService: OrderService, public storageService: StorageService, public http: HttpClient, public payPal: PayPal, private translateConfigService: TranslateConfigService, public loadingCtrl: LoadingController, private translate: TranslateService,public storage: Storage) {
    this.translateConfigService.getDefaultLanguage();
    // this.storageService.getUserData().then(result=>{
    //   this.userId = result.id;
    // });
    this.orderService.allCountries().subscribe(countries => {
      this.countryList = countries;
      //console.log(this.countryList);
    });

    // this.orderService.addressById(this.userId).subscribe(address=>{
    //   //this.countryList = countries;
    //   console.log(address);
    // });
    this.getAddress();
    this.getPaymentMethod();
    this.getCartData();
    this.getPersonalAddress();
    
    this.storageService.getGrandTotal().then(result=>{
      this.total = result;
    })
  }


  getPersonalAddress() {
    this.storageService.getUserData().then(result => {
      this.uid = result.id;
      this.curremt_wallet_balance = result.curremt_wallet_balance;
      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      };
      let postData = `uid=${this.uid}`;
      this.http.post<any>(this.storageService.baseUrl + "api/get_profile", postData, { headers })
        .subscribe(data => {
          if(data.details.address==""){
            this.chkPersonalAddress = true;
          }else{
            this.chkPersonalAddress = false;
          }
          
          this.personalDetails = data.details;
        }, error => {
          console.log(error);
        });

    });
  }
  getAddress() {
    this.storageService.getUserData().then(result => {
      this.uid = result.id;
      this.curremt_wallet_balance = result.curremt_wallet_balance;
      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      };
      let postData = `uid=${this.uid}`;
      this.http.post<any>(this.storageService.baseUrl + "api/list_shipping_address", postData, { headers })
        .subscribe(data => {
          if (data.success == 1) {
            //this.walletdata=data.data;
            this.chkAddress = false;
            this.rows = data.addresses_detail.records;
          }
          else {
            this.chkAddress = true;
            if (data.msg == 'nodata') {
              // this.storageService.presentToast(this.translate.instant("account.no_data"), 3000);
            }
            else {
              // this.storageService.presentToast(this.translate.instant("account.unauthorised"), 3000);
            }
          }
        }, error => {
          console.log(error);
        });

    });
  }


  getPaymentMethod() {


    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };
    let postData = ``;
    this.http.post<any>(this.storageService.baseUrl + "api/all_payment_method", postData, { headers })
      .subscribe(data => {
        if (data.status == true) {
          //this.walletdata=data.data;
          this.paymentMethod = data.paymet_method_list;
         // console.log(data.paymet_method_list);
          if (this.paymentMethod.admin_bank_account) {
            this.bankDetails = this.paymentMethod.admin_bank_account.bank_details;
          }

        }
        else {
          this.storageService.presentToast(this.translate.instant("account.no_data"), 3000);
        }
      }, error => {
        console.log(error);
      });
  }


  ngOnInit() {
    // Checkout steps
    this.steps = [
      {
        step: this.translate.instant("checkout.billing"),
        isSelected: true
      },
      {
        step: this.translate.instant("checkout.payment"),
        isSelected: false
      },
      {
        step: this.translate.instant("checkout.confirm"),
        isSelected: false
      }
    ]

    // Payment cards images
    this.cards = ["assets/images/cards/visa.png",
      "assets/images/cards/mastercard.png",
      "assets/images/cards/paypal.png"]
  }

  // Go to xext section function
  next() {
    // If current section is billing then next payment section will be visible
    if (this.steps[0].isSelected) {
      this.steps[0].isSelected = false;
      this.steps[1].isSelected = true;
    }
    // If current section is Billing then next section confirm will be visible 
    else if (this.steps[1].isSelected) {
      this.steps[0].isSelected = false;
      this.steps[1].isSelected = false;
      this.steps[2].isSelected = true;
    }
  }

  // Go to order page function
  gotoOrderPage() {
    this.dismiss();
    this.router.navigate(['/tabs/orders']);
  }

  // Go to product page
  gotoProductsPage() {
    this.dismiss();
    this.router.navigate(['/tabs/products']);
  }

  // Back to previous screen
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }

  selectAddress(address_id) {
    this.shippingId = address_id;
    if (this.steps[0].isSelected) {
      this.steps[0].isSelected = false;
      this.steps[1].isSelected = true;
    }
  }


  selectPersonalAddress(address_id) {
   
    if (this.steps[0].isSelected) {
      this.steps[0].isSelected = false;
      this.steps[1].isSelected = true;
    }
  }



  payWithPaypal() {
    console.log("Pay ????");
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AaHKoceiF-cEBcIk5EpHiPjmcyrCJ1grugnS-W3Q1Muaw4PIDu2SwvBLpZ3A8yrtA-eX55q2Wbu8dXP_'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment(this.paymentAmount, this.currency, 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((res) => {
          console.log(res);
          this.payment(1);
          // Successfully paid

          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }




  getCartData() {
    this.storageService.getStorage('my-cart').then((products) => {
      this.cartItem = products;
    });
  }
  cod() {
    this.payment(5);
  }
  bankTransfer() {
    this.payment(4);
  }
  wallet() {
    this.payment(3);
  }
  payment(payment_method: number) {
    this.loadingCtrl.create({
      message: this.translate.instant("account.loading"),
    }).then((res) => {
      res.present();
      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      };
      let cart_item = JSON.stringify(this.cartItem);
      let postData = `user_id=${this.uid}&cart_item=${cart_item}&payment_method=${payment_method}&shipping_id=${this.shippingId}&curremt_wallet_balance=${this.curremt_wallet_balance}&discountAmount=${this.discountAmount}&is_pickup_from_store=${this.is_pickup_from_store}`;
      this.http.post<any>(this.storageService.baseUrl + "api/pay", postData, { headers })
        .subscribe(data => {

          //  console.log(data);
          if (data.status == true) {
            this.orderNumber = data.cart_id;
            res.dismiss();
            res.onDidDismiss().then((dis) => {

              this.storageService.removeCartItem();
              this.storage.remove('discount');
              this.storage.remove('discountCode');

              this.steps[0].isSelected = false;
              this.steps[1].isSelected = false;
              this.steps[2].isSelected = true;
            });

          }
          else {
            res.dismiss();
            this.storageService.presentToast(data.msg, 3000);
          }
        }, error => {
          res.dismiss();
          console.log(error);
        });

    });

  }
  async addNewAddress() {
    const modal = await this.modalController.create({
      component: AddaddressComponent
    });
    modal.onDidDismiss()
      .then((data) => {

        this.getAddress();

      });
    await modal.present();
  }
 
  async selectType(event){
    this.is_pickup_from_store = event.detail.value;
  }

  async addPersonalAddress() {
    const modal = await this.modalController.create({
      component: MyprofileComponent
    });
    modal.onDidDismiss()
      .then((data) => {

        this.getPersonalAddress();

      });
    await modal.present();
  }

}
