<template>
  <v-app>
    <v-row justify="center">
      <v-dialog
        v-model="this.$store.state.volunteer.editCardModal"
        persistent
        max-width="600px"
      >
        <v-card>
          <form @submit.prevent="updateCard">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="card.name"
                      label="Name *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="card.age"
                      type="number"
                      label="Age *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="card.email"
                      type="email"
                      label="Email *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="card.photo"
                      label="Photo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="card.section"
                      :items="this.$store.state.volunteer.items"
                      label="Solo field"
                      required
                      solo
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        type="submit"
                        @click="submit"
                        color="blue"
                        :class="{
                          'blue  white--text': valid,
                          disabled: !valid
                        }"
                        >Update</v-btn
                      >
                      <v-btn
                        @click="removeItem"
                        color="red lighten-2"
                        :class="{
                          'white--text': valid,
                          disabled: !valid
                        }"
                        >Remove</v-btn
                      >
                      <v-btn
                        @click="onCloseEditModal"
                        color="grey"
                        :class="{
                          'white--text': valid,
                          disabled: !valid
                        }"
                        >Close</v-btn
                      >
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </form>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
export default {
  props: ["cardData"],
  data() {
    return {
      card: { ...this.cardData }
    };
  },
  watch: {
    cardData(data) {
      this.card = { ...data };
    }
  },
  methods: {
    onCloseEditModal() {
      this.$store.dispatch("volunteer/closeEditModal");
    },
    updateCard() {
      if (
        this.card.name &&
        this.card.age &&
        this.card.email &&
        this.card.section
      ) {
        this.$store.dispatch("volunteer/updateVolunteer", { ...this.card });
        this.$store.dispatch("volunteer/closeEditModal");
      }
    },
    removeItem() {
      this.$store.dispatch("volunteer/removeVolunteer", this.card.id);
      this.$store.dispatch("volunteer/closeEditModal");
    }
  }
};
</script>
