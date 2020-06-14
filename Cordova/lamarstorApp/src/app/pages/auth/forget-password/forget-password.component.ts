import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController,ModalController} from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { TranslateConfigService } from '../../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {

  email:any;

  constructor(public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,public storageService: StorageService,private translateConfigService: TranslateConfigService,private translate:TranslateService,
    private modalCtrl: ModalController) { 
    this.translateConfigService.getDefaultLanguage();
  }

  ngOnInit() {}

  async  forgetPassword(){
    if(this.email=="" || this.email==undefined){    
      this.storageService.presentToast(this.translate.instant("change_password.enter_email"),2000);
    }else{
      this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),       
      }).then((res) => {
        res.present();
        let body = `email=${this.email}`;
          let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
          this.http.post<any>(this.storageService.baseUrl+'api/forget_password', body, {headers} ).subscribe(data => {
            if(data.status==true){
              // console.log(data);
               res.dismiss();
               res.onDidDismiss().then((dis) => {
                this.navCtrl.navigateForward('/');
                this.storageService.presentToast(this.translate.instant("change_password.password_msg"),3000);
              });
            }else{
              res.dismiss();
                res.onDidDismiss().then((dis) => {
                  this.storageService.presentToast(this.translate.instant("change_password.wrong_mail"),3000);
             });
             
            }
            
          
        })
   
       
      });
    }
    
   
  }


  dismiss(){
      this.modalCtrl.dismiss({
      'dismissed': true      
    });
  }

}
