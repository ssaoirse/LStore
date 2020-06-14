import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

import { TranslateConfigService } from '../../services/translate-config.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private menuController: MenuController,private translateConfigService: TranslateConfigService) {
    this.translateConfigService.getDefaultLanguage();
    
    this.menuController.enable(true); // Enable side menu
  }

}
