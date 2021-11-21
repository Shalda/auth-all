// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  firebaseConfig: {
    apiKey: 'AIzaSyDBxWWupnR7AghW90xLVKdUFXAQ_YoQ9uI',
    authDomain: 'fbauth-853b0.firebaseapp.com',
    databaseURL: 'https://fbauth-853b0-default-rtdb.firebaseio.com',
    projectId: 'fbauth-853b0',
    storageBucket: 'fbauth-853b0.appspot.com',
    messagingSenderId: '636570909554',
    appId: '1:636570909554:web:4bc1a5c01c9d40b59ffbeb',
    measurementId: 'G-0WK2PH0LZF',
  },
  azureADConfig:{
    clientId: '87e8dac9-510d-4444-992d-65cf33cdcf65'
  },
  awsConfig: {
    cognitoUserPoolId: 'us-east-1_dE4Zy1ayW',
    cognitoAppClientId: 'k9qtr0ehg2vvd904q04khb0u1'
  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
