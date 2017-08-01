import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TerminosPage } from './terminos';

@NgModule({
  declarations: [
    TerminosPage,
  ],
  imports: [
    IonicPageModule.forChild(TerminosPage),
  ],
  exports: [
    TerminosPage
  ]
})
export class TerminosPageModule {}
