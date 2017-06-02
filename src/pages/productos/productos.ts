import { Magento2ServiceProvider } from './../../providers/magento2-service/magento2-service';
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
  public products :any;
  public catalog : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public mgService: Magento2ServiceProvider) {
    this.catalog = this.navParams.data;
    this.products = [];
  }

  ionViewDidLoad() {
    this.mgService.getProductsByCategoryId(this.catalog.id).subscribe(data =>{
      console.log(JSON.stringify(data));
      this.products = data.items;
    });
    console.log('ionViewDidLoad ProductosPage');
  }

}
