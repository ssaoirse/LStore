import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  

  constructor(public storageService: StorageService, public http: HttpClient) { }

  allCountries(): Observable<any> {

    let body = ``;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/country_list', body, { headers }).pipe(map(countries => countries.country_list))

  }

  allLanguage(): Observable<any> {

    let body = ``;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/language_list', body, { headers }).pipe(map(languageList => languageList.language_detail))

  }

  // addressById(userId): Observable<any> {

  //   let body = `user_id=${userId}`;
  //   let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  //   return this.http.post<any>(this.storageService.baseUrl + 'api/address_by_user_id', body, { headers }).pipe(map(address_list => address_list.records))

  // }
  

 

}
