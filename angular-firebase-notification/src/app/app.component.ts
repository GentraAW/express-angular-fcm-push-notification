import { Component, OnInit } from '@angular/core';
import { environment } from '../environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: { 'data-app-root': 'true' },
})
export class AppComponent implements OnInit {
  title = 'Angular Firebase Notification';
  message: any = null;

  constructor() {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.requestPermission();
      this.listen();
    }
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
          console.log('Notification Token: ', currentToken);
        } else {
          console.log('No token available. Generate Token first!');
        }
      })
      .catch((err) => {
        console.log('An error occurred while generating token. ', err);
      });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }
}
