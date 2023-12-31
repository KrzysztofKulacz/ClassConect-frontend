// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  inner:{
    selectedGroup: "selectedGroup"
  },

  backendApi: {
    registerUrl: 'http://localhost:8080/v1/register/member',
    loginUrl: 'http://localhost:8080/v1/login',
    addGroupUrl: 'http://localhost:8080/v1/team/create',
    deleteGroup: 'http://localhost:8080/v1/team/delete',
    joinGroupUrl: 'http://localhost:8080/v1/team/join',
    getAllUserGroups: 'http://localhost:8080/v1/team/get-member-all',
    getAvailableGroups: 'http://localhost:8080/v1/team/get-available-all',
    addPostUrl: "http://localhost:8080/v1/post/add",
    deletePostUrl: "http://localhost:8080/v1/post/delete",
    editPost: "http://localhost:8080/v1/post/edit",
    getAllPosts: "http://localhost:8080/v1/post/get-all",
    isUserWithinGroup: 'http://localhost:8080/v1/member/is-user-within-group',
    removeUserFromGroup: 'http://localhost:8080/v1/member/remove-from-group'

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
      usergroups: 'usergroups',
      profile: 'profile',
      viewgroup: 'viewgroup'
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
