import { Component, OnInit,Input } from '@angular/core';
import { TranslateConfigService } from '../../services/translate-config.service';
import { ModalController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.page.html',
  styleUrls: ['./add-rating.page.scss'],
})
export class AddRatingPage implements OnInit {
  @Input() pro_id: number;
 star=[];
  count=0;
  userId:any;
  title:any;
  review:any;
  constructor(private translateConfigService: TranslateConfigService, public modalController: ModalController,private translate:TranslateService,public loadingCtrl:LoadingController,public http: HttpClient,public storageService:StorageService) {
    this.translateConfigService.getDefaultLanguage();
    this.storageService.getStorage('userDetails').then((userData) => {
      if (userData != null) {
        this.userId = userData['id'];
      } 
    });
  }

  ngOnInit() {
  }
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
 
  setCounter(counter){
    this.count = counter;
    for(let i=1;i<=5;i++){
      if(i<=counter){
        this.star[i]=true;
      }else{
        this.star[i]=false;
      }
    }
  }
  add_review(){
    
    this.loadingCtrl.create({
      message: this.translate.instant("account.loading"),
    }).then((res) => {
      res.present();
      let body = `user_id=${this.userId}&pro_id=${this.pro_id}&title=${this.title}&review=${this.review}&rating=${this.count}`;
      let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      this.http.post<any>(this.storageService.baseUrl + 'api/add_review', body, { headers }).subscribe(data => {
        //console.log(data);
              
          res.dismiss();
          this.modalController.dismiss({
            'dismissed': true ,
            'product_review': data.product_reviews           
          });
          
       


      })


    });
  }
  

}
 