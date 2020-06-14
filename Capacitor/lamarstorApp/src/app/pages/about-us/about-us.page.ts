import { Component, OnInit } from '@angular/core';

import { TranslateConfigService } from '../../services/translate-config.service';
import { Location } from "@angular/common";
import { Platform } from '@ionic/angular';
   
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  backButtonSubscription:any;
  constructor(private translateConfigService: TranslateConfigService,private location: Location,private platform:Platform) { 
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
  }

}
