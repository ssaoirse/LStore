import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController} from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TranslateConfigService } from '../../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trackingdetails',
  templateUrl: './trackingdetails.component.html',
  styleUrls: ['./trackingdetails.component.scss'],
})



export class TrackingdetailsComponent implements OnInit {
	uid:any;
	oid:0;
	results:any;
	order_results:any;
	user_info:any;
	order_number:any;
	txn_no:any;
	order_status:any;
	payment_status:any;
	payment_method:any;
	mobile_number:any;
	tracking_number:any;
	shipping_carrier:any;
  
  
  constructor(public storageService:StorageService,public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,public formBuilder:FormBuilder,private translate:TranslateService,private translateConfigService: TranslateConfigService) { 

	this.translateConfigService.getDefaultLanguage();
   
   this.storageService.getOrderId().then(result=>{
		this.oid = result;
		console.log(result);
	  });
	  
   this.storageService.getUserData().then(result=>{
      this.uid = result.id;
	  
	
	if(this.uid && this.oid)
	{
		  this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),       
      }).then((res) => {
        res.present();
		  
    	    let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						    'Accept': 'application/json'};

    let postData = `uid=${this.uid}&oid=${this.oid}`;

    this.http.post<any>(this.storageService.baseUrl+"api/order_details", postData, {headers})
      .subscribe(data =>
	  {

		if(data.success==1)
		{
		//this.walletdata=data.data;
		res.dismiss();
		 res.onDidDismiss().then((dis) => {
			
			this.order_number=data.data.result.order_number;
			this.txn_no=data.data.result.txn_id;
			this.order_status=data.data.result.order_status;
			this.payment_status=data.data.result.payment_status;
			this.payment_method=data.data.result.payment_name;
			this.mobile_number=data.data.user_info.mobile_number;
			this.tracking_number=data.data.result.tracking_number;
			this.shipping_carrier=data.data.result.shipping_carrier;
	
		
			
		 });
			
		
      
		}
		else {
			if(data.msg=='nodata')
			{
				res.dismiss();
				  res.onDidDismiss().then((dis) => {
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
		
		
	}
	else
	{
		this.storageService.presentToast(this.translate.instant("account.please_login"),3000);	
		
		
		this.navCtrl.navigateForward('/tabs/tab4');
		
	}
	});

	
  }
  
  ngOnInit() {}
  


}