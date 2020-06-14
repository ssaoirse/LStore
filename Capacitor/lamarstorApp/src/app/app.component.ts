 /**
 * Main App Components
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 * 
 */

import { Component} from '@angular/core';

import { Platform,NavController,MenuController,ModalController, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { PagesService } from './services/pages.service';
import { Storage } from '@ionic/storage';
import { StorageService } from './services/storage.service';
import { OrderService } from './services/order.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from './services/translate-config.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { FCM } from '@ionic-native/fcm/ngx';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  languageDetails:any;


  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private menuController: MenuController, private router: Router,
    private pagesService: PagesService, private storage: Storage, public navCtrl: NavController, public storageService:StorageService, public orderService:OrderService,
    private translateConfigService: TranslateConfigService, private translate: TranslateService, private toastCtrl: ToastController, private fb: Facebook, private googlePlus: GooglePlus, public fcm: FCM){
    this.initializeApp();
	this.fcm.getToken().then(token => {
	this.fcm.subscribeToTopic('lamarstore');
	this.storageService.setUserToken(token,'lamarstore');
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      this.storageService.setUserToken(token,'lamarstore');
    });
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
     // this.statusBar.styleDefault();
     // let status bar overlay webview
     // this.statusBar.overlaysWebView(true);
     // set status bar to white
	this.fcm.onNotification().subscribe(data => {
     if (data.wasTapped) {
      //Notification was received on device tray and tapped by the user.
      console.log(JSON.stringify(data));
      // this.navCtrl.setRoot('DetailPage', { profileId: data.profileId });
     } else {
       //Notification was received in foreground. Maybe the user needs to be notified.
       console.log(JSON.stringify(data));
       //this.navCtrl.push('DetailPage', { profileId: data.profileId });
     }
     });
     this.splashScreen.hide();
     this.statusBar.backgroundColorByHexString('#FF8080');
     this.translateConfigService.getDefaultLanguage();
     // Get Menus For Side Menu
     this.appPages = this.pagesService.getPages();
	 
     this.storage.get('selected_language').then(language=>{
        if(language!=null){        
          if(language=='rem'){
            document.documentElement.dir = "rtl";
          }else{
            document.documentElement.dir = "ltr";
          }
        }else{
          document.documentElement.dir = "rtl";
        }
      });
    });
  }
  
  languageChanged(val){  
    if(val.target.value=='rem'){
      document.documentElement.dir = "rtl";
    }else{
      document.documentElement.dir = "ltr";
    }
    this.storage.set('selected_language',val.target.value);

    this.translateConfigService.setLanguage(val.target.value);
  }
}
