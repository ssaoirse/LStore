import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchComponent } from '../../pages/search/search.component';
import { TranslateConfigService } from '../../services/translate-config.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit {

  constructor(private modalController: ModalController,private translateConfigService: TranslateConfigService) { 
    this.translateConfigService.getDefaultLanguage();
  }

  ngOnInit() { }

  async gotoSearchPage() {
    const modal = await this.modalController.create({
      component: SearchComponent
    });
    return await modal.present();
  }

}
