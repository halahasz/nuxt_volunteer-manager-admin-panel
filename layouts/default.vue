<template>
  <div>
    <Header />
    <div class="content">
      <h1>{{this.$store.state.volunteer.title}}</h1>
      <button class="plus-button" @click="onClickPlus">
        <img src="~/assets/img/icons/plus.svg" alt class="settings-icon" />
      </button>
      <Modal />
      <div class="cards-head">
        <p class="photo-heading">photo</p>
        <p class="name-heading">name</p>
        <p class="age-heading">age</p>
        <p class="mail-heading">e-mail</p>
        <p class="date-heading">joining date</p>
        <p class="section-heading">section</p>
      </div>
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Modal from "@/components/shared/Modal";
export default {
  components: {
    Header,
    Modal
  },
  methods: {
    onClickPlus() {
      this.$store.dispatch("volunteer/openModal");
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap&subset=latin-ext");

*,
*::before,
*::after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  font-size: 62.5%;
}

body {
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
  font-family: "Open Sans", sans-serif;
  background-color: #f7f7f7;
}
.content {
  max-width: 1150px;
  margin: 0 auto;
  margin-top: 40px;
  position: relative;
}
h1 {
  text-align: center;
  font-size: 20px;
  margin: 0;
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
  top: 0px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 10px;
  }
}
.cards-head {
  max-width: 1150px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.photo-heading {
  margin: 0 20px;
  color: #5f5f5f;
}
.name-heading {
  margin-left: 50px;
  width: 17%;
  color: #5f5f5f;
}
.mail-heading {
  margin-left: 85px;
  width: 20%;
  color: #5f5f5f;
}
.age-heading {
  margin-left: 40px;
  width: 2%;
  color: #5f5f5f;
}
.date-heading {
  margin-left: 80px;
  width: 8%;
  color: #5f5f5f;
}
.section-heading {
  margin-left: 40px;
  color: #5f5f5f;
}
</style>
