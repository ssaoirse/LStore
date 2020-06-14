import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(public storageService: StorageService, public http: HttpClient) { 
    

  }

  getDeals(id:string): Observable<any> {

    let body = `user_id=${id}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/best_seller', body, { headers }).pipe(map(result => result.seller_detail.records))

  }

  getDealsAll(id:string): Observable<any> {

    let body = `limit=6&user_id=${id}`;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/best_seller', body, { headers }).pipe(map(result => result.seller_detail.records))

  }
}
