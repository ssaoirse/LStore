/**
 * Filter Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { ModalController ,LoadingController} from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { TranslateConfigService } from '../../services/translate-config.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  // priceRange: any;
  // colors: any = ["#CECE45", "#F951E2", "#CF0114"];
  // sizes: any = ["S", "M", "L", "XL"];
  // brands: any = ["Gucci", "Chanel", "Louis Vuitton", "Hermès", "Nike", "Prada"];
    categoryList:any;
    brandLIst:any;

    selected_brand="";
    selected_category="";
    selected_price = "";
    userId : any;
  constructor(public modalController: ModalController,private loadingCtrl: LoadingController,private storageService: StorageService,private http:HttpClient,public storage:Storage,private translateConfigService: TranslateConfigService) { 

    this.translateConfigService.getDefaultLanguage();
    
    this.storage.get('userDetails').then((response)=>{
      this.userId= response['id'];
     });    
    this.loadingCtrl.create({
      message: 'Loading...',
    }).then((res) => {
      res.present();
      let body = ``;
      let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      this.http.post<any>(this.storageService.baseUrl + 'api/get_category', body, { headers }).subscribe(data => {    
       // console.log(data);   
        this.categoryList = data.category_detail;  
        this.brandLIst = data.brand_detail;      
          res.dismiss();
     
      })
      

    });
  }

  ngOnInit() {
    //this.configure();
  }

  // configure() {
  //   this.priceRange = {
  //     lower: 30,
  //     upper: 60
  //   }
  // }

  async selectBrand(event){
   // console.log(event.detail);
   this.selected_brand = event.detail.value;
  }
  async selectCategory(event){
   // console.log(event.detail);
    this.selected_category = event.detail.value;
  }
  async selectFilter(event){
   // console.log(event.detail);
    this.selected_price = event.detail.value;
  }
  cancelModal(){
    this.modalController.dismiss({
      'dismissed': true
    })
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true,
    })
  }
  applyFilter(){
    this.modalController.dismiss({
      'dismissed': false,
      'selected_brand':this.selected_brand,
      'selected_category':this.selected_category,
      'selected_price': this.selected_price
      
    })
  }

}
