import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InicioPage } from './../inicio/inicio';
import { AyudaPage } from './../ayuda/ayuda';
import { ContactoPage } from './../contacto/contacto';
import { CuentaPage } from './../cuenta/cuenta';
import { ProductosPage } from './../productos/productos';

/**
 * Generated class for the CarritoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarritoPage');
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

}
