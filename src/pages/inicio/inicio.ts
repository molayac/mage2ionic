import { Magento2ServiceProvider } from './../../providers/magento2-service/magento2-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductosPage } from './../productos/productos';
// import { ContactoPage } from './../contacto/contacto';
import { CarritoPage } from './../carrito/carrito';
// import { CuentaPage } from './../cuenta/cuenta';
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
  providers: [ Magento2ServiceProvider ]
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public mgService: Magento2ServiceProvider) {
    this.categories = [];
    //   { title:"Ofertas", counter: 100, description: "Las mejores ofertas!", icon: "star", imagen:"./assets/images/ofertas.png" },
    //   { title:"Alimentos", counter: 400, description: "Todo en alimentos!", icon: "basket", imagen:"./assets/images/alimentos.png" },
    //   { title:"Aseo Hogar", counter: 320, description: "Productos para el hogar!", icon: "home", imagen:"./assets/images/aseohogar.jpg" },
    //   { title:"Ofertas", counter: 50, description: "Productos para la familia!", icon: "body", imagen:"./assets/images/cuidadopersonal.jpg" }
    // ]
    
  }

  ionViewDidLoad() {
    this.mgService.getCategories()
    .subscribe(categories => {
      var ofertas = categories.children_data[0].children_data[0];
      ofertas.description= "Las mejores ofertas!";
      ofertas.icon = "star";
      ofertas.imagen = "./assets/images/ofertas.png";
      var alimentos =  categories.children_data[0].children_data[1];
      alimentos.description= "Todo en alimentos!";
      alimentos.icon = "basket";
      alimentos.imagen = "./assets/images/alimentos.png";
      var aseo =  categories.children_data[0].children_data[2];
      aseo.description = "Productos para el hogar!";
      aseo.icon="home";
      aseo.imagen="./assets/images/aseohogar.jpg";
      var cuidado =  categories.children_data[0].children_data[3];
      cuidado.description="Productos para la familia!";
      cuidado.icon= "body";
      cuidado.imagen="./assets/images/cuidadopersonal.jpg";
      this.categories.push(ofertas);
      this.categories.push(alimentos);
      this.categories.push(aseo);
      this.categories.push(cuidado);
  });
  console.log('Inicio pagina inicial');
  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }


}
