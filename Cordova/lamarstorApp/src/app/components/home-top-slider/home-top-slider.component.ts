import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';
import { BannerService } from '../../services/banner.service';
import { LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-home-top-slider',
  templateUrl: './home-top-slider.component.html',
  styleUrls: ['./home-top-slider.component.scss'],
})
export class HomeTopSliderComponent implements OnInit {  
  bannerList: Observable<any>;
  // Slider Options
  slideOpts = {
    initialSlide: 0,
    loop: true,
    autoplay: true,
    speed: 400,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };

  constructor(public storageService: StorageService,public http:HttpClient,public bannerService:BannerService,public loadingCtrl: LoadingController ) { }

  ngOnInit() { 

    this.loadingCtrl.create({
      message: 'Loading...',       
    }).then((res) => {
      res.present();
      let body = ``;
      let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
      this.http.post<any>(this.storageService.baseUrl+'api/home_slider', body, {headers} ).subscribe(data => {
          if(data.status==true){                   
            this.bannerList = data.home_slider;
            res.dismiss();
          }        
        
      })
 
     
    });

  }
  
}
