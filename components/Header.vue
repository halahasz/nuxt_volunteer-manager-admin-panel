<template>
  <div>
    <section class="upper-header">
      <div class="header-container">
        <nuxt-link to="/" class="logo-link">
          <h1 class="logo">Volunteers Organizer</h1>
        </nuxt-link>
        <div class="icons-container">
          <button class="login" @click="login">Login</button>
          <button class="register">Register</button>
          <LoginModal />
          <!-- <a href>
            <img src="~/assets/img/icons/settings.svg" alt class="settings-icon" />
          </a>
          <a href>
            <img src="~/assets/img/icons/logout.svg" alt class="settings-icon" />
          </a> -->
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
          <nuxt-link to="/social" class="people-icon icon">
            <img
              src="~/assets/img/icons/people.png"
              alt
              class="settings-icon"
            />
          </nuxt-link>
          <nuxt-link to="/waitress" class="waitress-icon icon">
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
          </nuxt-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import LoginModal from "@/components/shared/LoginModal";
export default {
  components: {
    LoginModal
  },
  methods: {
    login() {
      this.$store.dispatch("volunteer/openLoginModal");
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
}
.register {
  font-weight: 600;
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
</style>
