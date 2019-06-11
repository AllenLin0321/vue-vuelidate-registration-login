import axios from "axios";
import router from "@/router";

export default {
  signUp({
    commit,
    dispatch
  }, userData) {
    const url = process.env.VUE_APP_SIGNUP_URL;
    const APIKey = process.env.VUE_APP_API_KEY;
    const user = {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true
    };

    axios
      .post(`${url}?key=${APIKey}`, user)
      .then(res => {
        commit('AUTH_USER', {
          idToken: res.data.idToken,
          userId: res.data.localId
        })

        // Add User Id to database
        userData.userId = res.data.localId;

        // Save UserID& Token to Local Storage
        dispatch('saveLocalStorage', res);

        // Save UserData to local Storage
        localStorage.setItem('userData', JSON.stringify(userData));

        // Save User Info into Firebase Database
        dispatch('storeUserData', userData);

        setTimeout(() => {
          router.push("account");
        }, 2500);
      })
      .catch(error => console.log(error));
  },
  login({
    commit,
    dispatch
  }, authData) {
    const url = process.env.VUE_APP_LOGIN_URL;
    const APIKey = process.env.VUE_APP_API_KEY;
    const user = {
      email: authData.email,
      password: authData.password,
      returnSecureToken: true
    };
    axios
      .post(`${url}?key=${APIKey}`, user)
      .then(res => {

        // Save idToken and customer ID
        commit('AUTH_USER', {
          idToken: res.data.idToken,
          userId: res.data.localId
        })

        // Save to Local Storage
        dispatch('saveLocalStorage', res);

        router.push('account');
      })
      .catch(error => console.log(error))
  },
  fetchUser({
    commit,
    state
  }) {
    const url = process.env.VUE_APP_DATABASE_URL;
    axios
      .get(`${url}/users.json`)
      .then(res => {
        for (const key in res.data) {
          if (res.data[key].userId === state.userId) {

            // Save to state
            commit('SAVEUSER', res.data[key]);

            // Save to local Storage
            localStorage.setItem('userData', JSON.stringify(res.data[key]));
          }
        }
      })
      .catch(error => console.log(error))
  },
  logout({
    commit
  }) {
    // Remove state data
    commit('LOGOUT');

    // Remove local Storage Data
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');

    // To login page
    router.push('login');
  },
  saveLocalStorage({
    commit
  }, res) {
    localStorage.setItem('token', res.data.idToken);
    localStorage.setItem('userId', res.data.localId);
  },
  storeUserData({
    state
  }, userData) {
    if (!state.idToken) {
      return
    }

    const url = process.env.VUE_APP_DATABASE_URL;

    axios
      .post(`${url}/users.json`, userData)
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }
}
