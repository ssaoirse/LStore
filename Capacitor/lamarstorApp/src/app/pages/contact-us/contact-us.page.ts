import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController, Platform} from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

import { TranslateConfigService } from '../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from "@angular/common";
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  name:any;
  email:any;
  phone:any;
  message:any;
  backButtonSubscription:any;
  constructor(private translateConfigService: TranslateConfigService,public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public storageService: StorageService,public navCtrl: NavController,private translate:TranslateService,private location: Location,public platform:Platform) { 
    this.translateConfigService.getDefaultLanguage();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.backButtonSubscription =  this.platform.backButton.subscribe(()=>{
      this.location.back();
    })
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  
  async sendMail(){
      
    if(this.name=="" || this.name==undefined){     
      this.storageService.presentToast(this.translate.instant("contact_us.enter_name"),2000);
    }else if(this.email=="" || this.email==undefined){      
      this.storageService.presentToast(this.translate.instant("contact_us.enter_mail"),2000);
    }else if(this.phone=="" || this.phone==undefined){      
      this.storageService.presentToast(this.translate.instant("contact_us.enter_phone"),2000);
    }else if(this.message=="" || this.message==undefined){      
      this.storageService.presentToast(this.translate.instant("contact_us.enter_msg"),2000);
    }else{
      this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),       
      }).then((res) => {
        res.present();
        let body = `name=${this.name}&email=${this.email}&phone=${this.phone}&message=${this.message}`;

          let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
          this.http.post<any>(this.storageService.baseUrl+'api/contact_us_mail', body, {headers} ).subscribe(data => {
              console.log(data);
              res.dismiss();
              res.onDidDismiss().then((dis) => {
                this.name="";
                this.email="";
                this.phone="";
                this.message="";
                this.storageService.presentToast(this.translate.instant("contact_us.mail_success"),2000);
             });
        })
   
       
      });
    }
    
  }

}
