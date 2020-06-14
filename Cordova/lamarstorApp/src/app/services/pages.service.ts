import { Injectable } from '@angular/core';
import { TranslateConfigService } from '../services/translate-config.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private translateConfigService: TranslateConfigService,public translateService:TranslateService) { 
     this.translateConfigService.getDefaultLanguage();
  
   }

  getPages() {
    return [
      {
        title: 'menu.home',
        url: '/tabs/tab1',
        icon: 'home'
      },
      {
        title: 'menu.shop',
        url: '/tabs/products',
        icon: 'basket'
      },
      {
        title: 'menu.best_seller',
        url: '/tabs/tab2',
        icon: 'gift'
      },
      {
        title: 'menu.wishlist1',
        url: '/tabs/tab3',
        icon: 'heart'
      },
      // {
      //   title: 'Notification',
      //   url: '/tabs/tab4',
      //   icon: 'notifications'
      // },
      {
        title: 'menu.categories',
        url: '/tabs/categories',
        icon: 'grid'
      },
      {
        title: 'menu.orders1',
        url: '/tabs/orders',
        icon: 'checkmark-circle-outline'
      },
      {
        title: 'menu.contact_us',
        url: '/contact-us',
        icon: 'call'
      },
      {
        title: 'menu.about_us',
        url: '/about-us',
        icon: 'information-circle'
      },
      {
        title: 'menu.terms_condition',
        url: '/terms-and-condition',
        icon: 'create'
      }
    ];
  }
}
