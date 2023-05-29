export const environment = {
  production: true,

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
//classconect-backend
