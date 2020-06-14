import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController,AlertController,ModalController } from '@ionic/angular';
import { StorageService } from '../../../../services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateConfigService } from '../../../../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';
import { AddaddressComponent } from '../add/addaddress.component';
import { EditaddressComponent } from '../edit/editaddress.component';

@Component({
  selector: 'app-myaddresses',
  templateUrl: './myaddresses.component.html',
  styleUrls: ['./myaddresses.component.scss'],
})



export class MyaddressesComponent implements OnInit {
 uid:any;
 rows:any;
 chkAddress= false;
  
    
  
  constructor(public storageService:StorageService,public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,public formBuilder:FormBuilder,public alertController:AlertController,private translate:TranslateService,private translateConfigService: TranslateConfigService,public modalController: ModalController) { 

	this.translateConfigService.getDefaultLanguage();
	this.getAddressList();
  }

getAddressList(){
	
    this.storageService.getUserData().then(result=>{
		this.uid = result.id;
		
		
		this.loadingCtrl.create({
		  message: this.translate.instant("account.loading"),       
		}).then((res) => {
		  res.present();
		  
			  let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						  'Accept': 'application/json'};
  
	  let postData = `uid=${this.uid}`;
  
	  this.http.post<any>(this.storageService.baseUrl+"api/list_shipping_address", postData, {headers})
		.subscribe(data =>
		{
			
		  if(data.success==1)
		  {
			this.chkAddress= false;
		  //this.walletdata=data.data;
			  res.dismiss();
			  res.onDidDismiss().then((dis) => {
			  this.rows=data.addresses_detail.records;
			 
			  });
		  
		
		  }
		  else {
			  if(data.msg=='nodata')
			  {
				  res.dismiss();
			  res.onDidDismiss().then((dis) => {
				  this.chkAddress= true;
				  //this.storageService.presentToast(this.translate.instant("account.no_data"),3000);
			  });
				  
			  }
			  else 
			  {
				  res.dismiss();
				  res.onDidDismiss().then((dis) => {
					  this.chkAddress= true;
				  //this.storageService.presentToast(this.translate.instant("account.unauthorised"),3000);
				  });
			  }
			  
			  
		  }
		  
		  
		  
		 }, error => {
		  console.log(error);
		});
	 });
	  
	  });	
}

 async addAddress(){
	
    const modal = await this.modalController.create({
		component: AddaddressComponent
	  });
	  modal.onDidDismiss()
		.then((data) => {
			this.getAddressList();
  
  
		});
	  await modal.present();
  }
  
  ngOnInit() {}
  
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      header: this.translate.instant("account.addr_del_msg_1"),
      message: this.translate.instant("account.addr_del_msg_2"),
      buttons: [
        {
          text: this.translate.instant("account.cancel"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: this.translate.instant("account.addr_del_msg_3"),
          handler: () => {
            //console.log('Confirm Okay'+id);
			this.deleteShippingAddress(id,this.uid);
          }
        }
      ]
    });

    await alert.present();
  }
  
  
   deleteShippingAddress(sid,uid)
  {
	
   	    let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json'};

    let postData = 'uid='+uid+'&sid='+sid;

    this.http.post<any>(this.storageService.baseUrl+"api/delete_address", postData, {headers})
      .subscribe(data =>
	  {
		this.rows = data.result.records;
		if(data.result.total_records==0){
			this.chkAddress=true;
		}else{
			this.chkAddress=false;
			
		}
		
		console.log(data);
		if(data.success==1)
		{
			
		// this.navCtrl.navigateBack('/myaddresses');
		// this.navCtrl.navigateForward('/myaddresses');
      
		}
		else {
			if(data.msg=='nodata')
			{
			
				this.storageService.presentToast(this.translate.instant("account.error_occur"),3000);
				
			}
			else 
			{
				this.storageService.presentToast(this.translate.instant("account.unauthorised"),3000);
			}
			
			
		}
		
		
		
       }, error => {
        console.log(error);
      });	
	  
	  
  }
  
  
  
  async edit(id)
  {
	 
	const modal = await this.modalController.create({
		component: EditaddressComponent,
		componentProps: {address_id:id}

	  });
	  modal.onDidDismiss()
		.then((data) => {
			this.getAddressList();
  
  
		});
	  await modal.present();


	// if(this.uid)
	// {



		//this.storageService.setOrderId(id);
	    //this.navCtrl.navigateForward('/orderdetails');
		//this.navCtrl.navigateForward('/editaddress');
	// }		
	  
	  
  }
  async makeDefault(sid)
  {
	
   	    let headers = { 'Content-Type': 'application/x-www-form-urlencoded',
						'Accept': 'application/json'};

    let postData = 'uid='+this.uid+'&sid='+sid;

    this.http.post<any>(this.storageService.baseUrl+"api/make_default_address", postData, {headers})
      .subscribe(data =>
	  {

		if(data.success==1)
		{
		this.storageService.presentToast("Success",3000);
		this.navCtrl.navigateBack('/myaddresses');
		this.navCtrl.navigateForward('/myaddresses');
      
		}
		else {
			if(data.msg=='nodata')
			{
			
				this.storageService.presentToast(this.translate.instant("account.error_occur"),3000);
				
			}
			else 
			{
				this.storageService.presentToast(this.translate.instant("account.unauthorised"),3000);
			}
			
			
		}
		
		
		
       }, error => {
        console.log(error);
      });	
	  
	  
  }

}