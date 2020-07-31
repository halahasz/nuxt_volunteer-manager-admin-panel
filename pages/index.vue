<template>
  <div class="card-container">
    <EditCardModal :cardData="activeCard" />
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
import EditCardModal from "@/components/shared/EditCardModal";
import Modal from "@/components/shared/Modal";
import { mapState } from "vuex";
import { fetchVolunteersAPI } from "~/store/volunteer";

export default {
  components: {
    Card,
    Modal,
    EditCardModal
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
    activateCard(card) {
      this.$store.dispatch("volunteer/openEditModal");
      this.activeCard = { ...card };
      this.$emit("activate-card", this.activeCard);
    }
  }
};
</script>
