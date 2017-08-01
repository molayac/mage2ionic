import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';

import { InicioPage } from './../inicio/inicio';
import { AyudaPage } from './../ayuda/ayuda';
import { CuentaPage } from './../cuenta/cuenta';
import { CarritoPage } from './../carrito/carrito';
import { ProductosPage } from './../productos/productos';

/**
 * Generated class for the ContactoPage page.
 *
 * Author: Marlon Olaya.
 */

@IonicPage()
@Component({
  selector: 'page-contacto',
  templateUrl: 'contacto.html',
})

export class ContactoPage {

  public enabledEmail: boolean = false;
  public contactForm: FormGroup;

  constructor(public alertCtrl: AlertController, private formBuilder: FormBuilder,
    private emailComposer: EmailComposer, public navCtrl: NavController,
    public navParams: NavParams) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactoPage');
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        //Now we know we can send
      }
    });


  }

  goToCart() {
    this.navCtrl.setRoot(CarritoPage);
  }

  sendMail(formData) {
    let email = {
      app: 'gmail',
      subject: formData.name + " - " + formData.subject,
      to: ["molaya@ias.com.co"],
      body: formData.body
    }

    this.emailComposer.open(email);
    this.contactForm.reset();

  }



}
