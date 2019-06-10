import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.idToken;
      state.userId = userData.userId;
    }
  },
  actions: {
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
          commit('authUser', {
            idToken: res.data.idToken,
            userId: res.data.localId
          })

          // Add User Id to database
          userData.userId = res.data.localId;

          // Save to Local Storage
          dispatch('saveLocalStorage', res);

          // Save others User Info
          dispatch('storeUserData', userData);

          setTimeout(() => {
            router.push("home");
          }, 3000);
        })
        .catch(error => console.log(error));
    },
    login({
      commit
    }, authData) {
      const url = process.env.VUE_APP_LOGIN_URL;
      const APIKey = process.env.VUE_APP_API_KEY;
      const user = {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      };
      axios.post(`${url}?key=${APIKey}`, user)
        .then(res => {
          console.log(res)
          commit('authUser', {
            idToken: res.data.idToken,
            userId: res.data.localId
          })
          router.push('home');
        })
        .catch(error => console.log(error))
    },
    saveLocalStorage({
      commit
    }, res) {
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('userId', res.data.localId);
    },
    storeUserData({
      commit,
      state
    }, userData) {
      if (!state.idToken) {
        return
      }

      const url = process.env.VUE_APP_DATABASE_URL;

      axios.post(`${url}/users.json`, userData)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.idToken !== null
    }
  }
})
