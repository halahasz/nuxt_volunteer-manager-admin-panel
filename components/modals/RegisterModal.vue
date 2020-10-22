<template>
  <v-app>
    <v-row justify="center">
      <v-dialog
        v-model="this.$store.state.volunteer.registerModal"
        persistent
        max-width="600px"
      >
        <v-card>
          <v-form v-model="valid" ref="form">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-card-title primary-title>
                      <h2 class="login_heading">Register</h2>
                    </v-card-title>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="text"
                      prepend-icon="person"
                      label="Enter your name"
                      :rules="[required('Name'), minLength('Name', 5)]"
                      v-model="form.name"
                      required
                      counter
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="person"
                      label="Enter your e-mail address"
                      v-model="form.email"
                      :rules="[required('E-mail'), emailValidation()]"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="lock"
                      label="Enter your password"
                      v-model="form.password"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="[
                        required('Password'),
                        minLength('Password', 5),
                        passwordValidation()
                      ]"
                      counter
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="lock"
                      label="Confirm your password"
                      v-model="form.passwordConfirmation"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="[
                        required('Password'),
                        passwordConfirmationRules()
                      ]"
                      counter
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-layout justify-space-between>
                      <div>
                        <v-btn
                          @click="submit"
                          color="blue"
                          class="blue  white--text"
                          >Register</v-btn
                        >
                        <v-btn
                          @click="login"
                          color="grey"
                          class="blue  white--text"
                          >Login</v-btn
                        >
                        <v-btn @click="cancel" color="grey" class="white--text"
                          >Cancel</v-btn
                        >
                      </div>
                    </v-layout>
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
import * as firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      valid: false,
      e1: false,
      form: {
        email: "",
        name: "",
        password: "",
        passwordConfirmation: ""
      },
      required(propertyType) {
        return v => !!v || `${propertyType} is required`;
      },
      minLength(propertyType, minLength) {
        return v =>
          (!!v && v.length >= minLength) ||
          `${propertyType} must be at least ${minLength} characters`;
      },
      emailValidation() {
        var email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
        return v => (!!v && email_regex.test(v)) || `E-mail is not valid`;
      },
      passwordValidation() {
        var password_regex = /(?!^\d+$)^.+$/i;
        return v =>
          (!!v && password_regex.test(v)) ||
          `Password can not contain only numbers`;
      },
      passwordConfirmationRules() {
        return v =>
          (!!v && v == this.form.password) ||
          "Password confirmation does not match password";
      }
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.form.email, this.form.password)
          .then(() => {
            let user = firebase.auth().currentUser;
            user
              .updateProfile({
                displayName: this.form.name
              })
              .then(() => {
                this.$store.dispatch("auth/setUser", {
                  name: user.displayName,
                  email: user.email,
                  password: user.password
                });
                user
                  .getIdToken(true)
                  .then(token => Cookies.set("access_token", token));
                this.$store.dispatch("volunteer/closeRegisterModal");
              })
              .catch(error => console.log(error));
          })
          .catch(err => {
            this.$toasted.error(err, {
              duration: 3000
            });
          });
      }
    },
    cancel() {
      this.$store.dispatch("volunteer/closeRegisterModal");
    },
    login() {
      this.$store.dispatch("volunteer/closeRegisterModal");
      this.$store.dispatch("volunteer/openLoginModal");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card__title {
  padding: 0;
}
.v-btn.grey {
  margin-left: 10px;
}
.login_heading {
  color: #1872b2;
}
</style>
