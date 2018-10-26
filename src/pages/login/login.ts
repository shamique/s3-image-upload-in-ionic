import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { CognitoServiceProvider } from "../../providers/cognito-service/cognito-service";
import { SignUpPage } from "../../pages/sign-up/sign-up";
import { ImageUploadPage } from "../../pages/image-upload/image-upload";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  email: string;
  password: string;
  signUpPage = SignUpPage;

  constructor(public navCtrl: NavController, public CognitoSerive: CognitoServiceProvider, public loadingCtrl: LoadingController) {}

  login() {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.CognitoSerive.authenticate(this.email, this.password).then(
      res => {
        loading.dismiss();
        this.navCtrl.push(ImageUploadPage);
      },
      err => {
        loading.dismiss();
        console.log(err);
      }
    );
  }
}
