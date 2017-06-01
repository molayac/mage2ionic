import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AyudaPage } from './ayuda';

@NgModule({
  declarations: [
    AyudaPage,
  ],
  imports: [
    IonicPageModule.forChild(AyudaPage),
  ],
  exports: [
    AyudaPage
  ]
})
export class AyudaPageModule {}
