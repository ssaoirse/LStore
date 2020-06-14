import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor() { }

  getNotifications() {
    return [
      {
        title: "Contrary to popular belief",
        message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        date: "15/20",
        status: false,
      },
      {
        title: "Contrary to popular belief",
        message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        date: "15/20",
        status: false
      },
      {
        title: "Contrary to popular belief",
        message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        date: "15/20",
        status: true
      },
      {
        title: "Contrary to popular belief",
        message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        date: "15/20",
        status: true
      },
      {
        title: "Contrary to popular belief",
        message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        date: "15/20",
        status: true
      },
      {
        title: "Contrary to popular belief",
        message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        date: "15/20",
        status: true
      },
      {
        title: "Contrary to popular belief",
        message: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        date: "15/20",
        status: true
      }
    ]
  }
}
