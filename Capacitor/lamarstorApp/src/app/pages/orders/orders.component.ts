/**
 * Order Screen
 * @author    ThemesBuckets <themesbuckets@gmail.com>
 * @copyright Copyright (c) 2020
 * @license   AppsPlaces
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {

  // Slider Options
  slideOpts = {
    initialSlide: 0,
    autoplay: true,
  };

  // Order Options
  options: any = [{
    title: 'Delivered',
    isSelected: true
  }, {
    title: 'Processing',
    isSelected: false
  }, {
    title: 'Cancelled',
    isSelected: false
  }];

  // Orders Sample Data
  orders: any = [{
    orderId: '#NPOK8T',
    date: '15/11/2020',
    trackingNumber: 'AQWNQWEIC',
    quantity: 2,
    totalPrice: 100
  }, {
    orderId: '#NPORK8T',
    date: '20/11/2020',
    trackingNumber: 'WNQWEIC',
    quantity: 2,
    totalPrice: 500
  }, {
    orderId: '#NPOKYY8T',
    date: '05/11/2020',
    trackingNumber: 'MWNQWEIC',
    quantity: 4,
    totalPrice: 300
  }];

  constructor() { }

  ngOnInit() { }

  // Change Order Option Function
  changeOption(option, index) {
    for (let i = 0; i < this.options.length; i++) {
      this.options[i].isSelected = false;
    }

    this.options[index].isSelected = true;
  }
}
