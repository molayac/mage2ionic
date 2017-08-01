import { TerminosPage } from './../pages/terminos/terminos';
import { RegistroPage } from './../pages/registro/registro';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { EmailComposer } from '@ionic-native/email-composer';

import { SurtyApp } from './app.component';
import { InicioPage } from '../pages/inicio/inicio';
import { AyudaPage } from './../pages/ayuda/ayuda';
import { ContactoPage } from './../pages/contacto/contacto';
import { CarritoPage } from './../pages/carrito/carrito';
import { CuentaPage } from './../pages/cuenta/cuenta';
import { ProductosPage } from './../pages/productos/productos';
import { ProductoPage } from './../pages/producto/producto';
import { Magento2ServiceProvider } from '../providers/magento2-service/magento2-service';

@NgModule({
  declarations: [
    SurtyApp,
    InicioPage,
    ContactoPage,
    AyudaPage,
    CuentaPage,
    ProductosPage,
    CarritoPage,
    ProductoPage,
    LoginPage,
    RegistroPage,
    TerminosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(SurtyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SurtyApp,
    InicioPage,
    ContactoPage,
    AyudaPage,
    CuentaPage,
    ProductosPage,
    CarritoPage,
    ProductoPage,
    LoginPage,
    RegistroPage,
    TerminosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Magento2ServiceProvider
  ]
})
export class AppModule { }
