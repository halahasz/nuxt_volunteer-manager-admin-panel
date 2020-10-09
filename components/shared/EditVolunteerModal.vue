<template>
  <v-app>
    <v-row justify="center">
      <v-dialog
        v-model="this.$store.state.volunteer.EditVolunteerModal"
        persistent
        max-width="600px"
      >
        <v-card>
          <!-- <v-form v-model="valid" ref="form"> -->
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="card.name"
                    label="Name *"
                    :rules="[required('Name')]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="card.age"
                    type="number"
                    label="Age *"
                    :rules="[required('Age')]"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="card.email"
                    type="email"
                    label="Email *"
                    :rules="[required('E-mail'), emailValidation()]"
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
                    :rules="[sectionRules()]"
                    required
                    solo
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="updateCard"
                      color="blue"
                      class="
                          blue  white--text
                        "
                      >Update</v-btn
                    >
                    <v-btn
                      @click="removeItem"
                      color="red lighten-2"
                      class="
                          white--text"
                      >Remove</v-btn
                    >
                    <v-btn
                      @click="onCloseEditModal"
                      color="grey"
                      class="
                          white--text"
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <!-- </v-form> -->
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
      card: { ...this.cardData },
      valid: false,
      required(propertyType) {
        return v => !!v || `${propertyType} is required`;
      },
      emailValidation() {
        var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        return v => (!!v && email_regex.test(v)) || `E-mail is not valid`;
      },
      sectionRules() {
        return v => !!v || "Select a section";
      }
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
      // if (this.$refs.form.validate()) {
      this.$store.dispatch("volunteer/updateVolunteer", this.card);
      // // window.location.reload(true);
      this.$store.dispatch("volunteer/closeEditModal");

      // this.$refs.form.resetValidation();
      setTimeout(() => {
        document
          .querySelector(".custom-checkbox input")
          .setAttribute("aria-checked", false);
      }, 1000);
      // }
    },
    removeItem() {
      this.$store.dispatch("volunteer/removeVolunteer", this.card.id);
      this.$store.dispatch("volunteer/closeEditModal");
    }
  }
};
</script>
