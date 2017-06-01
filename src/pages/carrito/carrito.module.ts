import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoPage } from './carrito';

@NgModule({
  declarations: [
    CarritoPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoPage),
  ],
  exports: [
    CarritoPage
  ]
})
export class CarritoPageModule {}
