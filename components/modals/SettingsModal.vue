<template>
  <v-app>
    <v-row justify="center">
      <v-dialog v-model="addItemModal" persistent max-width="600px">
        <v-card>
          <v-form v-model="valid" ref="form">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="form.name"
                      label="Name *"
                      :rules="[required('Name')]"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="form.age"
                      type="number"
                      :rules="[required('Age')]"
                      autocomplete="off"
                      label="Age *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      type="email"
                      v-model="form.email"
                      :rules="[required('E-mail'), emailValidation()]"
                      label="Email *"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.photo"
                      label="Photo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.section"
                      :items="items"
                      :rules="[sectionRules()]"
                      label="Section*"
                      required
                      solo
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        @click="submit"
                        color="blue"
                        class="blue  white--text"
                        >Save</v-btn
                      >
                      <v-btn
                        @click="onCloseModal"
                        color="grey"
                        class="white--text"
                        >Close</v-btn
                      >
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import CONFIG from "@/api/baseConfig";
export default {
  data() {
    return {
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
      },
      form: {
        name: "",
        age: "",
        email: "",
        photo: "",
        section: "",
        date: ""
      },
      items: ["social", "waitress", "kitchen", "logistics", "cleaning"]
    };
  },
  computed: {
    ...mapGetters({
      addItemModal: "addItemModal"
    })
  },
  methods: {
    onCloseModal() {
      this.$store.dispatch("closeModal");
    },
    submit() {
      if (this.$refs.form.validate()) {
        axios
          .post(CONFIG.BASE_URL, {
            ...this.form,
            date: new Date()
          })
          .then(res => console.log(res))
          .catch(e => console.lof(e));
        this.$store.dispatch("createVolunteer", { ...this.form });
        this.$store.dispatch("closeModal");
        (this.form.name = ""),
          (this.form.age = ""),
          (this.form.email = ""),
          (this.form.photo = ""),
          (this.form.section = "");
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>

<style lang="scss">
.theme--dark.v-application {
  background: rgb(232, 240, 254);
}
.theme--dark.v-list {
  background: rgb(232, 240, 254);
}
.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  color: #1e88e5 !important;
  border-bottom: 1px solid #fff;
}
.v-list.v-select-list.v-sheet.v-sheet--tile.theme--dark.theme--dark {
  padding: 0;
}
.v-list-item__title {
  font-size: 13px;
}
.theme--dark.v-text-field--solo > .v-input__control > .v-input__slot {
  background: rgb(232, 240, 254);
}
.v-btn__content {
  font-size: 11px;
  font-weight: bold;
}
.v-dialog > .v-card > .v-card__text {
  .container {
    padding: 0;
  }
  padding: 20px 40px 10px;
}
.mdi-menu-down::before {
  color: rgb(73, 190, 124);
}
.theme--dark.v-select .v-select__selection--comma {
  color: rgb(68, 68, 68);
}
.v-application--wrap {
  min-height: auto;
}
.theme--dark.v-application {
  background: transparent;
}
.theme--dark.v-card {
  background: rgb(232, 240, 254);
  color: rgb(8, 119, 82);
  label,
  .v-label--active.primary--text {
    color: rgb(73, 190, 124);
  }
  input {
    color: rgb(68, 68, 68);
  }
}
.theme--dark.v-text-field > .v-input__control > .v-input__slot:before,
.v-input.theme--dark.v-text-field.v-text-field--is-booted:hover
  .v-input__slot:before {
  border-color: grey;
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
  top: -30px;
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
