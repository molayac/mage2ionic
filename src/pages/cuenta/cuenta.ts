import { Magento2ServiceProvider } from './../../providers/magento2-service/magento2-service';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
  public cartPage: any = CarritoPage;
  public homePage: any = InicioPage;
  public loginPage: any = LoginPage;
  public customer: any;
  public loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public mgService: Magento2ServiceProvider, public loadingCtrl: LoadingController) {
    this.customer = {};
     this.loading = this.loadingCtrl.create({
      content: "Estamos cargando la información...",
      spinner: "circles"
    });
  }

  ionViewDidLoad() {
    this.loading.present();
    this.mgService.customerInfoService()
      .subscribe(
        data => { 
          console.log("SUCCESS", data, JSON.stringify(data)); 
          this.customer=data;
          this.loading.dismiss();
        }, 
        err => {
        console.log("Error", err, JSON.stringify(err));
        this.loading.dismiss();
      });
    console.log('ionViewDidLoad CuentaPage');
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

}
