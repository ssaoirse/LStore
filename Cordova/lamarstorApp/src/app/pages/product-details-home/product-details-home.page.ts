import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { StorageService } from '../../services/storage.service';
import { ProductsService } from '../../services/products.service';
import { CartComponent } from '../cart/cart.component';
import { ModalController, AlertController,LoadingController,Platform } from '@ionic/angular';
import { TranslateConfigService } from '../../services/translate-config.service';
import { HttpClient } from '@angular/common/http';
import { SigninComponent } from '../../pages/auth/signin/signin.component';
import { TranslateService } from '@ngx-translate/core';
import { AddRatingPage } from '../add-rating/add-rating.page';
import { Location } from "@angular/common";
@Component({
  selector: 'app-product-details-home',
  templateUrl: './product-details-home.page.html',
  styleUrls: ['./product-details-home.page.scss'],
})
export class ProductDetailsHomePage implements OnInit {

  @Input() id: number;
  @Input() name: String;
  @Input() description: String;
  @Input() original_price: number;
  @Input() discount_price: number;
  @Input() default_image: Array<String>;
  @Input() product_size: Array<String>;
  @Input() product_color: Array<String>;
  @Input() isWishlist: number;
  @Input() product_images: any;
  @Input() currency_symble: any;
  @Input() product_reviews: any;

  products: Product;

  
  // Slider Options
  slideOpts = {
    initialSlide: 1,
    loop: true,
    autoplay: false,
    speed: 400,
    pagination:true,
    // pagination: {
    //   el: '.swiper-pagination',
    //   dynamicBullets: true,
    // },
  };


  
  customSize: any;
  customColor: any;
  selected_color :any;
  selected_size :any;
  color:any;
  size :any;
  baseUrl:any;
   subscribe: any;
  checkExit=true;
  backButtonSubscription:any;
  constructor(public modalController: ModalController, public storageService: StorageService,private platform:Platform,public location:Location, public alertController: AlertController,public productsService: ProductsService,private translateConfigService: TranslateConfigService,public http:HttpClient, public loadingCtrl: LoadingController,private translate:TranslateService) {
    this.baseUrl = this.storageService.baseUrl;
    this.translateConfigService.getDefaultLanguage();
    

  }

 
  ionViewWillEnter(){
   // console.log(this.isWishlist);
    //console.log(this.product_color);
    this.customColor = this.product_color[0]['color_id'];
    this.product_size = this.product_color[0]['product_size'];
    this.color = this.product_color[0]['color_id']; // default selected
  // console.log(this.product_size);
    if(this.product_size.length!=0){
      this.size = this.product_color[0]['product_size'][0]['size_id'];
    }
    this.selected_color = this.product_color[0]['color_id'];
}
ngOnInit() {
 

}

     ngAfterViewInit() {
    this.backButtonSubscription =  this.platform.backButton.subscribe(()=>{
		this.location.back();
    
    })
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

sizeChange(item) {
  // console.log(item.target.value);
   for(let i=0;i<this.product_color.length;i++){
     if(this.product_color[i]['color_id']==item.target.value){
       if(this.product_color[i]['product_size'].length!=0){
         this.product_size = this.product_color[i]['product_size'];
         this.size=this.product_size[0]['size_id'];
       }              
     }
   }
   this.selected_color = item.target.value;   
 }
selectColor(item) {
  this.customColor = item['color_id'];
  this.selected_size = item.target.value;
}


  // Add to Cart Function
  async addToCart() {

    if(this.selected_color==undefined || this.selected_color==null){
      this.storageService.presentToast(this.translate.instant("product_details.color_select"),2000);
    }else{
      this.products = {
        id: this.id,
        name: this.name,
        description: this.description,
        original_price: this.original_price,
        discount_price: this.discount_price,
        default_image: this.default_image,
        product_size: this.customSize,
        product_color: this.customColor,
        quantity: 1,
        product_reviews: this.product_reviews,
        isWishlist: this.isWishlist,
        currency_symble: this.currency_symble,
        selected_color: this.selected_color,
        selected_size: this.selected_size
      }
  
      // Save cart product in storage
      
        const alert = await this.alertController.create({
          header: this.translate.instant("cart.confirm"),
          message: this.translate.instant("cart.add_to_cart"),
          buttons: [
            {
              text: this.translate.instant("order.cancel"),
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }, {
              text: this.translate.instant("cart.okay"),
              handler: () => {
              
                this.storageService.setStorageValue(this.products, 'my-cart');
                
              }
            }
          ]
        });
  
        await alert.present();

    }

   
  }


  changeWishlistStatus(status) {

    this.storageService.getStorage('userDetails').then((userData) => {
      if (userData != null) {
        this.updateWishlist(userData['id'], status);
      } else {
        this.signIn();
      }
    });

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
  
  async updateWishlist(userId, status) {


    const alert = await this.alertController.create({
      header: this.translate.instant("cart.confirm"),
      message:  this.translate.instant("product_details.add_to_wishlilst"),
      buttons: [
        {
          text: this.translate.instant("order.cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: this.translate.instant("cart.okay"),
          handler: () => {
            this.loadingCtrl.create({
              message: this.translate.instant("account.loading"),
            }).then((res) => {
              res.present();
              let body = `product_id=${this.id}&status=${status}&user_id=${userId}&color_id=${this.customColor}&size_id=`;
              let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
              return this.http.post<any>(this.storageService.baseUrl + 'api/add_wishlist', body, { headers }).subscribe((result) => {
                if (result.status == true) {
                  this.isWishlist = 1;
                }else{
                  this.isWishlist = 0;
                }
                res.dismiss();
              })
            });


          }
        }
      ]
    });

    await alert.present();

  }
  // Go to cart page
  async gotoCartPage() {
    this.dismiss();
    const modal = await this.modalController.create({
      component: CartComponent
    });
    return await modal.present();
  }

  // Back to previous page function
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
  
  openAddReview(){
    this.storageService.getStorage('userDetails').then((userData) => {
      if (userData != null) {
        this.openReviewModal();
      } else {
        this.signIn();
      }
    });
  }


  async openReviewModal(){
    const modal = await this.modalController.create({
      component: AddRatingPage,
      componentProps: {pro_id:this.id}
    });
    modal.onDidDismiss()
    .then((data) => {   
      this.product_reviews =data.data.product_review;
      
    });
    return await modal.present();
  }

}
