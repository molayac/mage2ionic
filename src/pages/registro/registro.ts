import { InicioPage } from './../inicio/inicio';
import { LoginPage } from './../login/login';
import { CarritoPage } from './../carrito/carrito';
import { Magento2ServiceProvider } from './../../providers/magento2-service/magento2-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the RegistroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  public cartPage: any = CarritoPage;
  public loginPage: any = LoginPage;

  public signupForm: FormGroup;
  public loading: any;
  private token: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    private formBuilder: FormBuilder, public mgService: Magento2ServiceProvider) {

    this.signupForm = formBuilder.group({
      company: ['', Validators.compose([Validators.required])],
      // companyType: ['', Validators.required],
      name: ['', Validators.compose([Validators.required])],
      lastnames: ['', Validators.compose([Validators.required])],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.compose([Validators.pattern("[0-9]{8,13}"), Validators.required])],
      gender: ['male'],
      email: ['', Validators.compose([Validators.maxLength(30), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
      pwd: ['', Validators.compose([Validators.minLength(6), Validators.pattern("^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,100}$"), Validators.required])],
      limitCredit: [100000]
    });

    this.loading = this.loadingCtrl.create({
      content: "Espere mientras generamos la solicitud",
      spinner: "circles"
    });
  }

  ionViewDidLoad() {
    this.mgService.adminServiceToken().subscribe(data => {
      this.token = data;
      console.log("Success Admin Token", data);
    }, err => {
      this.token = null;
      console.log("Admin Token Error");
    });
    console.log('ionViewDidLoad RegistroPage');
  }

  goToPage(page) {
    this.navCtrl.setRoot(page);
  }

  register(data) {
    if(this.token == null){
      this.showAlert("ERROR",
          "Estamos teniendo problemas en este momento, por favor intente más tarde!",
          null, [{
            text: 'OK',
            handler: data => {
              this.navCtrl.setRoot(InicioPage);
            }
          }]);
      return;
    }
    this.mgService.registerNewCustomer(this.token, data).subscribe(
      data => {
        this.showAlert("REGISTRO EXITOSO!",
          "Le hemos enviado un correo con una clave de confirmación, por favor ingresela a continuación:",
          [{
            name: 'key',
            placeholder: 'Ingrese elcódigo de confirmación'
          }], [{
            text: 'CONFIRMAR',
            handler: action => {
              console.log("Confirmation Code: ", JSON.stringify(action), action, "Data: ", data.email);
              this.mgService.activateCustomerService(this.token,data.email, action.key).subscribe(datar=>{
                this.showAlert(
                  "Cuenta Activada Correctamente!",
                  datar.name+" "+datar.lastname+", le damos la bienvenida, por favor ingrese a continuación su contraseña para iniciar sesión en la aplicación y poder realizar compras.",
                  null,
                  [{title: "Ok", handler: login => {this.navCtrl.setRoot(LoginPage, {email:datar.email, pwd:data.password});
                  }}]
                
                );
              }, err=>{

              });
              // if(data.confirmation == action.key){ this.mgService.activeCustomer(action.key); }
                
            }
          }]);
      },
      err => {
        this.showAlert("ERROR",
          "Estamos teniendo problemas en este momento, por favor intente más tarde",
          null, [{
            text: 'OK',
            handler: data => {
              this.navCtrl.setRoot(InicioPage);
            }
          }]);
      }
    );
  }

  showAlert(title, msg, inputs, buttons) {
    let alert;
    if (inputs == null) {
      alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        buttons: buttons
      });

    } else {
      alert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        inputs: inputs,
        buttons: buttons
      });

    }
    alert.present();

  }

}
