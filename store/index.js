import { getUserFromCookie } from "@/helpers";
import CONFIG from "@/api/baseConfig";
import axios from "axios";

export const state = () => {
  return {
    volunteers: [],
    sections: [
      {
        name: "social",
        color: "#f2cdcd",
        icon: "~/assets/img/icons/people.png"
      },
      {
        name: "waitress",
        color: "#f2b59e",
        icon: "~/assets/img/icons/waitress.png"
      },
      {
        name: "kitchen",
        color: "#f2dab4",
        icon: "~/assets/img/icons/kitchen.png"
      },
      {
        name: "logistics",
        color: "#cde6ef",
        icon: "~/assets/img/icons/logistics.png"
      },
      {
        name: "cleaning",
        color: "#f0eeae",
        icon: "~/assets/img/icons/cleaning.png"
      }
    ],
    addItemModal: false,
    EditVolunteerModal: false,
    loginModal: false,
    registerModal: false
  };
};

export const getters = {
  hasEmptyVolunteers(state) {
    return state.volunteers.length === 0;
  },
  getVolunteers: state => {
    return state.volunteers;
  },
  getItemModal: state => {
    return state.addItemModal;
  },
  getSections: state => {
    return state.sections;
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
    state.addItemModal = true;
  },
  setCloseModal(state) {
    state.addItemModal = false;
  },
  setOpenEditModal(state) {
    state.EditVolunteerModal = true;
  },
  setCloseEditModal(state) {
    state.EditVolunteerModal = false;
  },
  setOpenLoginModal(state) {
    state.loginModal = true;
  },
  setCloseLoginModal(state) {
    state.loginModal = false;
  },
  setOpenRegisterModal(state) {
    state.registerModal = true;
  },
  setCloseRegisterModal(state) {
    state.registerModal = false;
  },
  removeCard(state, { index }) {
    state.volunteers.splice(index, 1);
  },
  addCard(state, { volunteer, index }) {
    const part1 = state.volunteers.slice(0, index);
    const part2 = state.volunteers.slice(index);
    state.volunteers = [...part1, volunteer, ...part2];
  }
};

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const user = getUserFromCookie(req);
    commit("auth/setAuthUser", user);
  },
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
  openRegisterModal({ commit }) {
    commit("setOpenRegisterModal");
  },
  closeRegisterModal({ commit }) {
    commit("setCloseRegisterModal");
  },
  removeVolunteer({ commit, state }, id) {
    const updVolunteers = state.volunteers.filter(v => v.id !== id);
    commit("setVolunteers", updVolunteers);
    return axios
      .delete(CONFIG.DELETE_URL + id + ".json")
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
  },
  fetchVolunteers({ commit }) {
    return axios.get(CONFIG.BASE_URL).then(result => {
      const volunteers = [];
      for (const key in result.data) {
        volunteers.push({ ...result.data[key], id: key });
      }
      commit("setVolunteers", volunteers);
    });
    // return fetchVolunteersAPI().then(volunteers => {
    //   commit("setVolunteers", volunteers);
    // });
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
      commit("removeCard", { index: index });
      setTimeout(() => {
        commit("addCard", { volunteer: volunteerData, index: index });
      }, 500);
    }
  }
};
