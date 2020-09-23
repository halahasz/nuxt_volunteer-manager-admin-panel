<template>
  <v-app>
    <EditCardModal :cardData="activeCard" />
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
          <template v-slot:no-data>
            <p>No products</p>
          </template>
        </v-data-table>
      </template>
      <!-- <vue-markdown>{{ source }}</vue-markdown> -->
    </v-container>
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
    onClickEdit(item) {
      this.$store.dispatch("volunteer/openEditModal");
      this.activeCard = { ...item };
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
