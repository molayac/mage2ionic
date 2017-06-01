import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { CarritoPage } from './../carrito/carrito';
import { ProductoPage } from './../producto/producto';


/**
 * Generated class for the ProductosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})

export class ProductosPage {
  cartPage : any = CarritoPage;
  productPage : any = ProductoPage;
  public catalog : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.catalog = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductosPage');
  }

}
