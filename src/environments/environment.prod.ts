export const environment = {
  production: true,

  inner:{
    selectedGroup: "selectedGroup"
  },

  backendApi: {
    registerUrl: 'http://57.128.195.219:8080/v1/register/member',
    loginUrl: 'http://57.128.195.219:8080/v1/login',
    addGroupUrl: 'http://57.128.195.219:8080/v1/team/create',
    deleteGroup: 'http://57.128.195.219:8080/v1/team/delete',
    joinGroupUrl: 'http://57.128.195.219:8080/v1/team/join',
    getAllUserGroups: 'http://57.128.195.219:8080/v1/team/get-member-all',
    getAvailableGroups: 'http://57.128.195.219:8080/v1/team/get-available-all',
    addPostUrl: "http://57.128.195.219:8080/v1/post/add",
    deletePostUrl: "http://57.128.195.219:8080/v1/post/delete",
    editPost: "http://57.128.195.219:8080/v1/post/edit",
    getAllPosts: "http://57.128.195.219:8080/v1/post/get-all",
    isUserWithinGroup: 'http://57.128.195.219:8080/v1/member/is-user-within-group',
    removeUserFromGroup: 'http://57.128.195.219:8080/v1/member/remove-from-group'
//test
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
//classconect-backend
