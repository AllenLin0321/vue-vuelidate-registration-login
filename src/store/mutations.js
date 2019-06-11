export default {
  AUTH_USER(state, userData) {
    state.idToken = userData.idToken;
    state.userId = userData.userId;
  },
  LOGOUT(state) {
    state.idToken = null;
    state.userId = null;
  },
  SAVEUSER(state, userData) {
    state.userData = userData;
  }
}
