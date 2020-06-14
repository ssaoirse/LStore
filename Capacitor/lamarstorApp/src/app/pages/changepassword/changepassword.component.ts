import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController,LoadingController,NavController} from '@ionic/angular';
import { StorageService } from '../../services/storage.service';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
})



export class ChangepasswordComponent implements OnInit {
  email:any;
 //old_password:any;
 //new_password:any;
 //new_password_conf:any;

  
  
  constructor(public storageService:StorageService,public http:HttpClient,private toastCtrl: ToastController,public loadingCtrl: LoadingController,public navCtrl: NavController,private storage: Storage,public formBuilder:FormBuilder) { 
    this.storageService.getUserData().then(result=>{
      this.email = result.email;
    });  
	
  }
  
   get old_password() {
    return this.change_pass.get("old_password");
  }
  get new_password() {
    return this.change_pass.get('new_password');
  }
  get new_password_conf() {
    return this.change_pass.get('new_password_conf');
  }
 
   
  change_pass= this.formBuilder.group({
    old_password: [
      '',
      [
        Validators.required,
        Validators.pattern('^\S+\w{6,32}\S{1,}')
      ]
    ],
	    new_password: [
      '',
      [
        Validators.required,
        Validators.pattern('^\S+\w{6,32}\S{1,}')
      ]
    ],
	
	    new_password_conf: [
      '',
      [
        Validators.required,
        Validators.pattern('^\S+\w{6,32}\S{1,}'),
		this.isPassMatch.bind(this),
		
      ]
    ],
  });
  
 public errorMessages = {
    old_password: [
      { type: 'required', message: 'Current Password is required' },
      { type: 'pattern', message: 'Password must be between (6-32) chars and should not contain special characters' }
    ],
    new_password: [
      { type: 'required', message: 'Enter new password' },
      { type: 'pattern', message: 'Password must be between (6-32) chars and should not contain special characters' }
    ],
    new_password_conf: [
      { type: 'required', message: 'Enter Confirm password' },
      { type: 'pattern', message: 'Confirm Password must be between (6-32) chars and should not contain special characters' }
    ]
  };
  

  



  ngOnInit() {}
  
   isPassMatch(FormControl){

        if(this.new_password.value===this.new_password_conf.value){
            return {
                "matched": true
            };
        }
		else{
			return {
                "diff": true
            };
			
		}
        return null;
    }
  
  
  changepassword()
  {
	

      this.loadingCtrl.create({
        message: 'Loading...',       
      }).then((res) => {
        res.present();
        let body = 'email=${this.email}&opass=${this.old_password}&npass=${this.new_password}&cnpass=${this.new_password_conf}';
          let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
          this.http.post<any>(this.storageService.baseUrl+'api/change_password', body, {headers} ).subscribe(data => {
            if(data.status==true){
               
               res.dismiss();
               res.onDidDismiss().then((dis) => {
                 this.navCtrl.navigateForward('/tabs/tab1');
              });
            }else{
              res.dismiss();
                res.onDidDismiss().then((dis) => {
                  this.storageService.presentToast("Please fill all the details",3000);
             });
             
            }
            
          
        })
   
       
      });	


  }
}