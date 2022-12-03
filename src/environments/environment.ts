// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  productsUrl: "https://fakestoreapi.com/",
  encKey: '3AlaDdinY@7!aM07md7AfEz',
  providersKeys: {
    google: {
      clientId: '359332286375-3q47jc9nab6qunfag342s91bp7r2rhrt.apps.googleusercontent.com',
      clientSecret: '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'
    },
    facebook: {
      clientId: '1089393925036260'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
