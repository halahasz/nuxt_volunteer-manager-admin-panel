<template>
  <div class="card-wrapper">
    <div
      class="avatar"
      :style="{
        backgroundImage: `url(${require(`@/assets/img/avatars/1.jpg`)})`
      }"
    ></div>
    <div class="breakline"></div>
    <p class="item" style="width: 15%">{{ name }}</p>
    <div class="breakline"></div>
    <p class="item" style="width: 2%">{{ age }}</p>
    <div class="breakline"></div>
    <p class="item" style="width: 25%">{{ email }}</p>
    <div class="breakline"></div>
    <p class="item" style="width: 8%">{{ date | formatDate }}</p>
    <div class="breakline"></div>
    <p class="item" style="width: 10%">{{ section }}</p>
    <!-- <p class="item" style="width: 10%">{{ String(section).replace('["', '').replace('"]', '') }}</p> -->
    <div class="breakline"></div>
    <button class="pen-button" @click="onClickEdit">
      <img src="~/assets/img/icons/edit.svg" alt class="settings-icon" />
    </button>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      moment
    };
  },
  props: {
    id: {
      required: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      required: true
    },
    email: {
      type: String,
      required: true
    },
    date: {
      required: true
    },
    section: {
      required: true
    }
  },
  methods: {
    onClickEdit() {
      this.$store.dispatch("volunteer/openEditModal");
    }
  }
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
}
.avatar {
  height: 45px;
  margin: 13px 20px;
  width: 45px;
  padding: 13px;
  border-radius: 10px;
}
.breakline {
  height: 45px;
  width: 4px;
  background-color: #f2cdcd;
}
.item {
  margin: 0 30px;
  font-size: 14px;
}
.pen-button,
.pen-button:active {
  outline: none;
  cursor: pointer;
  margin: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 60%;
  border: none;
  box-shadow: none;
  background-color: #afded9;
  img {
    width: 13px;
    height: 13px;
  }
}
</style>
