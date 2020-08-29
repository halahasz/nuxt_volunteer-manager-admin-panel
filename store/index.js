import { getUserFromCookie } from "@/helpers";

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const user = getUserFromCookie(req);
    commit("auth/setAuthUser", user);
  }
};
