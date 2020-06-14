import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  constructor(private translate: TranslateService,private storage: Storage) { }

  getDefaultLanguage(){
    // let language = this.translate.getBrowserLang();
    // this.translate.setDefaultLang(language);
    // return language;
    this.storage.get('session_lang').then(language=>{
      if(language!=null){        
        this.translate.setDefaultLang(language);
        return language;
      }else{
        this.translate.setDefaultLang('rem');
        return 'rem';
      }
    });
  }
 
  setLanguage(setLang) {
    this.storage.set('session_lang',setLang);
    this.translate.use(setLang);
  }
 
}
