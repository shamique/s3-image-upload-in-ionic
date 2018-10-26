import { Injectable } from "@angular/core";
import * as aws from "aws-sdk";
import { SystemVariableProvider } from "../system-variable/system-variable";

@Injectable()
export class S3ServiceProvider {
  SYSTEM_VARIABLE = new SystemVariableProvider().SYSTEM_PARAMS;

  upload(image, imageName, accessToken) {
    return new Promise((resolve, reject) => {
      aws.config.region = this.SYSTEM_VARIABLE.REGION;
      aws.config.credentials = new aws.CognitoIdentityCredentials({
        IdentityPoolId: this.SYSTEM_VARIABLE.COGNITO_IDENTITY.IDENTITY_POOL_ID,
        Logins: {
          "cognito-idp.<REGION_NAME>.amazonaws.com/<POOL_ID>": accessToken
        }
      });

      var s3 = new aws.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: this.SYSTEM_VARIABLE.S3.BUCKET_NAME }
      });

      let buf = new Buffer(image, "base64");

      var data = {
        Bucket: this.SYSTEM_VARIABLE.S3.BUCKET_NAME,
        Key: imageName,
        Body: buf,
        ContentEncoding: "base64",
        ContentType: "image/jpeg"
      };

      s3.putObject(data, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}
