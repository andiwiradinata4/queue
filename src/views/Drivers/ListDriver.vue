<template>
  <v-app>
    <Title v-bind:title="title" />

    <v-container>
      <template>
        <v-row id="btn-driver" class="d-flex flex-row-reverse">
          <Button :callback="pRefresh" :properties="btnRefresh" />
          <Button :callback="pNew" :properties="btnNew" />
          <Button :callback="pNew" :properties="btnNew" />
        </v-row>
      </template>

      <v-row class="mt-0">
        <v-col cols="12">
          <template>
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <template>
                <v-data-table
                  :headers="headers"
                  :items="itemDataTable"
                  :search="search"
                  multi-sort
                >
                  <template v-slot:item.status="{ item }">
                    <v-chip
                      class="status-chip ma-2"
                      :color="pSetColor(item.status)"
                      dark
                    >
                      {{ item.status }}
                    </v-chip>
                  </template>

                  <template v-slot:item.action="{ item }">
                    <v-btn icon @click="pView(item.id)">
                      <v-icon small color="#304457">fas fa-edit</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </template>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>

    <Snackbar v-bind:properties="snackbar" />

    <v-dialog v-model="dialog" fullscreen persistent scrollable>
      <v-card>
        <v-card-title class="headline blue-grey lighten-5">
          Create New Driver
          <v-spacer></v-spacer>

          <Button :callback="pNew" :properties="btnSave" />
          <Button :callback="pClose" :properties="btnClose" />
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non eos
          architecto fugit mollitia unde maxime sapiente nihil sunt quod velit
          facere, quos ipsa in, veritatis magni quidem blanditiis adipisci
          laborum.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit,
          officia expedita rerum pariatur sint suscipit quo, amet voluptates
          culpa repellendus magni excepturi! Est dolores dicta illo distinctio
          possimus in mollitia!
          <br />
          <br />
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab excepturi
          fugit corporis molestias, fugiat rerum illum distinctio rem, deleniti
          nihil quidem tempora sint dolorem alias eum, natus assumenda ducimus
          harum!

          <br />
          <br />
          <br />
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab excepturi
          fugit corporis molestias, fugiat rerum illum distinctio rem, deleniti
          nihil quidem tempora sint dolorem alias eum, natus assumenda ducimus
          harum!

          <br />
          <br />
          <br />
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab excepturi
          fugit corporis molestias, fugiat rerum illum distinctio rem, deleniti
          nihil quidem tempora sint dolorem alias eum, natus assumenda ducimus
          harum!
          <br />
          <br />
          <br />
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab excepturi
          fugit corporis molestias, fugiat rerum illum distinctio rem, deleniti
          nihil quidem tempora sint dolorem alias eum, natus assumenda ducimus
          harum!
          <br />
          <br />
          <br />
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab excepturi
          fugit corporis molestias, fugiat rerum illum distinctio rem, deleniti
          nihil quidem tempora sint dolorem alias eum, natus assumenda ducimus
          harum!
          <br />
          <br />
          <br />
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab excepturi
          fugit corporis molestias, fugiat rerum illum distinctio rem, deleniti
          nihil quidem tempora sint dolorem alias eum, natus assumenda ducimus
          harum!
          <br />
          <br />
          <br />
          <br />
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab excepturi
          fugit corporis molestias, fugiat rerum illum distinctio rem, deleniti
          nihil quidem tempora sint dolorem alias eum, natus assumenda ducimus
          harum!
        </v-card-text>

        <!-- <v-divider></v-divider>

        <v-card-actions>
          <Button :callback="pNew" :properties="btnSave" />
          <Button :callback="pClose" :properties="btnClose" />
          <v-spacer></v-spacer>
        </v-card-actions>
        <v-card-actions>
          <Button :callback="pNew" :properties="btnSave" />
          <Button :callback="pClose" :properties="btnClose" />
          <v-spacer></v-spacer>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Title from "@/components/ViewTitle.vue";
import Button from "@/components/Button.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  name: "ListDriver",
  components: { Title, Button, Snackbar },
  data() {
    return {
      title: "Driver",
      dialog: false,
      snackbar: {
        isActive: false,
        text: "",
        color: "primary",
      },
      btnNew: {
        icon: "add_circle_outline",
        text: "New",
        color: "primary",
      },
      btnDetail: {
        icon: "mode_edit",
        text: "Edit",
        color: "primary",
      },
      btnRefresh: {
        icon: "refresh",
        text: "Refresh",
        color: "primary",
      },
      btnSave: {
        icon: "done",
        text: "Save",
        color: "primary",
      },
      btnClose: {
        icon: "close",
        text: "Close",
        color: "normal",
        outlined: true,
      },
      search: "",
      headers: [
        { text: "#", value: "action", align: "center", sortable: false },
        {
          text: "DESSERT (100G SERVING)",
          value: "name",
        },
        { text: "CALORIES", value: "calories" },
        { text: "FAT (G)", value: "fat" },
        { text: "CARBS (G)", value: "carbs" },
        { text: "PROTEIN (G)", value: "protein" },
        { text: "IRON (%)", value: "iron" },
        { text: "STATUS", value: "status" },
      ],
      itemDataTable: [
        {
          id: 1,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
          status: "IN-ACTIVE",
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
          status: "BLACKLIST",
        },
        {
          id: 3,
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
          status: "ACTIVE",
        },
        {
          id: 4,
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
          status: "ACTIVE",
        },
        {
          id: 5,
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
          status: "ACTIVE",
        },
        {
          id: 6,
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
          status: "ACTIVE",
        },
        {
          id: 7,
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
          status: "ACTIVE",
        },
        {
          id: 8,
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
          status: "ACTIVE",
        },
        {
          id: 9,
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
          status: "ACTIVE",
        },
        {
          id: 10,
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
          status: "ACTIVE",
        },

        {
          id: 1,
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
          status: "IN-ACTIVE",
        },
        {
          id: 2,
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%",
          status: "BLACKLIST",
        },
        {
          id: 3,
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%",
          status: "ACTIVE",
        },
        {
          id: 4,
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%",
          status: "ACTIVE",
        },
        {
          id: 5,
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%",
          status: "ACTIVE",
        },
        {
          id: 6,
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%",
          status: "ACTIVE",
        },
        {
          id: 7,
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%",
          status: "ACTIVE",
        },
        {
          id: 8,
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%",
          status: "ACTIVE",
        },
        {
          id: 9,
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%",
          status: "ACTIVE",
        },
        {
          id: 10,
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%",
          status: "ACTIVE",
        },
      ],
    };
  },
  methods: {
    pNew() {
      this.dialog = true;
    },
    pView(data) {
      console.log("Press detail " + data);
    },
    pRefresh() {
      this.snackbar.isActive = true;
      this.snackbar.text = "Press refresh";
    },
    pClose() {
      this.dialog = false;
    },
    pSetColor(data) {
      if (data == "IN-ACTIVE") return "pink";
      if (data == "BLACKLIST") return "normal";
      else return "success";
    },
  },
};
</script>

<style scoped>
.v-chip.v-size--default {
  width: 100px;
  display: inline-block !important;
  text-align: center;
}
#btn-driver {
  margin: 2px;
}
</style>
