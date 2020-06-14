import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController} from '@ionic/angular';

import { StorageService } from '../../../services/storage.service';
import { TranslateConfigService } from '../../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-mywallet',
  templateUrl: './mywallet.component.html',
  styleUrls: ['./mywallet.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class MywalletComponent implements OnInit {
 languageDetails:any;
 uid:any;
 rows:any;
 cur_bal:any;
 currencySymbol:any;
  
  constructor(public storageService:StorageService,public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,private translateConfigService: TranslateConfigService,private translate:TranslateService) { 

	this.translateConfigService.getDefaultLanguage();
	this.currencySymbol = this.storageService.currencySymbol;
  		
  }
  ionViewWillEnter(){
	  
    this.storageService.getUserData().then(result=>{
		this.languageDetails = result.languageDetails;
		this.uid=result.id;
   this.loadingCtrl.create({
		  message: this.translate.instant("account.loading"),       
		}).then((res) => {
		  res.present();
	  
		  let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						  'Accept': 'application/json'};
  
	  let postData = `uid=${result.id}`;
  
	  this.http.post<any>(this.storageService.baseUrl+"api/get_wallet_balance", postData, {headers})
		.subscribe(data =>
		{
  
		  if(data.success==1)
		  {
		  //this.walletdata=data.data;
		  res.dismiss();
				  res.onDidDismiss().then((dis) => {
			  this.rows=data.details;
			  this.cur_bal=data.bal;
				  });
		
		  }
		  else {
			  if(data.msg=='nodata')
			  {
				  res.dismiss();
				  res.onDidDismiss().then((dis) => {
				  this.cur_bal=data.bal;
				  this.storageService.presentToast(this.translate.instant("account.no_data"),3000);
				  });
				  
			  }
			  else 
			  {
				  res.dismiss();
				  res.onDidDismiss().then((dis) => {
				  this.storageService.presentToast(this.translate.instant("account.unauthorised"),3000);
				  });
			  }
			  
			  
		  }
		  
		  
		  
		 }, error => {
			 res.dismiss();
		  console.log(error);
		});
	  });
	  });
  }
	
  
  
  ngOnInit() {}
  



}