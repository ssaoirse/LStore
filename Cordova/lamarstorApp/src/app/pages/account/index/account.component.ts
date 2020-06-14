import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { TranslateConfigService } from '../../../services/translate-config.service';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Storage } from '@ionic/storage';
import { CartComponent } from '../../cart/cart.component';
import { ModalController } from '@ionic/angular';
import { MyprofileComponent } from '../myprofile/myprofile.component';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  name:any;
  email:any;
  languageDetails:any;
  constructor(public storageService:StorageService,private translateConfigService: TranslateConfigService, private router: Router,private fb: Facebook, private googlePlus: GooglePlus, private storage: Storage, private modalController: ModalController) { 
    
    this.translateConfigService.getDefaultLanguage();

    
    
  }
  ionViewWillEnter(){
    this.storage.get('userDetails').then((response)=>{      
      this.name = response['name'];
      this.email = response['email'];
      this.languageDetails = response.language_detail;
     });  
  }
  ngOnInit() {}
 
  // Signout Button
  signout() {
    this.fb.logout();
    this.googlePlus.logout();
    this.storage.remove('userDetails');
    this.storage.remove('my-cart');
    this.storage.remove('discount');
    this.storage.remove('discountCode');

    this.router.navigate(['/tabs/tab1']);    
    this.storageService.logout();
 
  }
  goToWishList(){
    this.router.navigate(['tabs/tab3']);
  }
  goToOrder(){
    this.router.navigate(['tabs/tab4']);
  }
  goTobestSeller(){
    this.router.navigate(['tabs/tab2']);
  }
  async openCart(){
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }
  async openmyprofile(){
    const modal = await this.modalController.create({
      component: MyprofileComponent
    });
    return await modal.present();
  }
}
