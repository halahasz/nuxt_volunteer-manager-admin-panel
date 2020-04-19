import { INITIAL_DATA } from "./index";

export function fetchVolunteersAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(INITIAL_DATA.volunteers);
    }, 1000);
  });
}

export const state = () => {
  return {
    title: "All volunteers",
    volunteers: [],
    modal: false
  };
};

export const getters = {
  hasEmptyVolunteers(state) {
    return state.volunteers.length === 0;
  }
};

export const actions = {
  openModal({ commit }) {
    commit("setOpenModal");
  },
  closeModal({ commit }) {
    commit("setCloseModal");
  },
  fetchVolunteers({ commit }) {
    return fetchVolunteersAPI().then(volunteers => {
      commit("setVolunteers", volunteers);
    });
  },
  createVolunteer({ commit }, volunteerData) {
    volunteerData.date = new Date();
    volunteerData.id = Math.random()
      .toString(36)
      .substr(2, 7);
    commit("addVolunteer", volunteerData);
  }
};

export const mutations = {
  setVolunteers(state, volunteers) {
    state.volunteers = volunteers;
  },
  addVolunteer(state, volunteer) {
    state.volunteers.push(volunteer);
  },
  setOpenModal(state) {
    state.modal = true;
  },
  setCloseModal(state) {
    state.modal = false;
  }
};
