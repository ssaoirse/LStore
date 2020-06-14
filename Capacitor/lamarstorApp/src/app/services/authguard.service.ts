import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CanActivate } from '@angular/router';
import { StorageService } from './storage.service';
import { SigninComponent } from '../pages/auth/signin/signin.component';
import { ModalController } from '@ionic/angular';

@Injectable()
export class AuthguardService implements CanActivate {
  
  
  constructor(private storage: Storage,public storageService: StorageService,private modalController:ModalController) { 

    
  }
  

  canActivate(): boolean {
    if(!this.storageService.isAuthenticated()){
     // this.storageService.presentToast("Please login",2000);
          this.signIn();
    }
    
    return this.storageService.isAuthenticated();
  }
  async signIn(){
    const modal = await this.modalController.create({
      component: SigninComponent
    });

        modal.onDidDismiss()
      .then((data) => {
      
      });
     await modal.present();
  }
  
}
