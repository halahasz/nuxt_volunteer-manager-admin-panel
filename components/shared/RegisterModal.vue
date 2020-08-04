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
                      :rules="nameRules"
                      v-model="name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="person"
                      label="Enter your e-mail address"
                      v-model="email"
                      :rules="emailRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="lock"
                      label="Enter your password"
                      v-model="password"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passwordRules"
                      counter
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      prepend-icon="lock"
                      label="Confirm your password"
                      v-model="password"
                      min="8"
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      :rules="passwordRules"
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
                          :class="{
                            'blue  white--text': valid,
                            disabled: !valid
                          }"
                          >Register</v-btn
                        >
                        <v-btn
                          @click="login"
                          color="grey"
                          :class="{
                            'blue  white--text': valid,
                            disabled: !valid
                          }"
                          >Login</v-btn
                        >
                        <v-btn
                          @click="cancel"
                          color="grey"
                          :class="{
                            'white--text': valid,
                            disabled: !valid
                          }"
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
export default {
  data() {
    return {
      valid: false,
      e1: false,
      name: "",
      nameRules: [v => !!v || "Name is required"],
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  methods: {
    submit() {},
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
