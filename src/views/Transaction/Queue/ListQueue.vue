<template>
  <v-app>
    <v-container class="pa-0 ml-0 mr-0">
      <div class="list-title ml-5 pb-2 mt-2">
        {{ title }}
        <FloatButton :callBack="pFilter" :properties="btnFilter" />
        <FloatButton :callBack="pNew" :properties="btnNew" />
        <FloatButton :callBack="pRefresh" :properties="btnRefresh" />
        <FloatButton :callBack="pArrangement" :properties="btnArrangement" />
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
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.company.value"
                    clearable
                    :label="filter.field.company.label"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.location.value"
                    clearable
                    :label="filter.field.location.label"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.division.value"
                    clearable
                    :label="filter.field.division.label"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.subdivision.value"
                    clearable
                    :label="filter.field.subdivision.label"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.dateFrom.value"
                    clearable
                    :label="filter.field.dateFrom.label"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.dateTo.value"
                    clearable
                    :label="filter.field.dateTo.label"
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
              <v-card-title class="pt-0 pb-2">
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
                  <template v-slot:item.IsCompleted="{ item }">
                    <v-simple-checkbox v-model="item.IsCompleted" disabled></v-simple-checkbox>
                  </template>
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
                          {{ item.ID }}
                          <v-icon>expand_more</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item link :to="'/queue-detail/' + item.ID">
                          <v-list-item-title>
                            <v-icon class="mr-5">edit</v-icon>Detail
                          </v-list-item-title>
                        </v-list-item>

                        <v-list-item link to="#">
                          <v-list-item-title>
                            <v-icon class="mr-5">delete</v-icon>Delete
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item link :to="'/queue-position/' + item.ID">
                          <v-list-item-title>
                            <v-icon class="mr-5">place</v-icon>Queue Position
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
  name: "ListQueue",
  components: {
    Button,
    FloatButton,
    Snackbar
  },
  data() {
    return {
      title: "Queue",
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
      btnDetail: {
        icon: "mode_edit",
        text: "Edit",
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
      btnArrangement: {
        icon: "add_location_alt",
        text: "Arrangement",
        color: "primary",
        outlined: false
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
          },
          division: {
            id: 0,
            value: "",
            label: "Division"
          },
          subdivision: {
            id: 0,
            value: "",
            label: "Subdivision"
          },
          dateFrom: {
            value: "",
            label: "Date From"
          },
          dateTo: {
            value: "",
            label: "Date To"
          }
        }
      },
      itemDataTable: {
        headers: [
          { text: "ID", value: "ID", width: "180", align: "center" },
          {
            text: "Queue Number",
            value: "QueueNumber",
            width: "150",
            align: "center"
          },
          {
            text: "Queue Date",
            value: "QueueDate",
            width: "150"
          },
          { text: "Plat Number", value: "PlatNumber", width: "150" },
          { text: "Driver", value: "Driver", width: "180" },
          {
            text: "SPB Number",
            value: "SPBNumber",
            width: "180"
          },
          { text: "RFID", value: "RFID", width: "150" },
          { text: "Arrival ID", value: "ArrivalID", width: "150" },
          { text: "Queue Position", value: "QueuePosition", width: "200" },
          {
            text: "Queue Position Detail",
            value: "QueuePositionDetail",
            width: "200"
          },
          { text: "Unloading Slot", value: "UnloadingSlot", width: "200" },
          {
            text: "Completed By",
            value: "CompletedBy",
            width: "150"
          },
          {
            text: "Completed Date",
            value: "CompletedDate",
            width: "150"
          },
          {
            text: "IsCompleted",
            value: "IsCompleted",
            width: "120",
            align: "center"
          },
          { text: "Remarks", value: "Remarks", width: "200" },
          { text: "Status", value: "Status", align: "center" }
        ],
        data: [
          {
            ID: "20210401-KM1-0001",
            QueueNumber: 1,
            QueueDate: "01/04/2021",
            PlatNumber: "BK0012XX",
            DateOfBirth: "01/12/1998",
            Driver: "Budiman Aja",
            SPBNumber: "MM-02-F-20210101",
            RFID: "-",
            ArrivalID: "E20210401001",
            QueuePosition: "Park Area",
            QueuePositionDetail: "Park Area 1",
            UnloadingSlot: "Unloading Station 1",
            CompletedBy: "ADMIN",
            CompletedDate: "12/04/2021",
            IsCompleted: false,
            Remarks: "",
            Status: "On Progress"
          },
          {
            ID: "20210401-KM1-0002",
            QueueNumber: 2,
            QueueDate: "01/04/2021",
            PlatNumber: "BK0012XX",
            DateOfBirth: "01/12/1998",
            Driver: "Budiman Aja",
            SPBNumber: "MM-02-F-20210101",
            RFID: "-",
            ArrivalID: "E20210401001",
            QueuePosition: "Park Area",
            QueuePositionDetail: "Park Area 1",
            UnloadingSlot: "Unloading Station 2",
            CompletedBy: "ADMIN",
            CompletedDate: "12/04/2021",
            IsCompleted: false,
            Remarks: "",
            Status: "On Progress"
          },
          {
            ID: "20210401-KM1-0003",
            QueueNumber: 3,
            QueueDate: "01/04/2021",
            PlatNumber: "BK0012XX",
            DateOfBirth: "01/12/1998",
            Driver: "Budiman Aja",
            SPBNumber: "MM-02-F-20210101",
            RFID: "-",
            ArrivalID: "E20210401001",
            QueuePosition: "Park Area",
            QueuePositionDetail: "Park Area 1",
            UnloadingSlot: "Unloading Station 1",
            CompletedBy: "ADMIN",
            CompletedDate: "12/04/2021",
            IsCompleted: false,
            Remarks: "",
            Status: "On Progress"
          },
          {
            ID: "20210401-KM1-0004",
            QueueNumber: 4,
            QueueDate: "01/04/2021",
            PlatNumber: "BK0012XX",
            DateOfBirth: "01/12/1998",
            Driver: "Driver 1",
            SPBNumber: "MM-02-F-20210101",
            RFID: "-",
            ArrivalID: "E20210401001",
            QueuePosition: "Park Area",
            QueuePositionDetail: "Park Area 1",
            UnloadingSlot: "Unloading Station 1",
            CompletedBy: "ADMIN",
            CompletedDate: "12/04/2021",
            IsCompleted: false,
            Remarks: "",
            Status: "On Progress"
          },
          {
            ID: "20210401-KM1-0005",
            QueueNumber: 5,
            QueueDate: "01/04/2021",
            PlatNumber: "BK0012XX",
            DateOfBirth: "01/12/1998",
            Driver: "Driver 2",
            SPBNumber: "MM-02-F-20210101",
            RFID: "-",
            ArrivalID: "E20210401001",
            QueuePosition: "Park Area",
            QueuePositionDetail: "Park Area 1",
            UnloadingSlot: "Unloading Station 2",
            CompletedBy: "ADMIN",
            CompletedDate: "12/04/2021",
            IsCompleted: false,
            Remarks: "",
            Status: "On Progress"
          },
          {
            ID: "20210401-KM1-0006",
            QueueNumber: 6,
            QueueDate: "01/04/2021",
            PlatNumber: "BK0012XX",
            DateOfBirth: "01/12/1998",
            Driver: "Driver 3",
            SPBNumber: "MM-02-F-20210101",
            RFID: "-",
            ArrivalID: "E20210401001",
            QueuePosition: "Unloading Station",
            QueuePositionDetail: "Unloading Station 1",
            UnloadingSlot: "Unloading Station 1",
            CompletedBy: "ADMIN",
            CompletedDate: "12/04/2021",
            IsCompleted: true,
            Remarks: "",
            Status: "Closed"
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
      this.$router.replace({ path: "/queue-detail/0" });
    },
    pView(data) {
      console.log("Press detail " + data);
    },
    pRefresh() {
      this.snackbar.isActive = true;
      this.snackbar.text = "Press refresh";
    },
    pArrangement() {
      this.$router.replace({ path: "/queue-arrangement" });
    },
    pSetColor(data) {
      if (data == "On Progress") return "yellow darken-3";
      if (data == "Closed") return "success";
      else return "normal";
    },
    pSaveFilter() {
      console.log(`Company: ${this.filter.field.company.value}`);
      this.filter.value = false;
    },
    pCloseFilter() {
      this.filter.value = false;
    }
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
          return 400;
        default:
          return 700;
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