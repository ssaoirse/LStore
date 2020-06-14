import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController} from '@ionic/angular';
import { StorageService } from '../../../services/storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from '../../../services/translate-config.service';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})



export class ChangepasswordComponent implements OnInit {
 uid:any;
 old_password:any;
 new_password:any;
 new_password_conf:any;

  
  
  constructor(public storageService:StorageService,public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,public formBuilder:FormBuilder,private translate:TranslateService,private translateConfigService: TranslateConfigService) { 
    this.storageService.getUserData().then(result=>{
      this.uid = result.id;
	});  
	this.translateConfigService.getDefaultLanguage();
	
  }
  
  ngOnInit() {}
  
  async changepassword()
  {
	if(this.old_password)
	{
		if(this.new_password && this.new_password_conf)
		{
			if(this.new_password==this.new_password_conf)
			{
				  this.loadingCtrl.create({
					message: this.translate.instant("account.loading"),       
				  }).then((res) => {
					res.present();
					let body = `uid=${this.uid}&opass=${this.old_password}&npass=${this.new_password}&cnpass=${this.new_password_conf}`;
					  let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
					  this.http.post<any>(this.storageService.baseUrl+'api/change_password', body, {headers} ).subscribe(data => {
						if(data.success==1){
						   res.dismiss();
						   res.onDidDismiss().then((dis) => {
							 this.navCtrl.navigateForward('/tabs/tab1');
						  });
						}
						else{
								if(data.msg=='pass_mismatch')	
								{
									res.dismiss();
									res.onDidDismiss().then((dis) => {
									  this.storageService.presentToast(this.translate.instant("account.pass_mismatch"),3000);
								 });	
								}
								else if(data.msg=='wrong_current_pass')
								{
								res.dismiss();
									res.onDidDismiss().then((dis) => {
									  this.storageService.presentToast(this.translate.instant("account.wrong_pass"),3000);
								 });	
									
								}
								else
								{
								  res.dismiss();
									res.onDidDismiss().then((dis) => {
									  this.storageService.presentToast(this.translate.instant("account.all_details"),3000);
								 });
								}
						 
						}
						
					  
					})
			   
				   
				  });	
			}
			else{
				this.storageService.presentToast(this.translate.instant("account.pass_dont_match"),3000);
			}
	  
		}
		else
		{
			this.storageService.presentToast(this.translate.instant("account.enter_new_pass"),3000);
		}

  }
  
  else
  {
	  this.storageService.presentToast(this.translate.instant("account.enter_current_pass"),3000); 
	  
  }
}

}