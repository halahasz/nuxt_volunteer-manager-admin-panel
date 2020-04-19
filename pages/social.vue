<template>
  <div>
    <Card
      v-for="volunteer in volunteers"
      :key="volunteer.id"
      :name="volunteer.name"
      :email="volunteer.email"
      :section="volunteer.section"
      :age="volunteer.age"
      :date="volunteer.createdAt "
    />
  </div>
</template>

<script>
import Card from "@/components/Card";
import { mapState } from "vuex";
export default {
  components: {
    Card
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
  }

  //  isFormValid() {
  //    if(this.form.name) {
  //      return true;
  //    }
  //    return false
  //  }
  // }
};
</script>

<style scoped lang="scss"></style>
