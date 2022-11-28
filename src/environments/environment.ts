// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  backendApi: {
    registerUrl: 'http://localhost:8080/v1/register/member',
    loginUrl: 'http://localhost:8080/v1/login'
  },
  path: {
    root: "",
    outer:{
      landing:'outer',
      login: 'login',
      register: 'register',
    },
    inner:{
      landing:'inner',
      groups: 'groups',
      profile: 'profile'
    }
  },
  auth: {
    tokenKey: 'JWT-Key',
    userKey: 'User-Key'
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
