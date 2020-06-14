import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DealsService } from '../../services/deals.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';
import { ProductDetailsHomePage } from '../../pages/product-details-home/product-details-home.page';

import { TranslateConfigService } from '../../services/translate-config.service';

@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss'],
})
export class HotDealsComponent implements OnInit {

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };

  deals: Observable<any>;
  userId="";

  constructor(private dealsService: DealsService, public storageService: StorageService, public http: HttpClient,private modalController: ModalController,private translateConfigService: TranslateConfigService, public navCtrl: NavController) { 
  
    this.storageService.getUserData().then(userData=>{
      //console.log(userData);
      if(userData!=null){
        //this.userId = userData['id'];
        this.deals = this.dealsService.getDealsAll(userData['id']);
      }else{
        this.deals = this.dealsService.getDealsAll("");
      }

     
    });
    this.translateConfigService.getDefaultLanguage();
  }

  ngOnInit() {
    
    
  }

  goToHome(){
    this.navCtrl.navigateBack('/tabs/tab2');
  }
  async goToProductDetails(product) {
    const modal = await this.modalController.create({
      component: ProductDetailsHomePage,
      componentProps: product
    });
    return await modal.present();
  }


}
