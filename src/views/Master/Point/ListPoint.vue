<template>
  <v-app>
    <v-container class="pa-0 ml-0 mr-0">
      <div class="list-title ml-5 pb-2 mt-2">
        {{ title }}
        <FloatButton :callBack="pFilter" :properties="btnFilter" />
        <FloatButton :callBack="pNew" :properties="btnNew" />
        <FloatButton :callBack="pRefresh" :properties="btnRefresh" />
      </div>

      <v-dialog
        transition="dialog-top-transition"
        persistent
        max-width="600px"
        v-model="filter.value"
        scrollable
      >
        <v-card>
          <v-card-title class="pt-5 pb-0">
            <div class="headline">Query Data By</div>
          </v-card-title>

          <v-card-text>
            <v-container fluid>
              <v-row class="pt-0">
                <v-col cols="12" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.company.value"
                    clearable
                    :label="filter.field.company.label"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="pt-0">
                <v-col cols="12" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.location.value"
                    clearable
                    :label="filter.field.location.label"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions class="pt-0">
            <v-spacer></v-spacer>
            <Button :callBack="pSaveFilter" :properties="btnSaveFilter" />
            <Button :callBack="pCloseFilter" :properties="btnCloseFilter" />
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-row class="pt-0">
        <v-col cols="12">
          <template>
            <v-card elevation="2">
              <v-card-title class="pt-0 pb-0">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  placeholder="Search"
                  hide-details
                ></v-text-field>
              </v-card-title>
              <template>
                <v-data-table
                  :headers="itemDataTable.headers"
                  :items="itemDataTable.data"
                  :search="search"
                  :height="tableHeight"
                  multi-sort
                  fixed-header
                >
                  <template v-slot:item.Status="{ item }">
                    <v-chip
                      class="status-chip ma-2"
                      :color="pSetColor(item.Status)"
                      dark
                    >{{ item.Status }}</v-chip>
                  </template>

                  <template v-slot:item.ID="{ item }">
                    <v-menu transition="slide-y-transition" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined v-bind="attrs" v-on="on" class="pl-2 pr-1">
                          {{item.ID}}
                          <v-icon>expand_more</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item link :to="'/point-detail/' + item.ID">
                          <v-list-item-title>
                            <v-icon class="mr-5">edit</v-icon>Detail
                          </v-list-item-title>
                        </v-list-item>

                        <v-list-item link to="#">
                          <v-list-item-title>
                            <v-icon class="mr-5">delete</v-icon>Delete
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
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
import FloatButton from "@/components/FloatButton.vue";

import Snackbar from "@/components/Snackbar.vue";

export default {
  name: "ListPoint",
  components: {
    Button,
    FloatButton,
    Snackbar
  },
  data() {
    return {
      title: "Point",
      snackbar: {
        isActive: false,
        text: "",
        color: "primary"
      },

      btnFilter: {
        icon: "filter_alt",
        text: "Filter",
        color: "primary"
      },
      btnNew: {
        icon: "mdi-plus",
        text: "New",
        color: "primary"
      },
      btnRefresh: {
        icon: "refresh",
        text: "Refresh",
        color: "primary"
      },
      btnSaveFilter: {
        icon: "done",
        text: "Save",
        color: "primary"
      },
      btnCloseFilter: {
        icon: "close",
        text: "Close",
        color: "primary",
        outlined: true
      },
      search: "",
      filter: {
        value: false,
        field: {
          company: {
            id: 0,
            value: "",
            label: "Company"
          },
          location: {
            id: 0,
            value: "",
            label: "Location"
          }
        }
      },
      itemDataTable: {
        headers: [
          {
            text: "ID",
            value: "ID",
            align: "center",
            width: "80"
          },
          { text: "Company", value: "Company", align: "left" },
          { text: "Location", value: "Location", align: "left" },
          { text: "Description", value: "Description", align: "left" },
          { text: "Status", value: "Status", align: "center" }
        ],
        data: [
          {
            ID: 1,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 1",
            Description: "Park Area",
            Status: "ACTIVE"
          },
          {
            ID: 2,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 1",
            Description: "Security",
            Status: "ACTIVE"
          },
          {
            ID: 3,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 1",
            Description: "Weighbridge",
            Status: "ACTIVE"
          },
          {
            ID: 4,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 1",
            Description: "Laboratory",
            Status: "ACTIVE"
          },
          {
            ID: 5,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 1",
            Description: "Unloading Station",
            Status: "ACTIVE"
          },
          {
            ID: 6,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 2",
            Description: "Park Area",
            Status: "ACTIVE"
          },
          {
            ID: 7,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 2",
            Description: "Security",
            Status: "ACTIVE"
          },
          {
            ID: 8,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 2",
            Description: "Weighbridge",
            Status: "ACTIVE"
          },
          {
            ID: 9,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 2",
            Description: "Laboratory",
            Status: "ACTIVE"
          },
          {
            ID: 10,
            Company: "MUSIM MAS, PT",
            Location: "MEDAN KIM 2",
            Description: "Unloading Station",
            Status: "ACTIVE"
          }
        ]
      }
    };
  },
  methods: {
    pFilter() {
      this.filter.value = true;
    },
    pNew() {
      this.$router.replace({ path: "/point-detail/0" });
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
    pSaveFilter() {
      console.log(`Company: ${this.filter.field.company.value}`);
      this.filter.value = false;
    },
    pCloseFilter() {
      this.filter.value = false;
    }
  },
  mounted() {
    if (this.itemDataTable.data.length == 0) {
      this.filter.value = true;
    }
    // this.filter.value = true;
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
    }
  }
};
</script>

<style scoped>
/* Container */
.container {
  max-width: 100%;
  max-height: 50%;
}

/* chip of status */
.v-chip.v-size--default {
  width: 100px;
  display: inline-block !important;
  text-align: center;
}
</style>