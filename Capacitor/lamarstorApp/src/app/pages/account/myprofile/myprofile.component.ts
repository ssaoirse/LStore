import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController, ModalController} from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';


import { TranslateConfigService } from '../../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
})



export class MyprofileComponent implements OnInit {
	uid:any;
    rows:any;
	first_name:any;
	last_name:any;
	email:any;
	mobile_number:any;
	address:any;
	address_2:any;
	city:any;
	state:any;
	country:any;
	pincode:any;
	country_data:any;
	state_data:any;
	ionicForm:any;
  
  
  constructor(public storageService:StorageService,public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,private translateConfigService: TranslateConfigService,private translate:TranslateService,public modalController:ModalController) { 

	this.translateConfigService.getDefaultLanguage();

    this.storageService.getUserData().then(result=>{
      this.uid = result.id;
	  
	  
	  this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),       
      }).then((res) => {
        res.present();
		  
    	    let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						    'Accept': 'application/json'};

    let postData = `uid=${this.uid}`;

    this.http.post<any>(this.storageService.baseUrl+"api/get_profile", postData, {headers})
      .subscribe(data =>
	  {

		if(data.success==1)
		{
		//this.walletdata=data.data;
		res.dismiss();
		 res.onDidDismiss().then((dis) => {
			this.rows=data.details;
			this.state_data=data.states;
			this.country_data=data.countries;
			this.first_name=data.details.frist_name;
			this.last_name=data.details.last_name;
			this.mobile_number=data.details.mobile_number;
			this.address=data.details.address;
			this.address_2=data.details.address_two;
			this.city=data.details.city;
			this.pincode=data.details.zip;
			this.state=data.details.state;
			this.country=data.details.country;
			this.email=data.details.email;
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
	});

	
  }
  
  ngOnInit() {}
  
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    })
  }
 
  async update_details()
  {
	if(this.first_name && this.last_name)
	{
		if(this.mobile_number && this.email)
		{
			if(this.address && this.state && this.city && this.pincode && this.country)
			{
	 this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),       
      }).then((res) => {
        res.present();
		  
    	    let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						    'Accept': 'application/json'};

			let postData = `uid=${this.uid}&frist_name=${this.first_name}&last_name=${this.last_name}&email=${this.email}&mobile_number=${this.mobile_number}&address_two=${this.address_2}&address=${this.address}&city=${this.city}&state=${this.state}&zip=${this.pincode}&country=${this.country}`;
		
			
			    this.http.post<any>(this.storageService.baseUrl+"api/update_profile", postData, {headers})
      .subscribe(data =>
	  {
		if(data.success==1)
		{
		//this.walletdata=data.data;
		res.dismiss();
		 res.onDidDismiss().then((dis) => {
			this.storageService.presentToast(this.translate.instant("account.updat_success"),3000);
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
			else{
			this.storageService.presentToast(this.translate.instant("account.complete_address"),3000);	
			}
		}
		
		else{
		this.storageService.presentToast(this.translate.instant("account.enter_mail_phone"),3000);
		}		
			
	}
else{
	this.storageService.presentToast(this.translate.instant("account.enter_f_l_name"),3000);
  }

}

async update_states()
{

	this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),       
      }).then((res) => {
        res.present();
		  
    	    let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						    'Accept': 'application/json'};

			let postData = `country_id=${this.country}`;
		
			
			    this.http.post<any>(this.storageService.baseUrl+"api/state_list_by_id", postData, {headers})
      .subscribe(data =>
	  {
		if(data.status==true)
		{
		//this.walletdata=data.data;
		res.dismiss();
		 res.onDidDismiss().then((dis) => {
		this.state_data=data.state_list;
			//console.log(data.state_list);
			//this.navCtrl.navigateBack('/myaddresses');	
		 });
		 
      
		}
		else {
			if(data.msg=='nodata')
			{
				res.dismiss();
				  res.onDidDismiss().then((dis) => {
				//this.storageService.presentToast(this.translate.instant("account.no_data"),3000);
				  });
				
			}
			else 
			{
				res.dismiss();
				  res.onDidDismiss().then((dis) => {
			//	this.storageService.presentToast(this.translate.instant("account.unauthorised"),3000);
				  });
			}
			
			
		}
		
		
		
       }, error => {
		   res.dismiss();
        console.log(error);
      });
	
	  });
	
}

}