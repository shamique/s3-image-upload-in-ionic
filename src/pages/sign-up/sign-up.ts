import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";

import { CognitoServiceProvider } from "../../providers/cognito-service/cognito-service";

@Component({
  selector: "page-sign-up",
  templateUrl: "sign-up.html"
})
export class SignUpPage {
  email: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertController: AlertController,
    public CognitoService: CognitoServiceProvider
  ) {}

  register() {
    this.CognitoService.signUp(this.email, this.password).then(
      res => {
        this.promptVerificationCode();
      },
      err => {
        console.log(err);
      }
    );
  }

  promptVerificationCode() {
    let alert = this.alertController.create({
      title: "Enter Verfication Code",
      inputs: [
        {
          name: "VerificationCode",
          placeholder: "Verification Code"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Verify",
          handler: data => {
            this.verifyUser(data.VerificationCode);
          }
        }
      ]
    });
    alert.present();
  }

  verifyUser(verificationCode) {
    this.CognitoService.confirmUser(verificationCode, this.email).then(
      res => {
        console.log(res);
      },
      err => {
        alert(err.message);
      }
    );
  }
}
