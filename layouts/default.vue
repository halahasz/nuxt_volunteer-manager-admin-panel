<template>
  <v-app>
    <div>
      <Header />
      <div class="content">
        <h1 v-if="this.$store.state.volunteer.volunteers.length">
          {{ this.$store.state.volunteer.title }}
        </h1>
        <h1 v-else>{{ this.$store.state.volunteer.noVolunteers }}</h1>
        <button class="plus-button" @click="onClickPlus">
          <img src="~/assets/img/icons/plus.svg" alt class="settings-icon" />
        </button>
        <Modal />
        <EditCardModal :cardData="activeCard" />
        <!-- <div
        v-if="this.$store.state.volunteer.volunteers.length"
        class="cards-head"
      >
        <p class="item-heading" style="width: 15%">photo</p>
        <p class="item-heading" style="width: %">name</p>
        <p class="age-heading">age</p>
        <p class="mail-heading">e-mail</p>
        <p class="date-heading">joining date</p>
        <p class="section-heading">section</p>
      </div> -->

        <v-container>
          <template>
            <v-data-table
              :headers="headers"
              :items="this.$store.state.volunteer.volunteers"
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
                      <button class="pen-button" @click="onClickEdit">
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
              <template v-slot:no-data>
                <p>No products</p>
              </template>
            </v-data-table>
          </template>
          <!-- <vue-markdown>{{ source }}</vue-markdown> -->
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Modal from "@/components/shared/Modal";
import EditCardModal from "@/components/shared/EditCardModal";
export default {
  components: {
    Header,
    Modal,
    EditCardModal
  },
  data: () => ({
    search: "",
    selected: [],
    headers: [
      { text: "Thumbnail", value: "" },
      { text: "Name", value: "name" },
      { text: "Age", value: "age" },
      { text: "E-mail", value: "email" },
      { text: "Joining date", value: "date" },
      { text: "Section", value: "section" },
      { text: "", value: "actions", sortable: false }
    ],
    activeCard: {}
  }),
  methods: {
    activateCard(card) {
      this.$store.dispatch("volunteer/openEditModal");
      this.activeCard = { ...card };
      this.$emit("activate-card", this.activeCard);
    },
    onClickPlus() {
      this.$store.dispatch("volunteer/openModal");
    },
    onClickEdit() {
      this.$store.dispatch("volunteer/openEditModal");
    },
    removeItems() {
      confirm("Are you sure you want to delete these items?") &&
        this.selected.forEach(el => {
          this.$axios
            .delete("/api/products/" + el.id)
            .then(res => {
              const index = this.products.indexOf(el);
              this.products.splice(index, 1);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
      this.selected = [];
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
body,
.v-application--wrap {
  margin: 0;
  padding: 0;
  /* font-size: 1.6rem; */
  font-family: "Open Sans", sans-serif;
  background-color: #f7f7f7;
}

.content {
  max-width: 1150px;
  margin: 0 auto;
  margin-top: 40px;
  position: relative;
}
.v-application p {
  margin-bottom: 0;
}
.v-data-table.volunteers-table.theme--light {
  margin-top: 10px;
}
.theme--light.v-data-table thead tr:last-child th {
  border-bottom: none;
}
.theme--light.v-data-table .v-data-footer {
  border-top: none;
}
.theme--light.v-data-table tbody tr.v-data-table__selected,
.theme--light.v-data-table
  tbody
  tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #eaf6eb;
}
form .v-card__text {
  background-color: #f6f6f6;
}
.volunteers-table {
  .v-toolbar__content,
  .v-data-table-header tr,
  .v-data-footer {
    background-color: #f7f7f7;
  }
  .td-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
h1 {
  text-align: center;
  font-size: 20px;
  margin: 0;
}
.text-start {
  text-align: left;
}
.cards-head {
  max-width: 1150px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.item-heading {
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
</style>
