import { Magento2ServiceProvider } from './../../providers/magento2-service/magento2-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


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
  cartPage: any = CarritoPage;
  productPage: any = ProductoPage;
  public products: any;
  public catalog: any;
  public loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mgService: Magento2ServiceProvider, public loadingCtrl: LoadingController) {
    this.catalog = this.navParams.data;
    this.products = [];
    this.loading = this.loadingCtrl.create({
      content: "Estamos cargando la información...",
      spinner: "circles"
    });
  }

  ionViewDidLoad() {
    let productsHistory = this.mgService.getMg2Products()
    let index = 0;
    let load = true;
    if(productsHistory.length > 0){
      index = productsHistory.findIndex((data)=>{ if(data.catalog == this.catalog.id){return true}}); 
      console.log("LOG PRODUCTS: ", index, "PRODUCTS", JSON.stringify(productsHistory));
      if(index >= 0){
        load = false;
        this.products = productsHistory[index].products;
        console.log("PRODUCTS", this.products);
      }
    }
    if(load){
      this.loading.present();
      this.mgService.getProductsByCategoryId(this.catalog.id).subscribe(data => {
        this.products = data.items;
        this.mgService.setMg2Products(this.catalog.id, this.products);
        this.loading.dismiss();
      });
    }
    console.log('ionViewDidLoad ProductosPage');
  }

}
