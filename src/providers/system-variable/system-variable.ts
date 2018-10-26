import { Injectable } from "@angular/core";

@Injectable()
export class SystemVariableProvider {
  public SYSTEM_PARAMS = {
    REGION: "",
    COGNITO_POOL: {
      UserPoolId: "",
      ClientId: ""
    },
    COGNITO_IDENTITY: {
      IDENTITY_POOL_ID: ""
    },
    S3: {
      BUCKET_NAME: ""
    }
  };
}
