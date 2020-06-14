import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(public storageService: StorageService, public http: HttpClient) { }
  
  getBanner(): Observable<any> {

    let body = ``;
    let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    return this.http.post<any>(this.storageService.baseUrl + 'api/home_slider', body, { headers }).pipe(map(result => result.home_slider))

  }
}
