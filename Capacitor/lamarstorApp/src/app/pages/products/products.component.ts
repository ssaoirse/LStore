/**
 * Product Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */


import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ModalController, LoadingController, Platform, NavController } from '@ionic/angular';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { FilterComponent } from '../filter/filter.component';
import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';
import { CartComponent } from '../cart/cart.component';
import { TranslateConfigService } from '../../services/translate-config.service';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  // List of prodict

  products: any;
  grid: Boolean = true;
  oneColumn: Boolean = false;
  list: Boolean = false;
  userId = "";
  checkNoData = true;
  subscribe:any;
  backButtonSubscription:any;
  goToHome= false;
  constructor(private productsService: ProductsService,
    public modalController: ModalController, public storageService: StorageService, private translateConfigService: TranslateConfigService, private location: Location, private http: HttpClient, public loadingCtrl: LoadingController,public platform: Platform,public navCtrl:NavController) {
  
    this.translateConfigService.getDefaultLanguage();


  }
  ngAfterViewInit() {
    this.backButtonSubscription =  this.platform.backButton.subscribe(()=>{
		
		if(this.goToHome==true){
       this.location.back();
      }
      //this.location.back();
	  //this.navCtrl.navigateBack('/tabs/tab2');
    })
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  
  ionViewWillEnter() {
    this.storageService.getUserData().then(userData => {
      if (userData != null) {
        this.userId = userData['id'];
        this.productsService.getAllProduct(userData['id']).subscribe(result => {
          this.products = result;
        });
      } else {
        this.productsService.getAllProduct("").subscribe(result => {
          this.products = result;
        });
      }
    });
  }
  ngOnInit() {

  }



  // Go to product details page
  async goToProductDetails(product) {
	  this.goToHome=false;
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product
    });
    modal.onDidDismiss()
      .then((data) => {
        this.storageService.getUserData().then(userData => {
          if (userData != null) {
            this.userId = userData['id'];
            this.productsService.getAllProduct(userData['id']).subscribe(result => {
              this.products = result;
            });
          } else {
            this.productsService.getAllProduct("").subscribe(result => {
              this.products = result;
            });
          }
        });
			this.goToHome=true;
      });
    return await modal.present();
  }

  // Open Filter page
  async openFilterPage() {
    const modal = await this.modalController.create({
      component: FilterComponent
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data.data.dismissed == false) {
           this.getFeature(data);
        }


      });
    await modal.present();
  }
  getFeature(data: any) {



    let body = `category_id=${data.data.selected_category}&product=&user_id=${this.userId}&brand_id=${data.data.selected_brand}&sort_by_price=${data.data.selected_price}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    this.http.post<any>(this.storageService.baseUrl + 'api/get_feature', body, { headers }).subscribe(result=>{
     this.checkNoData = result.status;
     
      this.products =result.feature_detail.records;
    })
   

  }

  // One column view function
  showOneColumn() {
    this.oneColumn = true;
    this.grid = false
    this.list = false;
  }

  // Grid view function
  showGrid() {
    this.grid = true;
    this.oneColumn = false;
    this.list = false;
  }

  // List view function
  showList() {
    this.list = true;
    this.grid = false;
    this.oneColumn = false;
  }


  beck_to_previous() {
    this.location.back();
  }
  // Go to cart page function
  async gotoCartPage() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }
}
