import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[];

  constructor(public storageService: StorageService, public http: HttpClient) { }

  categoryHome(): Observable<any> {

    let body = `limit=2`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_category', body, { headers }).pipe(map(categories => categories.category_detail))

  }
  categoryList(id:any): Observable<any> {

    let body = `cat=${id}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/get_category', body, { headers }).pipe(map(categories => categories.category_detail))

  }

  // categoryList() {

    


  //   // this.categories = [
  //   //   {
  //   //     id: 1,
  //   //     name: "Women",
  //   //     image: "assets/images/category/women-fashion.jpg"
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     name: "Men",
  //   //     image: "assets/images/category/men-fashion.jpg"
  //   //   },
  //   //   {
  //   //     id: 3,
  //   //     name: "Bags",
  //   //     image: "assets/images/category/luggage.jpg"
  //   //   },
  //   //   {
  //   //     id: 4,
  //   //     name: "Watches",
  //   //     image: "assets/images/category/watches.jpg"
  //   //   },
  //   //   {
  //   //     id: 5,
  //   //     name: "Jewelry",
  //   //     image: "assets/images/category/jewelry.jpg"
  //   //   },
  //   //   {
  //   //     id: 6,
  //   //     name: "Shoes",
  //   //     image: "assets/images/category/shoes.jpg"
  //   //   },
  //   //   {
  //   //     id: 7,
  //   //     name: "Computer",
  //   //     image: "assets/images/category/computer.jpg"
  //   //   },
  //   //   {
  //   //     id: 8,
  //   //     name: "Electronics",
  //   //     image: "assets/images/category/electronics.jpg"
  //   //   },
  //   //   {
  //   //     id: 9,
  //   //     name: "Home",
  //   //     image: "assets/images/category/home.jpg"
  //   //   },
  //   //   {
  //   //     id: 10,
  //   //     name: "Baby Store",
  //   //     image: "assets/images/category/baby.jpg"
  //   //   }
  //   // ];

  //   // return this.categories;
  // }

}
