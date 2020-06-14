/**
 * Home Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */


import { Component, OnInit } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { ModalController, Platform, AlertController, ToastController } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { TranslateConfigService } from '../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currencySymbol: Observable <any>;
  //session_lang:any;
  subscribe: any;
  checkExit=true;
  backButtonSubscription:any;

  public counter=0;
  constructor(private modalController: ModalController,public productsService: ProductsService,public storageService:StorageService,private storage: Storage,private translateConfigService: TranslateConfigService,public platform: Platform,private translate:TranslateService,public router:Router,public alertController: AlertController,public toastCtrl: ToastController) {
   
    this.productsService.getCurrency().subscribe(result=>{      
      this.storageService.currencySymbol = result.currency_symble;
    })
    this.translateConfigService.getDefaultLanguage();
    // this.session_lang = this.storage.get('session_lang');
    // console.log(this.session_lang);
   }
  
   ngAfterViewInit() {
    this.backButtonSubscription =  this.platform.backButton.subscribe(()=>{
      if (this.counter <2) {
        if(this.counter==1){
          this.presentToast();
        }
        this.counter++;
        
        setTimeout(() => { this.counter = 0 }, 3000)
      } else {         
        navigator['app'].exitApp();
      }
    })
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  

 async presentToast() {
   

  let toast = await this.toastCtrl.create({
    message: this.translate.instant("menu.exit_app"),
    duration: 3000,
    position: 'top',
  
   
  });
  return await toast.present();
}
  ngOnInit() { }

  // Go to cart page
  async gotoCartPage() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

}
