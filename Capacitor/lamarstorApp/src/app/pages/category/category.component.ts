
/**
 * Category Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { CartComponent } from '../cart/cart.component';
import { ModalController,Platform, LoadingController,NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from '../../services/translate-config.service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  
  categories: Observable<any>;
  grid: Boolean = true;
  oneColumn: Boolean = false;
  list: Boolean = false;
  backButtonSubscription:any;
  constructor(private modalController: ModalController,private categoryService: CategoryService,private storageService:StorageService,private router: Router,private translateConfigService: TranslateConfigService,public loadingCtrl: LoadingController,private location: Location,public platform: Platform,public navCtrl: NavController,public translate:TranslateService) {
  
    this.translateConfigService.getDefaultLanguage();
  }
  ngAfterViewInit() {
    this.backButtonSubscription =  this.platform.backButton.subscribe(()=>{
      this.location.back();
    })
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
  
 ngOnInit() {
    this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),
      }).then((res) => {
	 
	 res.present();
	  this.storageService.getParentCat().then((id) => {
		  console.log(id);
		if(id)
		{
			this.categories = this.categoryService.categoryList(id);
		}
		else
		{
			this.categories = this.categoryService.categoryList(0); 
		}
	  });
	  res.dismiss();
	  
	  res.onDidDismiss().then((dis) => {
				this.storageService.setParentCat(0);
				  });
  
  });
  }
  
    ionViewWillEnter(){
		 this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),
      }).then((res) => {
	 res.present();
	 
	  this.storageService.getParentCat().then((id) => {
		  console.log(id);
		if(id)
		{
			this.categories = this.categoryService.categoryList(id);
		}
		else
		{
			this.categories = this.categoryService.categoryList(0); 
		}
	  });
	  res.dismiss();
	  
	  res.onDidDismiss().then((dis) => {
				this.storageService.setParentCat(0);
				  });
  
  });
		
	}

 
  goToProduct(id:number,subcat:any){    

if(subcat)
	{	
		this.storageService.setParentCat(id);
		this.ionViewWillEnter(); 
	}
	else
	{   
		this.router.navigateByUrl('/tabs/product-category/'+id);  
	}	
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
  beck_to_previous(){
    this.navCtrl.navigateBack('/tabs/tab1');
  }
}
