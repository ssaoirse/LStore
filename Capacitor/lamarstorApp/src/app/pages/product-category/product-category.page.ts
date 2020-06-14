import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, LoadingController,Platform, NavController } from '@ionic/angular';
import { ProductsService } from '../../services/products.service';
import { FilterComponent } from '../filter/filter.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Observable } from 'rxjs';
import { Location } from "@angular/common";
import { CartComponent } from '../cart/cart.component';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from '../../services/translate-config.service';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.page.html',
  styleUrls: ['./product-category.page.scss'],
})
export class ProductCategoryPage implements OnInit {

  products: any;
  grid: Boolean = true;
  oneColumn: Boolean = false;
  list: Boolean = false;

  checkNoData = true;
  msg = "";
  userId: any;
  subscribe:any;
  backButtonSubscription:any;
  goToHome= false;
  constructor(private activatedRoute: ActivatedRoute, public route: Router, public productsService: ProductsService, public modalController: ModalController, private location: Location, public loadingCtrl: LoadingController, public storageService: StorageService, public http: HttpClient, private translate: TranslateService, private translateConfigService: TranslateConfigService,public platform: Platform,public navCtrl: NavController) {
    
    this.translateConfigService.getDefaultLanguage();
    this.storageService.getUserData().then(userData => {
      if (userData != null) {
        this.userId = userData['id'];

      }
    });
  }

  ngAfterViewInit() {
    this.backButtonSubscription =  this.platform.backButton.subscribe(()=>{
      if(this.goToHome == true){
			this.location.back();
     }
		//this.location.back();
    })
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),
      }).then((res) => {
        res.present();
        this.productsService.getCategoryProduct(params.get('id')).subscribe(products => {
          this.products = products;
          if (this.products == undefined) {
            this.checkNoData = false;
            this.msg = this.translate.instant("account.no_data");
          }

          res.dismiss();
        })
      });



    });
  }


  // Go to product details page
  async goToProductDetails(product) {
	  this.goToHome= false;
	  console.log('gotoHome f:- '+this.goToHome);
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product
    });
    modal.onDidDismiss()
      .then((data) => {
        this.goToHome = true;
		console.log('gotoHome :- '+this.goToHome);
        this.activatedRoute.paramMap.subscribe(params => {
          this.productsService.getCategoryProduct(params.get('id')).subscribe(products => {
            this.products = products;
            console.log(this.products);
            if (this.products == undefined) {
              this.checkNoData = false;
              this.msg = this.translate.instant("account.no_data");
            }

          });
        });

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

          let body = `category_id=${data.data.selected_category}&product=&user_id=${this.userId}&brand_id=${data.data.selected_brand}&sort_by_price=${data.data.selected_price}`;
          let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
          this.http.post<any>(this.storageService.baseUrl + 'api/get_feature', body, { headers }).subscribe(result => {
            if (result.status == false) {
              this.checkNoData = false;
            } else {
              this.checkNoData = true;
            }
            this.products = result.feature_detail.records;
          })



        }
      });
    await modal.present();
  }

  getFeature(data: any) {


    let body = `category_id=${data.data.selected_category}&product=&user_id=${this.userId}&brand_id=${data.data.selected_brand}&sort_by_price=${data.data.selected_price}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    this.http.post<any>(this.storageService.baseUrl + 'api/get_feature', body, { headers }).subscribe(result => {
      if (result.status == false) {
        this.checkNoData = false;

      } else {
        this.checkNoData = true;
      }
      this.products = result.feature_detail.records;
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

  // Go to cart page function
  async gotoCartPage() {
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }
  beck_to_previous() {
    this.location.back();
  }

}
