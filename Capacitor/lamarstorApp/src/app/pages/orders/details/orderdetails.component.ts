import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController} from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

import { TranslateConfigService } from '../../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss'],
})



export class OrderdetailsComponent implements OnInit {
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
	email:any;
	mobile_number:any;
	created_date:any;
	name:any;
	state:any;
	country:any;
	city:any;
	address:any;
	zip:any;
	sign:any;
	product:any;
	color:any;
	quanitity:any
	unit_price:any;
	total:any;
	subtotal:any;
	salestax:any;
	shipping:any;
	discount:any;
	gtotal:any;
	shipping_mobile_number:any;
	shipping_name:any;
	shipping_state:any;
	shipping_country:any;
	shipping_city:any;
	shipping_address:any;
	shipping_zip:any;
	currency_symble:any;
	is_pickup_from_store:any;
  
  constructor(public storageService:StorageService,public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,public formBuilder:FormBuilder,private translateConfigService: TranslateConfigService,private translate:TranslateService) { 

	this.translateConfigService.getDefaultLanguage();
   
   this.storageService.getOrderId().then(result=>{
		this.oid = result;
		
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
			this.is_pickup_from_store=data.data.result.is_pickup_from_store;
			this.payment_status=data.data.result.payment_status;
			this.payment_method=data.data.result.payment_name;
			this.email=data.data.user_info.email;
			this.mobile_number=data.data.user_info.mobile_number;
			this.created_date=data.data.result.created_date;
			this.name=data.data.user_info.name;
			this.state=data.data.user_info.state_name;
			this.country=data.data.user_info.country_name;
			this.city=data.data.user_info.city;
		    this.address=data.data.user_info.address+' '+data.data.user_info.address_two;
			this.zip=data.data.user_info.zip;
			this.shipping_mobile_number=data.data.user_info.shipping_mobile_number;
		    this.shipping_name=data.data.user_info.shipping_frist_name+' '+data.data.user_info.shipping_last_name;
			this.shipping_state=data.data.user_info.shipping_state_name;
			this.shipping_country=data.data.user_info.shipping_country_name;
			this.shipping_city=data.data.user_info.shipping_city;
		    this.shipping_address=data.data.user_info.shipping_address+' '+data.data.user_info.shipping_address_two;
			this.shipping_zip=data.data.user_info.shipping_zip;
			this.order_results=data.data.order_results;
			this.subtotal=data.data.result.subtotal;
			this.salestax=data.data.result.tax_amount;
			this.shipping=data.data.result.shipping_amount;
			this.discount=data.data.result.discount;
			this.gtotal=data.data.result.grand_total;
			this.currency_symble=data.data.currency_symble;
			
			 
		
			   
			
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