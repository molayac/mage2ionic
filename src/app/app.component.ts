import { ContactoPage } from './../pages/contacto/contacto';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { InicioPage } from '../pages/inicio/inicio';
import { AyudaPage } from '../pages/ayuda/ayuda';

@Component({
  templateUrl: 'app.html'
})
export class SurtyApp {
  @ViewChild("content") content: Nav;
  
  public rootPage: any;
  public pages: Array<{ title: string, component: any, icon: string }>;
  public contactPage: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.contactPage = ContactoPage;
    this.rootPage = InicioPage;
    this.pages = [
      { title: "Inicio", component: InicioPage, icon: "home" },
      { title: "Contáctenos", component: ContactoPage, icon: "mail" },
      { title: "Ayuda", component: AyudaPage, icon: "information-circle" }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToPage(page) {
    this.content.setRoot(page);
  }


}

