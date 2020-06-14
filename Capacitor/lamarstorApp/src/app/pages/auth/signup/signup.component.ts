import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController,ModalController} from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';

import { TranslateConfigService } from '../../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  first_name:any;
  last_name:any;
  email:any;
  mobile_number:any;
  password:any;
  constructor(public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public storageService: StorageService,public navCtrl: NavController,private translateConfigService: TranslateConfigService,private modalController:ModalController,private translate:TranslateService) { 
    this.translateConfigService.getDefaultLanguage();
  }

  ngOnInit() {}

  async register(){
      
    if(this.first_name=="" || this.first_name==undefined){     
      this.storageService.presentToast(this.translate.instant("account.first_name"),2000);
    }else if(this.last_name=="" || this.last_name==undefined){    
      this.storageService.presentToast(this.translate.instant("account.last_name"),2000);
    }else if(this.email=="" || this.email==undefined){      
      this.storageService.presentToast(this.translate.instant("account.enter_email"),2000);
    }else if(this.mobile_number=="" || this.mobile_number==undefined){      
      this.storageService.presentToast(this.translate.instant("account.enter_phone"),2000);
    }else if(this.password=="" || this.password==undefined){      
      this.storageService.presentToast(this.translate.instant("account.enter_password"),2000);
    }else{
      this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),       
      }).then((res) => {
        res.present();
        let body = `first_name=${this.first_name}&last_name=${this.last_name}&email=${this.email}&mobile_number=${this.mobile_number}&password=${this.password}`;

          let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
          this.http.post<any>(this.storageService.baseUrl+'api/user_register', body, {headers} ).subscribe(data => {
             // console.log(data);
              res.dismiss();
              res.onDidDismiss().then((dis) => {
               // this.navCtrl.navigateForward('/landing');
              const toast = this.toastCtrl.create({
                message: this.translate.instant("account.reg_success"),
                duration: 2000
              }).then((toastData)=>{
                this.modalController.dismiss();
                toastData.present();
              });
             });
        })
   
       
      });
    }
    
  }
  closeSignup(){
    this.modalController.dismiss();
  }
}
