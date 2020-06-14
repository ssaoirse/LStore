import { Component, OnInit } from '@angular/core';

import { TranslateConfigService } from '../../services/translate-config.service';
import { Location } from "@angular/common";
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.page.html',
  styleUrls: ['./terms-and-condition.page.scss'],
})
export class TermsAndConditionPage implements OnInit {

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
