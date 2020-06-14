import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController,ModalController} from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { TranslateConfigService } from '../../../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-editaddress',
  templateUrl: './editaddress.component.html',
  styleUrls: ['./editaddress.component.scss'],
})



export class EditaddressComponent implements OnInit {

	@Input() address_id: number;

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
	instruction:any;
	type:any;
	country_data:any;
	state_data:any;
	ionicForm:any;
	sid:any;
  
  
 constructor(public storageService:StorageService,public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,public formBuilder:FormBuilder,private translate:TranslateService,private translateConfigService: TranslateConfigService,public modalCtrl: ModalController) { 

	this.translateConfigService.getDefaultLanguage();

	  this.storageService.getUserData().then(result=>{
      this.uid = result.id;
	  this.type=0;
	  	 this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),       
      }).then((res) => {
        res.present()	;
		  
    	    let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						    'Accept': 'application/json'};

			let postData = `sid=${this.address_id}`;
		
			
			    this.http.post<any>(this.storageService.baseUrl+"api/get_address_by_id", postData, {headers})
      .subscribe(data =>
	  {
		if(data.success==1)
		{
		//this.walletdata=data.data;
		res.dismiss();
		 res.onDidDismiss().then((dis) => {
			 
			
			 this.state_data=data.states;
			 this.country_data=data.countries;
			 this.first_name=data.details.shipping_frist_name;
			 this.last_name=data.details.shipping_last_name;
			 this.mobile_number=data.details.shipping_mobile_number;
			 this.address=data.details.shipping_address;
			 this.address_2=data.details.shipping_address_two;
			 this.city=data.details.shipping_city;
			 this.state=data.details.shipping_state;
			 this.country=data.details.shipping_country;
			 this.pincode=data.details.shipping_zip;
			 this.instruction=data.details.shipping_country;;
			 this.type=data.details.sp_delivery_instruction;
			 
		 });
      
		}
		else {
			
				res.dismiss();
				res.onDidDismiss().then((dis) => {
				this.storageService.presentToast(this.translate.instant("account.no_data"),3000);
			});	
		}
		
		
		
       }, error => {
		   res.dismiss();
        console.log(error);
      });
	
	  });
	  
	});

	
  }
  
  ngOnInit() {}
  
  closeModal(){
	this.modalCtrl.dismiss();
  }
 
  async update_details()
  {
	if(this.first_name && this.last_name)
	{
		if(this.mobile_number)
		{
			if(this.address && this.state && this.city && this.pincode && this.country)
			{
	 this.loadingCtrl.create({
        message: this.translate.instant("account.loading"),       
      }).then((res) => {
        res.present();
		  
    	    let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						    'Accept': 'application/json'};

			let postData = `uid=${this.uid}&sid=${this.address_id}&frist_name=${this.first_name}&last_name=${this.last_name}&mobile_number=${this.mobile_number}&address_two=${this.address_2}&address=${this.address}&city=${this.city}&state=${this.state}&zip=${this.pincode}&country=${this.country}&type=${this.type}&instruction=${this.instruction}`;
		
			
			    this.http.post<any>(this.storageService.baseUrl+"api/update_shipping", postData, {headers})
      .subscribe(data =>
	  {
		if(data.success==1)
		{
		//this.walletdata=data.data;
		res.dismiss();
		 res.onDidDismiss().then((dis) => {
			this.storageService.presentToast(this.translate.instant("account.address_update_success"),3000);
			this.modalCtrl.dismiss();
			// this.navCtrl.navigateBack('/myaddresses');
			// this.navCtrl.navigateForward('/myaddresses');			
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
		this.storageService.presentToast(this.translate.instant("account.enter_mobile"),3000);
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

}