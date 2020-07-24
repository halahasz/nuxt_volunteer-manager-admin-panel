import INITIAL_DATA from "./initial_data.json";
import Vue from "vue";

export function fetchVolunteersAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(INITIAL_DATA.volunteers);
    }, 0);
  });
}

export const state = () => {
  return {
    title: "All volunteers",
    volunteers: [],
    items: ["social", "waitress", "kitchen", "logistics", "cleaning"],
    modal: false,
    editModal: false,
    loginModal: false
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
  openEditModal({ commit }) {
    commit("setOpenEditModal");
  },
  closeEditModal({ commit }) {
    commit("setCloseEditModal");
  },
  openLoginModal({ commit }) {
    commit("setOpenLoginModal");
  },
  closeLoginModal({ commit }) {
    commit("setCloseLoginModal");
  },
  removeVolunteer({ commit, state }, id) {
    const updVolunteers = state.volunteers.filter(v => v.id !== id);
    commit("setVolunteers", updVolunteers);
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
  },
  updateVolunteer({ commit, state }, volunteerData) {
    const index = state.volunteers.findIndex(card => {
      return card.id == volunteerData.id;
    });
    if (index !== -1) {
      commit("replaceCard", { volunteer: volunteerData, index: index });
    }
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
  },
  setOpenEditModal(state) {
    state.editModal = true;
  },
  setCloseEditModal(state) {
    state.editModal = false;
  },
  setOpenLoginModal(state) {
    state.loginModal = true;
  },
  setCloseLoginModal(state) {
    state.loginModal = false;
  },
  replaceCard(state, { volunteer, index }) {
    // state.volunteers[index + 1] = volunteer;
    Vue.set(state.volunteers, index, volunteer);
  }
};
