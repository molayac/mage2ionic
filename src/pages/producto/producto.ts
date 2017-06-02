import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { InicioPage } from './../inicio/inicio';
// import { AyudaPage } from './../ayuda/ayuda';
// import { ContactoPage } from './../contacto/contacto';
import { CarritoPage } from './../carrito/carrito';
// import { CuentaPage } from './../cuenta/cuenta';
// import { ProductosPage } from './../productos/productos';
/**
 * Generated class for the ProductoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  public cartPage:any = CarritoPage;
  public homePage:any = InicioPage;

  public product:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = this.navParams.data;
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ProductoPage');
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

  goToHome() {
    this.navCtrl.setRoot(InicioPage);
  }

}
