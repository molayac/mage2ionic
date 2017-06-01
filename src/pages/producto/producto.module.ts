import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductoPage } from './producto';

@NgModule({
  declarations: [
    ProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductoPage),
  ],
  exports: [
    ProductoPage
  ]
})
export class ProductoPageModule {}
