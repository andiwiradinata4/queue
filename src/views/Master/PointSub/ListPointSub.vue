<template>
  <v-app id="list-point">
    <div id="btn-queue" class="d-flex flex-row btn-header">
      <div class="list-title">
        {{ title }}
      </div>

      <v-spacer></v-spacer>

      <div id="btn-point">
        <router-link to="/pointsub-detail/0">
          <Button :callBack="pNew" :properties="btnNew" />
        </router-link>
        <Button :callBack="pRefresh" :properties="btnRefresh" />
      </div>
    </div>
    <v-divider></v-divider>

    <v-container>
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
                  :headers="itemDataTable.headers"
                  :items="itemDataTable.data"
                  :search="search"
                  multi-sort
                  fixed-header
                  :height="tableHeight"
                >
                  <template v-slot:item.Status="{ item }">
                    <v-chip
                      class="status-chip ma-2"
                      :color="pSetColor(item.Status)"
                      dark
                    >
                      {{ item.Status }}
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
  </v-app>
</template>

<script>
import Button from "@/components/Button.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  name: "ListPoint",
  components: {
    Button,
    Snackbar,
  },
  data() {
    return {
      title: "Point Sub",
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
      btnRefresh: {
        icon: "refresh",
        text: "Refresh",
        color: "primary",
      },
      search: "",
      itemDataTable: {
        headers: [
          {
            text: "#",
            value: "action",
            align: "center",
            sortable: false,
            width: "80",
          },
          { text: "Point", value: "Point", align: "center" },
          {
            text: "Point Sub Description",
            value: "PointSubDescription",
            align: "center",
          },
          { text: "Status", value: "Status", align: "center" },
        ],
        data: [
          {
            ID: 1,
            Point: "Park Area",
            PointSubDescription: "Park Area 1",
            Status: "ACTIVE",
          },
          {
            ID: 2,
            Point: "Park Area",
            PointSubDescription: "Park Area 2",
            Status: "ACTIVE",
          },
          {
            ID: 3,
            Point: "Security",
            PointSubDescription: "Security 1",
            Status: "ACTIVE",
          },
          {
            ID: 4,
            Point: "Security",
            PointSubDescription: "Security 2",
            Status: "ACTIVE",
          },
          {
            ID: 5,
            Point: "Laboratory",
            PointSubDescription: "Laboratory 1",
            Status: "ACTIVE",
          },
          {
            ID: 6,
            Point: "Laboratory",
            PointSubDescription: "Laboratory 2",
            Status: "ACTIVE",
          },
          {
            ID: 7,
            Point: "Unloading Station",
            PointSubDescription: "Unloading Station 1",
            Status: "ACTIVE",
          },
          {
            ID: 8,
            Point: "Unloading Station",
            PointSubDescription: "Unloading Station 2",
            Status: "ACTIVE",
          },
        ],
      },
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
  computed: {
    tableHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 300;
        case "md":
          return 300;
        case "lg":
          return 350;
        default:
          return 600;
      }
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
</style>