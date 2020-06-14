import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  name:any;
  email:any;
  languageDetails:any;
  constructor(public storageService:StorageService) { 

    this.storageService.getUserData().then(result=>{
      //this.userData = result;
      //console.log(result);
      this.name = result.name;
      this.email = result.email;
      this.languageDetails = result.language_detail;
      console.log(this.languageDetails);
    });
    
  }
   
  ngOnInit() {}

}
