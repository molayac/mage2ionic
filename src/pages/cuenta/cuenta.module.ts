import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CuentaPage } from './cuenta';

@NgModule({
  declarations: [
    CuentaPage,
  ],
  imports: [
    IonicPageModule.forChild(CuentaPage),
  ],
  exports: [
    CuentaPage
  ]
})
export class CuentaPageModule {}
