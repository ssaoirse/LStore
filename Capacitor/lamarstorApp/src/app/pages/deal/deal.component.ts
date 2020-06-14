/**
 * Deal Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { DealsService } from '../../services/deals.service';
import { CartComponent } from '../cart/cart.component';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { ToastController, LoadingController,Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ProductDetailsComponent } from '../product-details/product-details.component';

import { Location } from "@angular/common";
import { TranslateConfigService } from '../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss'],
})
export class DealComponent implements OnInit {

  deals: Observable<any>;
  userId="";
  backButtonSubscription:any;

  public counter=0;
  constructor(private dealsService: DealsService,
    private modalController: ModalController, public storageService: StorageService, public http: HttpClient, private toastCtrl: ToastController, public loadingCtrl: LoadingController,private translateConfigService: TranslateConfigService,public platform:Platform,private translate:TranslateService,private location: Location) {
      this.translateConfigService.getDefaultLanguage();

      this.storageService.getUserData().then(userData=>{
        if(userData!=null){
          this.userId = userData['id'];
        }
      });

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

  ngOnInit() {
    
    this.deals = this.dealsService.getDeals(this.userId);   

  }

  // Go to product details page
  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product
    });
    modal.onDidDismiss()
      .then((data) => {
        this.deals = this.dealsService.getDeals(this.userId);   
      });
    return await modal.present();
  }



  // Go to cart page function
  async gotoCartPage() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

  ionRefresh(event) {
    console.log('Pull Event Triggered!');
    setTimeout(() => {
      console.log('Async operation has ended');

      //complete()  signify that the refreshing has completed and to close the refresher
      event.target.complete();
    }, 2000);
  }
  ionPull(event) {
    //Emitted while the user is pulling down the content and exposing the refresher.
    console.log('ionPull Event Triggered!');
  }
  ionStart(event) {

    this.storageService.getStorage('userDetails').then((userData)=>{
      this.deals = this.dealsService.getDeals(userData['id']);
     })
  }

}
