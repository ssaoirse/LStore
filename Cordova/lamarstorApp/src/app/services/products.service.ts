import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  userDetails: any;
  userId="";

  constructor(public storageService: StorageService,public http:HttpClient) { 


    this.storageService.getStorage('userDetails').then((userData)=>{
      this.userDetails = userData;
      if(this.userDetails!=null){
        this.userId = this.userDetails.id;
      }
    })
  }

  // productList() {

 
  //   let body = `limit=2`;
  //   let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  //   this.http.post<any>(this.storageService.baseUrl+'api/get_feature', body, {headers} ).subscribe(data => {
  //    //console.log(data.feature_detail.records);
  //  this.products = data.feature_detail.records;
  //  console.log(this.products);
  //   return this.products;
  // })
  // }
//&product=All
  featuredProduct(id:string): Observable<any> {

    let body = `category_id=&product=&user_id=${id}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_feature', body, { headers }).pipe(map(result => result.feature_detail.records))

  }
  getAllProduct(id:string): Observable<any> {

    let body = `category_id=&product=All&user_id=${id}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_feature', body, { headers }).pipe(map(result => result.feature_detail.records))

  }
  
  
  getAllWishList(): Observable<any> {

    let body = `user_id=${this.userDetails.id}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_wishlist', body, { headers }).pipe(map(result => result.wishlist_details.records))

  }

  getCategoryProduct(category_id:string): Observable<any> {

    let body = `category_id=${category_id}&product=All&user_id=${this.userId}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_feature', body, { headers }).pipe(map(result => result.feature_detail.records))

  }

  wishlistUpdate(status:number,id:number,color_id): Observable<any> {

    let body = `product_id=${id}&status=${status}&user_id=${this.userDetails.id}&color_id=${color_id}&size_id=`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/add_wishlist', body, { headers }).pipe(map(result => result))

  }

  getCurrency(): Observable<any> {

    let body = ``;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_currency', body, { headers }).pipe(map(result => result))

  }

}
