<template>
  <div class="card-container">
    <button class="plus-button" @click="onClickPlus">
      <img src="~/assets/img/icons/plus.svg" alt class="settings-icon" />
    </button>
    <Modal />
    <EditModal :cardData="activeCard" />
    <Card
      @click.native="activateCard(volunteer)"
      v-for="volunteer in volunteers"
      :id="volunteer.id"
      :key="volunteer.id"
      :name="volunteer.name"
      :email="volunteer.email"
      :section="volunteer.section"
      :age="volunteer.age"
      :date="volunteer.date"
    />
  </div>
</template>

<script>
import Card from "@/components/Card";
import EditModal from "@/components/shared/EditModal";
import Modal from "@/components/shared/Modal";
import { mapState } from "vuex";
import { fetchVolunteersAPI } from "~/store/volunteer";

export default {
  components: {
    Card,
    Modal,
    EditModal
  },
  data() {
    return {
      activeCard() {}
    };
  },
  fetch({ store }) {
    if (store.getters["volunteer/hasEmptyVolunteers"]) {
      return store.dispatch("volunteer/fetchVolunteers");
    }
  },
  computed: {
    ...mapState({
      volunteers: state => state.volunteer.volunteers
    })
  },
  methods: {
    onClickPlus() {
      this.$store.dispatch("volunteer/openModal");
    },
    activateCard(card) {
      this.$store.dispatch("volunteer/openEditModal");
      this.activeCard = { ...card };
    }
  }
};
</script>

<style scoped lang="scss">
.card-container {
  position: relative;
}
.plus-button,
.plus-button:active {
  outline: none;
  cursor: pointer;
  display: block;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 0 5px;
  background-size: 30%;
  border: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  background-color: #f09c8e;
  position: absolute;
  right: 30px;
  top: -90px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 10px;
  }
}
</style>
