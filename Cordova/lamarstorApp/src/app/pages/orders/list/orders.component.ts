/**
 * Order Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, NavController, AlertController, Platform } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { TranslateConfigService } from '../../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  backButtonSubscription:any;

  public counter=0;
  // Slider Options
  slideOpts = {
    initialSlide: 0,
    autoplay: true,
  };

  // Order Options
  options: any = [{
    title: 'order.delivered',
    isSelected: false,
    value: 'deliver_orders'
  }, {
    title: 'order.processing',
    isSelected: true,
    value: 'progress_orders'
  }, {
    title: 'order.cancelled',
    isSelected: false,
    value: 'cancel_orders'
  }];

  // Orders Sample Data
  orders: any;
  uid: any;

  constructor(public storageService: StorageService, public http: HttpClient, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public router: Router, public alertController: AlertController, private translateConfigService: TranslateConfigService, private translate: TranslateService,private platform:Platform,private location: Location) {

    this.translateConfigService.getDefaultLanguage();



  }
  ionViewWillEnter() {
    this.storageService.getUserData().then(result => {
      this.uid = result.id;
      this.getsetgo();

    });
  }


  ngOnInit() { }

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

  async get_details(oid) {
    this.storageService.setOrderId(oid);
    this.navCtrl.navigateForward('/orderdetails');
  }


  async track_id(oid) {
    this.storageService.setOrderId(oid);
    this.navCtrl.navigateForward('/trackingdetails');
  }




  // Change Order Option Function
  changeOption(option, index) {
    for (let i = 0; i < this.options.length; i++) {
      this.options[i].isSelected = false;
    }

    this.options[index].isSelected = true;
    this.getsetgo(this.options[index].value);


  }


  async cancel_order(id) {
    const alert = await this.alertController.create({
      header: this.translate.instant("account.addr_del_msg_4"),
      message: this.translate.instant("account.addr_del_msg_5"),
      buttons: [
        {
          text: this.translate.instant("account.back"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: this.translate.instant("account.confirm_cancel"),
          handler: () => {
            //console.log('Confirm Okay'+id);
            this.cancelOrder(id, this.uid);
          }
        }
      ]
    });

    await alert.present();
  }


  async cancelOrder(oid, uid) {


    this.loadingCtrl.create({
      message: this.translate.instant("account.loading"),
    }).then((res) => {
      res.present();


      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      };

      let postData = 'uid=' + uid + '&oid=' + oid;

      this.http.post<any>(this.storageService.baseUrl + "api/cancel_order", postData, { headers })
        .subscribe(data => {

          if (data.success == 1) {
            res.dismiss();
            res.onDidDismiss().then((dis) => {

              this.navCtrl.navigateBack('/orders');
            });
          }
          else {
            if (data.msg == 'try_again') {
              res.dismiss();
              res.onDidDismiss().then((dis) => {
                this.storageService.presentToast(this.translate.instant("account.error_occur"), 3000);
              });

            }
            else if (data.msg == 'invalid_id') {
              res.dismiss();
              res.onDidDismiss().then((dis) => {
                this.storageService.presentToast(this.translate.instant("account.unauthorised"), 3000);
              });
            }


          }



        }, error => {
          res.dismiss();
          res.onDidDismiss().then((dis) => {
            console.log(error);
          });
        });

    });


  }

  async getsetgo(type = 'progress_orders') {

    this.loadingCtrl.create({
      message: this.translate.instant("account.loading"),
    }).then((res) => {
      res.present();

      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      };

      let postData = `uid=${this.uid}&type=${type}`;

      this.http.post<any>(this.storageService.baseUrl + "api/my_orders", postData, { headers })
        .subscribe(data => {

          if (data.success == 1) {
            //this.walletdata=data.data;
            res.dismiss();
            res.onDidDismiss().then((dis) => {
              console.log(data);
              this.orders = data.data.records;


            });



          }
          else {
            if (data.msg == 'nodata') {
              res.dismiss();
              res.onDidDismiss().then((dis) => {
                this.storageService.presentToast(this.translate.instant("account.no_data"), 3000);
              });

            }
            else {
              res.dismiss();
              res.onDidDismiss().then((dis) => {
                this.storageService.presentToast(this.translate.instant("account.unauthorised"), 3000);
              });
            }


          }



        }, error => {
          res.dismiss();
          console.log(error);
        });

    });

  }


}
