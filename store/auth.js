import axios from "axios";
import CONFIG from "@/api/baseConfig";

export const state = () => {
  return {
    user: null
  };
};

export const getters = {
  authUser(state) {
    return state.user || null;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
  isAdmin(state) {
    return state.user && state.user.role && state.user.role === "admin ";
  }
};

export const actions = {
  register({ commit, state }, registerData) {
    return axios
      .post(CONFIG.SIGNUP_URL, {
        email: registerData.email,
        password: registerData.password,
        returnSecureToken: true
      })
      .then(user => {
        console.log(user);
        return axios
          .post(CONFIG.UPDATE_URL, {
            idToken: user.data.idToken,
            displayName: registerData.name,
            returnSecureToken: true
          })
          .then(user => {
            console.log(user.data);
            commit("setAuthUser", user.data);
          })
          .catch(err => Promise.reject(err));
      })
      .catch(err => Promise.reject(err));
  }
};

export const mutations = {
  setAuthUser(state, user) {
    state.user = user;
  },
  removeAuthUser(state) {
    state.user = null;
  }
};
