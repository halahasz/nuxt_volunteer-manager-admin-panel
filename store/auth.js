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
  }
};

export const actions = {
  register({ commit }, user) {
    commit("setAuthUser", user);
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
