import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, LoadingController, NavController,ModalController } from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TranslateConfigService } from '../../../services/translate-config.service';
import { SignupComponent } from '../signup/signup.component';
import { TranslateService } from '@ngx-translate/core';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  email: any;
  password: any;
  FB_APP_ID: number = 988830668181436;
  activate_facebook: any;
  activate_google: any;
  constructor(public http: HttpClient, private toastCtrl: ToastController, public loadingCtrl: LoadingController, public storageService: StorageService, public navCtrl: NavController, private storage: Storage, private router: Router, private fb: Facebook, private googlePlus: GooglePlus,private translateConfigService: TranslateConfigService,private modalController:ModalController,private translate:TranslateService) {
    
    this.translateConfigService.getDefaultLanguage();

    this.get_settings();
  }

  async  get_settings() {
    let body = ``;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    this.http.post<any>(this.storageService.baseUrl + 'api/get_settings', body, { headers }).subscribe(data => {
      if (data.status == true) {
       // console.log(data.settings);
        this.activate_facebook =  data.settings.activate_facebook;
        this.activate_google =  data.settings.activate_google;
      }
    })
  }
  ngOnInit() { }

  async  loginCheck() {
    if (this.email == "" || this.email == undefined) {
      this.storageService.presentToast(this.translate.instant("login.enter_mail"), 2000);
    } else if (this.password == "" || this.password == undefined) {
      this.storageService.presentToast(this.translate.instant("login.enter_pass"), 2000);
    } else {
      this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),
      }).then((res) => {
        res.present();
        let body = `email=${this.email}&password=${this.password}`;
        let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        this.http.post<any>(this.storageService.baseUrl + 'api/user_login', body, { headers }).subscribe(data => {
          if (data.status == true) {

           
            res.dismiss();
            res.onDidDismiss().then((dis) => {
              // this.storageService.setUserData(data.user_detail).then(()=>{
              //   this.modalController.dismiss({
              //     'dismissed': true,
              //     'isLoginChk':true
              //   });
              // })
             // this.navCtrl.navigateForward('/tabs/tab1');
             this.storageService.setUserData(data.user_detail);
             this.modalController.dismiss({
              'dismissed': true,
              'isLoginChk':true
            });
            });
            
          } else {
            res.dismiss();
            res.onDidDismiss().then((dis) => {
              this.storageService.presentToast(this.translate.instant("login.wrong_mail_pass"), 3000);

              this.modalController.dismiss({
                'dismissed': true,
                'isLoginChk':false
              });
            });

          }


        })


      });
    }


  }



  async facebookLogin() {
    const loading = await this.loadingCtrl.create({
      message: this.translate.instant("login.wait")
    });
    this.presentLoading(loading);
    let permissions = new Array<string>();

    //the permissions your facebook app needs from the user
    permissions = ["public_profile", "email"];

    this.fb.login(permissions)
      .then(response => {
        let userId = response.authResponse.userID;

        //Getting name and gender properties
        this.fb.api("/me?fields=name,email", permissions)
          .then(user => {
            user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
            //now we have the users info, let's save it in the NativeStorage
           // console.log(userId);
         //   console.log(user.name+" "+user.email+" "+user.picture);

            let body = `name=${user.name}&email=${user.email}&fb_uniqe_id=${userId}&login_type=1`;
            let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            this.http.post<any>(this.storageService.baseUrl + 'api/facebook_login', body, { headers }).subscribe(data => {
              if (data.status == true) {
                this.storage.set('facebook_user',
                  {
                    name: user.name,
                    email: user.email,
                    picture: user.picture
                  });
                // this.storageService.setUserData(data.user_details)
                // .then(() => {
                //  // this.router.navigate(["/tabs/tab1"]);
                //   loading.dismiss();
                // }, error => {
                //   console.log(error);
                //   loading.dismiss();
                // })
                this.storageService.setUserData(data.user_details);
                this.modalController.dismiss({
                  'dismissed': true,
                  'isLoginChk':true
                });
				console.log(data.user_details);
                loading.dismiss();
              }
            });


          })
      }, error => {
        console.log(error);
        loading.dismiss();
      });
  }

  async presentLoading(loading) {
    return await loading.present();
  }


  async doGoogleLogin() {
    const loading = await this.loadingCtrl.create({
      message: this.translate.instant("login.wait")
    });
    this.presentLoading(loading);

    this.googlePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '364777597717-5d252p1r31m6ngrjcnl7fe23vkenbj7l.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    })
      .then(user => {
       // console.log(user);
      //  console.log(user.displayName+" "+user.email);
        
        let body = `name=${user.displayName}&email=${user.email}&fb_uniqe_id=${user.userId}&login_type=2`;
          let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
          this.http.post<any>(this.storageService.baseUrl + 'api/facebook_login', body, { headers }).subscribe(data => {
			  
            if (data.status == true) {
              this.storage.set('google_user', {
                name: user.displayName,
                email: user.email,
                picture: user.imageUrl
              });
              // this.storageService.setUserData(data.user_details)
              // .then(() => {
              //  // this.router.navigate(["/tabs/tab1"]);
              //   loading.dismiss();
              // }, error => {
              //   console.log(error);
              //   loading.dismiss();
              // })
              this.storageService.setUserData(data.user_details);
			  console.log(data.user_details);
              loading.dismiss();
              this.modalController.dismiss({
                'dismissed': true,
                'isLoginChk':true
              });             
            }
          });

      }, err => {
        
        console.log("error==>>",err);
        loading.dismiss();
      });


  }



  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
      'isLoginChk':false
    });
  }


  signup(){
    this.modalController.dismiss({
      'dismissed': true,
      'isLoginChk':false
    }).then(()=>{
     this.openSignUp();
    })

  }

 async openSignUp(){
    const modal = await this.modalController.create({
      component: SignupComponent      
    });
    return await modal.present();
  }

  async goToForgotPass(){
    const modal = await this.modalController.create({
      component: ForgetPasswordComponent      
    });
    return await modal.present();
  }

}
