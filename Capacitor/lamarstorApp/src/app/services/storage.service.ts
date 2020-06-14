import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Product } from '../models/product.model';
import { ToastController,Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from './translate-config.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
   baseUrl = "https://lamarstor.com/";
   userDetails : any;
   currencySymbol:any;
   uid:any;
  
   authState = new BehaviorSubject(false);
  
  constructor(private storage: Storage,private toastCtrl: ToastController,private platform: Platform,private translate:TranslateService, private translateConfigService: TranslateConfigService,public http:HttpClient) {
    this.translateConfigService.getDefaultLanguage();
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });


      let body = ``;
      let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      this.http.post<any>(this.baseUrl + 'api/get_currency', body, { headers }).subscribe(result => {
        this.currencySymbol = result.currency_symble;
      })
  
    
   }
  
  ifLoggedIn() {
    this.storage.get('userDetails').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  logout() {   
      this.authState.next(false);    
  }

  // setUserData(data) : Promise <any> {
  //   this.authState.next(true);
  //   return   this.storage.set('userDetails',data);     
    
  // }

  setUserData(data){
       this.storage.set('userDetails',data).then((response)=>{
        this.authState.next(true);
       });        
  }
  
  
  
  
  getUserData() : Promise <any> {
    return this.storage.get('userDetails').then((items) => {
     return items;
    });
    
  }
  
  
  
    setOrderId(data) : Promise <any> {
    return   this.storage.set('order_id',data);     
    
  }
  
     setUserToken(data,topic){
		 
		   this.getUserData().then(result=>{
		   this.uid = result.id;
	       let body = `token=${data}&user_id=${this.uid}&topic=${topic}`;
           let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
           this.http.post<any>(this.baseUrl + 'api/set_fcm_token', body, { headers }).subscribe(result => {
			   return true;
        
      })
		   });
    
  }
  
  
  
  
  
    getOrderId() : Promise <any> {
    return this.storage.get('order_id').then((items) => {
     return items;
    });
    
  }

  getStorage(ITEMS_KEY): Promise<Product[]> {
    return this.storage.get(ITEMS_KEY);
  }
  getGrandTotal(): Promise<any>{
    let total =0;
   return this.storage.get("my-cart").then((items: Product[]) => {
      for(let i=0; i<items.length;i++){
       total +=items[i].discount_price*items[i].quantity;
      }
      return total;
    });
  }

  setStorageValue(product: Product, ITEMS_KEY): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Product[]) => {
      let chkPush = true; 
      if (items) {
        console.log(items);
        for(let i=0; i<items.length;i++){
          if(items[i]['id']==product['id']){
            chkPush = false; 
            items[i]['quantity'] = items[i]['quantity'] + product['quantity'];
          }
        }
        if(chkPush==true){
          items.push(product);
        }
        this.presentToast(this.translate.instant("cart.Item_added"),2000);
        return this.storage.set(ITEMS_KEY, items);
      } else {
        this.presentToast(this.translate.instant("cart.Item_added"),2000);
        return this.storage.set(ITEMS_KEY, [product]);
      }
    });
  }

  updateStorageValue(item: Product, ITEMS_KEY): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((items: Product[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let newItems: Product[] = [];

      for (let i of items) {
        if (i.id === item.id) {
          newItems.push(item);
        } else {
          newItems.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newItems);
    });
  }

  removeStorageValue(id: number, ITEMS_KEY): Promise<Product> {
    return this.storage.get(ITEMS_KEY).then((items: Product[]) => {
      if (!items || items.length === 0) {
        return null;
      }

      let toKeep: Product[] = [];

      for (let i of items) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
  
  removeCartItem(){
  this.storage.remove('my-cart');
  }
  
  setParentCat(data) : Promise <any> {
    return   this.storage.set('parentCatId',data);     
    
  }
    getParentCat() : Promise <any> {
    return this.storage.get('parentCatId').then((items) => {
     return items;
    });
    
  }
  async presentToast(msg, duration): Promise<any> {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: 'bottom',
    
     
    });
    return await toast.present();
  }

  
}
