import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { Observable } from 'rxjs';
import { TranslateConfigService } from '../../services/translate-config.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  pid:any;
  categories: Observable<any>;
  constructor(private categoryService: CategoryService,public storageService: StorageService,public http:HttpClient,private router: Router,private translateConfigService: TranslateConfigService) {

    this.translateConfigService.getDefaultLanguage();

  }

  ngOnInit() {
   	this.categories = this.categoryService.categoryHome(); 

  }
  goToProduct(id:number,subcat:any){
	if(subcat)
	{	
		this.storageService.setParentCat(id);
		this.router.navigateByUrl('/tabs/categories');  
	}
	else
	{   
		this.router.navigateByUrl('/tabs/product-category/'+id);  
	}
  }
  
   seeAllCat()
  {
	  
	this.storageService.setParentCat(0);  
	this.router.navigateByUrl('/tabs/categories');  
  }

  // getCategories() {
  //   this.categories = this.categoryService.categoryList();
  // }

}
