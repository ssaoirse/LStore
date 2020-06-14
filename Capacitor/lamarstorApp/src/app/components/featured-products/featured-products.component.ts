import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { ModalController } from '@ionic/angular';
import { ProductDetailsComponent } from '../../pages/product-details/product-details.component';
import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';
import { TranslateConfigService } from '../../services/translate-config.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {

  products: any;

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 2,
  };
  userId="";
  constructor(private productsService: ProductsService,
    private modalController: ModalController,public storageService : StorageService,private translateConfigService: TranslateConfigService) {
      this.storageService.getUserData().then(userData=>{
        if(userData!=null){
          this.userId = userData['id'];
          this.productsService.featuredProduct(userData['id']).subscribe(result=>{
            this.products = result;
          });
        }else{
           this.productsService.featuredProduct("").subscribe(result=>{
            this.products = result;
          });
        }
      });

      this.translateConfigService.getDefaultLanguage();

    }

  ngOnInit() {
    
     // this.products = this.productsService.featuredProduct(this.userId);
    
  }

  

  async goToProductDetails(product) {
   // console.log(product);
    const modal = await this.modalController.create({
      component: ProductDetailsComponent,
      componentProps: product
    });
    modal.onDidDismiss()
    .then((data) => {     

      this.storageService.getUserData().then(userData=>{
        if(userData!=null){
          this.userId = userData['id'];
          this.productsService.featuredProduct(userData['id']).subscribe(result=>{
            this.products = result;
          });
        }else{
           this.productsService.featuredProduct("").subscribe(result=>{
            this.products = result;
          });
        }
      });

    });
    return await modal.present();
  }

}
