import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environment';
import { initializeApp, getApps } from 'firebase/app';
initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    if (typeof window !== 'undefined') {
      import('firebase/app').then((firebase) => {
        if (!firebase.getApps().length) {
          firebase.initializeApp(environment.firebase);
        }
      });
    }
  }
}
