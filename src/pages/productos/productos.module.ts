import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductosPage } from './productos';

@NgModule({
  declarations: [
    ProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductosPage),
  ],
  exports: [
    ProductosPage
  ]
})
export class ProductosPageModule {}
