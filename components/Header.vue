<template>
  <div>
    <section class="upper-header">
      <div class="header-container">
        <nuxt-link to="/" class="logo-link">
          <h1 class="logo">Volunteers Organizer</h1>
        </nuxt-link>
        <div class="icons-container">
          <button v-if="!isAuth" class="login" @click="login">Login</button>
          <button v-if="!isAuth" class="register" @click="register">
            Register
          </button>
          <p v-if="isAuth" class="username">{{ user.name }}</p>
          <button v-if="isAuth" class="header-button">
            <img
              src="~/assets/img/icons/settings.svg"
              alt
              class="settings-icon"
            />
          </button>
          <button v-if="isAuth" @click="logout" class="header-button">
            <img
              src="~/assets/img/icons/logout.svg"
              alt
              class="settings-icon"
            />
          </button>
          <LoginModal />
          <RegisterModal />
        </div>
      </div>
    </section>
    <section class="bottom-header">
      <div class="header-container">
        <div class="icons-container">
          <img
            class="settings-icon user-icon"
            src="~/assets/img/icons/users.svg"
            alt
          />
          <p class="number">68</p>
          <p class="volunteers">volunteers</p>
        </div>
        <div class="icons-container">
          <nuxt-link to="/" class="all-icon icon">All</nuxt-link>
          <nuxt-link
            v-for="section in sections"
            :key="section.name"
            :to="'/' + section.name"
            :style="{ backgroundColor: section.color }"
            class="people-icon icon"
          >
            <img
              src="~/assets/img/icons/people.png"
              alt
              class="settings-icon"
            />
          </nuxt-link>
          <!-- <nuxt-link to="/waitress" class="waitress-icon icon">
            <img
              src="~/assets/img/icons/waitress.png"
              alt
              class="settings-icon"
            />
          </nuxt-link>
          <nuxt-link to="/kitchen" class="kitchen-icon icon">
            <img
              src="~/assets/img/icons/kitchen.png"
              alt
              class="settings-icon"
            />
          </nuxt-link>
          <nuxt-link to="/logistics" class="logistics-icon icon">
            <img
              src="~/assets/img/icons/logistics.png"
              alt
              class="settings-icon"
            />
          </nuxt-link>
          <nuxt-link to="/cleaning" class="cleaning-icon icon">
            <img
              src="~/assets/img/icons/cleaning.png"
              alt
              class="settings-icon"
            />
          </nuxt-link> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import { mapGetters } from "vuex";
import * as firebase from "firebase/app";
import "firebase/auth";
import Cookies from "js-cookie";

export default {
  components: {
    LoginModal,
    RegisterModal
  },
  computed: {
    ...mapGetters({
      sections: "getSections",
      user: "auth/authUser",
      isAuth: "auth/isAuthenticated"
    })
  },
  methods: {
    login() {
      this.$store.dispatch("openLoginModal");
    },
    register() {
      this.$store.dispatch("openRegisterModal");
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => this.$store.commit("auth/removeAuthUser"));
      Cookies.remove("access_token");
    }
  }
};
</script>

<style lang="scss" scoped>
.upper-header {
  height: 40px;
  background-color: #ededed;
}
.header-container {
  max-width: 1200px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin: 0 auto;
}
.logo-link {
  text-decoration: none;
}
.logo {
  color: #000;
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}
.icons-container {
  display: flex;
  align-items: center;
}
.login {
  margin-right: 40px;
  font-size: 14px;
  font-weight: 600;
  outline: none;
}
.register {
  font-weight: 600;
  outline: none;
}
.bottom-header {
  height: 40px;
  background-color: #ccd4d5;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.settings-icon {
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 5px;
}
.header-button {
  outline: none;
}
.user-icon {
  margin: 0;
  background-position-x: 0;
}
.number {
  font-weight: 600;
  font-size: 16px;
  margin-left: 10px;
}
.volunteers {
  margin-left: 10px;
}
.icon {
  border-radius: 10px;
  height: 30px;
  width: 30px;
  margin: 0 5px;
}
.all-icon {
  background-color: #ccd4d5;
  line-height: 30px;
  color: #000;
  text-decoration: none;
  padding-left: 6px;
  font-weight: bold;
}
.people-icon {
  background-color: #f2cdcd;
  img {
    margin-top: 5px;
  }
}
.kitchen-icon {
  background-color: #f2dab4;
  img {
    margin-top: 4px;
    padding: 1px;
  }
}
.waitress-icon {
  background-color: #f2b59e;
  img {
    margin-top: 4px;
    padding: 2px;
  }
}
.logistics-icon {
  background-color: #cde6ef;
  img {
    margin-top: 4px;
    padding: 1px;
  }
}
.cleaning-icon {
  background-color: #f0eeae;
  img {
    margin-top: 4px;
    padding: 1px;
  }
}
.username {
  margin-right: 30px;
}
</style>
