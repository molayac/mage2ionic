import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InicioPage } from './../inicio/inicio';
import { AyudaPage } from './../ayuda/ayuda';
import { ContactoPage } from './../contacto/contacto';
import { CarritoPage } from './../carrito/carrito';
import { ProductosPage } from './../productos/productos';
/**
 * Generated class for the CuentaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cuenta',
  templateUrl: 'cuenta.html',
})
export class CuentaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentaPage');
  }

goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }
  
}
