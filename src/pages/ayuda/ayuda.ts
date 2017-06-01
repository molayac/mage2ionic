import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InicioPage } from './../inicio/inicio';
import { CuentaPage } from './../cuenta/cuenta';
import { ContactoPage } from './../contacto/contacto';
import { CarritoPage } from './../carrito/carrito';
import { ProductosPage } from './../productos/productos';

/**
 * Generated class for the AyudaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AyudaPage');
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

}
