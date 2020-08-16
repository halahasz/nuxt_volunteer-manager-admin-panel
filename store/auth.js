import axios from "axios";
import CONFIG from "@/api/baseConfig";

export const state = () => {
  return {
    user: null
  };
};

export const actions = {
  login({ commit, state }, loginData) {
    return axios
      .post(CONFIG.AUTH_URL, loginData)
      .then(user => {
        console.log(user);
        commit("setAuthUser", user.data);
        return state.user;
      })
      .catch(err => Promise.reject(err));
  }
};

export const mutations = {
  setAuthUser(state, user) {
    state.user = user;
  }
};
