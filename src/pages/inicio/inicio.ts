import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosPage } from './../productos/productos';
import { AyudaPage } from './../ayuda/ayuda';
import { ContactoPage } from './../contacto/contacto';
import { CarritoPage } from './../carrito/carrito';
import { CuentaPage } from './../cuenta/cuenta';

/**
 * Generated class for the InicioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  cartPage : any = CarritoPage;
  catalogPage : any = ProductosPage;

  public categories : Array<{
    title: string,
    counter: any,
    description: string,
    icon: string,
    imagen: string
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.categories = [
      { title:"Ofertas", counter: 100, description: "Las mejores ofertas!", icon: "star", imagen:"./assets/images/ofertas.png" },
      { title:"Alimentos", counter: 400, description: "Todo en alimentos!", icon: "basket", imagen:"./assets/images/alimentos.png" },
      { title:"Aseo Hogar", counter: 320, description: "Productos para el hogar!", icon: "home", imagen:"./assets/images/aseohogar.jpg" },
      { title:"Ofertas", counter: 50, description: "Productos para la familia!", icon: "body", imagen:"./assets/images/cuidadopersonal.jpg" }
    ]
  }

  ionViewDidLoad() {
    console.log('Inicio pagina inicial');
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }


}
