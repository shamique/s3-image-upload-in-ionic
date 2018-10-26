import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  Platform,
  LoadingController,
  AlertController
} from "ionic-angular";
import { CognitoServiceProvider } from "../../providers/cognito-service/cognito-service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { S3ServiceProvider } from "../../providers/s3-service/s3-service";

@Component({
  selector: "page-image-upload",
  templateUrl: "image-upload.html"
})
export class ImageUploadPage {
  public imageData: string;
  public imageView: string;
  public imageName: string;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public cognitoService: CognitoServiceProvider,
      public platform: Platform, private camera: Camera, public s3Service: S3ServiceProvider, private loader: AlertController
  ) {}

  openCamera() {
    this.platform.ready().then(readySource => {
      const options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      this.camera.getPicture(options).then(
        imageData => {
          this.imageView = "data:image/jpeg;base64," + imageData;
          this.imageData = imageData;
        },
        err => {
          alert("Error in capture image");
        }
      );
    });
  }

  uploadPhoto() {
    let loading = this.loader.create({
      title: 'Wait',
      subTitle: 'Uploading...'
    });
    loading.present();

    this.cognitoService
      .getLoggedUser()
      .then(userToken => {
        this.s3Service.upload(this.imageData, this.imageName, userToken).then(
          res => {
            loading.dismiss();
            this.imageName = "";
            this.imageData = "";
            alert("Image uploaded!");
          },
          err => {
            loading.dismiss();
            alert("Error in image upload!");
          }
        );
      })
      .catch(err => console.log(err));
  }
}
