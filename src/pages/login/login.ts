import { RegistroPage } from './../registro/registro';
import { CuentaPage } from './../cuenta/cuenta';
import { InicioPage } from './../inicio/inicio';
import { Magento2ServiceProvider } from './../../providers/magento2-service/magento2-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public homePage: InicioPage;
  public loginForm: FormGroup;
  public signupPage: any = RegistroPage;

  public loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    private formBuilder: FormBuilder, public mgService: Magento2ServiceProvider) {
    let email = '';
    let pwd = '';
    if(navParams != null && navParams != undefined){
      email = navParams.get("email");
    }
    this.loginForm = formBuilder.group({
      usr: [email, Validators.compose([Validators.maxLength(30), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), Validators.required])],
      pwd: [pwd, Validators.compose([Validators.minLength(6), Validators.required])]
    });
    this.loading = this.loadingCtrl.create({
      content: "Estamos cargando la información...",
      spinner: "circles"
    });

    if (this.mgService.getToken() !== null && this.mgService.getToken() !== undefined) {
      console.log("Bye LOGIN", this.mgService.getToken());
      this.navCtrl.setRoot(CuentaPage);
    }

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');
  }

  login(data) {
    let errorStatus = true;
    this.loading.present();
    console.log("LOGIN", JSON.stringify(data));
    this.mgService.loginService(data)
      .subscribe(res => {
        this.loading.dismiss();
        if (res !== null && res !== undefined) {
          this.mgService.setToken(res);
          errorStatus = false;
        }
        this.showAlert(errorStatus);
      }, err => {
        this.loading.dismiss();
        this.showAlert(errorStatus);
      });
  }

  showAlert(error) {
    let title = "Inicio de sesión exitoso!";
    let msg = "Ha iniciado sesión correctamente.";
    let errorStatus = error;
    if (error) {
      title = "Error al iniciar sesión!"
      msg = "Si ya está registrado, por favor verifique su correo y/o contraseña, ya que no se ha podido iniciar sesion";
    }
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: [
        {
          text: 'OK', handler: data => {
            if (!errorStatus) {
              this.navCtrl.setRoot(CuentaPage);
            } else {
              this.navCtrl.setRoot(LoginPage);
            }
          }
        }
      ]
    });
    alert.present();
  }

}
