import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioPage } from './inicio';

@NgModule({
  declarations: [
    InicioPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioPage),
  ],
  exports: [
    InicioPage
  ]
})
export class InicioPageModule {}
