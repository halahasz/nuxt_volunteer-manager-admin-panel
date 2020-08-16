import axios from "axios";
import CONFIG from "@/api/baseConfig";

export const state = () => {
  return {
    user: null
  };
};

export const actions = {
  login({ commit }, loginData) {
    return axios
      .post(CONFIG.AUTH_URL, loginData)
      .then(user => {
        commit("setAuthUser", user.data);
      })
      .catch(err => console.log(err));
  }
};

export const mutations = {
  setAuthUser(state, user) {
    state.user = user;
  }
};
