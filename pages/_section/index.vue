<template>
  <v-app>
    <EditVolunteerModal :cardData="activeCard" />
    <v-container class="volunteers-container">
      <template>
        <v-data-table
          :headers="headers"
          :items="volunteers"
          class="volunteers-table"
          show-select
          v-model="selected"
          :search="search"
          color="accent"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-btn
                :disabled="!selected.length"
                color="warning"
                dark
                class="mb-2"
                @click="removeItems"
                >USUŃ ZAZNACZONE</v-btn
              >
              <v-spacer></v-spacer>
              <v-text-field
                color="primary"
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="search-field"
              ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
                :class="{
                  'v-data-table__selected': selected.includes(item)
                }"
              >
                <td>
                  <v-checkbox
                    v-model="selected"
                    :value="item"
                    color="#5eb5ad"
                    class="custom-checkbox"
                  />
                </td>
                <td class="text-start">
                  <div class="td-wrapper">
                    <div
                      class="avatar"
                      :style="{
                        backgroundImage: `url(${require(`@/assets/img/avatars/1.jpg`)})`
                      }"
                    ></div>
                    <div class="breakline"></div>
                  </div>
                </td>
                <td class="text-start">
                  <div class="td-wrapper">
                    <p>{{ item.name }}</p>
                    <div class="breakline"></div>
                  </div>
                </td>
                <td class="text-start">
                  <div class="td-wrapper">
                    <p>{{ item.age }}</p>
                    <div class="breakline"></div>
                  </div>
                </td>
                <td class="text-start">
                  <div class="td-wrapper">
                    <p>{{ item.email }}</p>
                    <div class="breakline"></div>
                  </div>
                </td>
                <td class="text-start">
                  <div class="td-wrapper">
                    <p>{{ item.date | formatDate }}</p>
                    <div class="breakline"></div>
                  </div>
                </td>
                <td class="text-start">
                  <div class="td-wrapper">
                    <p>{{ item.section }}</p>
                    <div class="breakline"></div>
                  </div>
                </td>
                <td class="text-start">
                  <button class="pen-button" @click="onClickEdit(item)">
                    <img
                      src="~/assets/img/icons/edit.svg"
                      alt
                      class="settings-icon"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
        <p v-if="!volunteers.length" class="no-items">No products</p>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/Header";
import EditVolunteerModal from "@/components/modals/EditVolunteerModal";

export default {
  components: {
    Header,
    EditVolunteerModal
  },
  data: () => ({
    search: "",
    selected: [],
    headers: [
      { text: "Thumbnail", value: "thumbnail" },
      { text: "Name", value: "name" },
      { text: "Age", value: "age" },
      { text: "E-mail", value: "email" },
      { text: "Joining date", value: "date" },
      { text: "Section", value: "section" },
      { text: "", value: "actions", sortable: false }
    ],
    activeCard: {}
  }),
  computed: {
    ...mapGetters({
      volunteers: "getVolunteers"
    })
  },
  fetch({ store }) {
    return store.dispatch("fetchVolunteers");
  },
  methods: {
    activateCard(card) {
      this.$store.dispatch("openEditModal");
      this.activeCard = { ...card };
    },
    onClickPlus() {
      this.$store.dispatch("openModal");
    },
    onClickEdit(item) {
      this.activeCard = { ...item };
      this.$store.dispatch("openEditModal");
    },
    removeItems() {
      confirm("Are you sure you want to delete these items?") &&
        this.selected.forEach(el => {
          this.$store.dispatch("removeVolunteer", el.id);
        });
      this.selected = [];
    }
  }
};
</script>
<style lang="scss">
.no-items {
  width: 100%;
  text-align: center;
}
.v-toolbar__content {
  padding: 0;
}
.search-field {
  max-width: 350px;
}
.volunteers-container {
  padding: 0;
}
.card-wrapper {
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  margin-bottom: 3px;
  display: flex;
  align-items: center;
}
.avatar {
  height: 45px;
  margin: 13px 0px;
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
