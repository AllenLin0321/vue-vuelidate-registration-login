export default {
  isAuthenticated(state) {

    if (localStorage.getItem('token')) {
      state.idToken = localStorage.getItem('token');
      state.userId = localStorage.getItem('userId');
    }
    return state.idToken !== null
  },
  userInfo(state) {
    if (localStorage.getItem('userData')) {
      state.userData = JSON.parse(localStorage.getItem('userData'));
    }
    return state.userData;
  }
}
