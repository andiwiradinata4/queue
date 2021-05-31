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
                <v-col cols="6" class="pb-0 pt-1">
                  <Company
                    :dialog="filter.field.company.dialog"
                    :id="filter.field.company.id"
                    :value="filter.field.company.value"
                    :label="filter.field.company.label"
                  />

                  <!-- <v-dialog
                    ref="dialog"
                    v-model="filter.field.company.dialog"
                    :return-value.sync="filter.field.company.value"
                    width="800px"
                  >
                    <template v-slot:activator="{on, attrs}">
                      <v-text-field
                        v-model="filter.field.company.value"
                        clearable
                        :label="filter.field.company.label"
                        append-icon="search"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>

                    <v-card>
                      <v-card-title class="pt-0 pb-2">
                        <v-text-field
                          v-model="filter.field.company.search"
                          append-icon="mdi-magnify"
                          placeholder="Search"
                          hide-details
                        ></v-text-field>
                      </v-card-title>

                      <template>
                        <v-data-table
                          :height="tableHeight"
                          :headers="itemDataTable.headers"
                          :items="itemDataTable.data"
                          :search="search"
                          fixed-header
                          multi-sort
                        >
                          <template v-slot:item.Status="{ item }">
                            <v-chip
                              class="status-chip ma-2"
                              :color="pSetColor(item.Status)"
                              dark
                            >{{ item.Status }}</v-chip>
                          </template>

                          <template v-slot:item.IDCard="{ item }">
                            <v-menu transition="slide-y-transition" bottom>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn outlined v-bind="attrs" v-on="on" class="pl-2 pr-1">
                                  {{item.IDCard}}
                                  <v-icon>expand_more</v-icon>
                                </v-btn>
                              </template>

                              <v-list>
                                <v-list-item link :to="'/driver-detail/' + item.id">
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
                  </v-dialog> -->
                </v-col>
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.location.value"
                    clearable
                    :label="filter.field.location.label"
                    append-icon="search"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.division.value"
                    clearable
                    :label="filter.field.division.label"
                    append-icon="search"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.subdivision.value"
                    clearable
                    :label="filter.field.subdivision.label"
                    append-icon="search"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.idCard.value"
                    clearable
                    :label="filter.field.idCard.label"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="pb-0 pt-1">
                  <v-text-field
                    v-model="filter.field.fullName.value"
                    clearable
                    :label="filter.field.fullName.label"
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
                  :height="tableHeight"
                  :headers="itemDataTable.headers"
                  :items="itemDataTable.data"
                  :search="search"
                  fixed-header
                  multi-sort
                >
                  <template v-slot:item.Status="{ item }">
                    <v-chip
                      class="status-chip ma-2"
                      :color="pSetColor(item.Status)"
                      dark
                    >{{ item.Status }}</v-chip>
                  </template>

                  <template v-slot:item.IDCard="{ item }">
                    <v-menu transition="slide-y-transition" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined v-bind="attrs" v-on="on" class="pl-2 pr-1">
                          {{item.IDCard}}
                          <v-icon>expand_more</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item link :to="'/driver-detail/' + item.id">
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
import Company from "@/components/Company.vue";

export default {
  name: "ListDriver",
  components: {
    Button,
    FloatButton,
    Snackbar,
    Company
  },
  data() {
    return {
      title: "Driver",
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
            id: "",
            value: "",
            label: "Company",
            dialog: false,
            search: ""
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
          idCard: {
            value: "",
            label: "ID Card"
          },
          fullName: {
            value: "",
            label: "Full Name"
          }
        }
      },
      itemDataTable: {
        headers: [
          { text: "ID Card", value: "IDCard" },
          { text: "Full Name", value: "FullName", width: "200" },
          { text: "Place of Birth", value: "PlaceOfBirth", width: "150" },
          { text: "Date of Birth ", value: "DateOfBirth", width: "150" },
          { text: "Gender", value: "Gender", width: "120" },
          {
            text: "Blood Type",
            value: "BloodType",
            width: "120",
            align: "center"
          },
          { text: "Address", value: "Address", width: "500" },
          { text: "Religion", value: "Religion" },
          { text: "Marital Status", value: "MaritalStatus" },
          { text: "Nationality", value: "Nationality", width: "120" },
          { text: "Occupation", value: "Occupation", width: "180" },
          { text: "Valid Thru", value: "ValidThru", width: "180" },
          { text: "Card Type", value: "CardType", width: "180" },
          { text: "Internal Remarks", value: "InternalRemarks", width: "200" },
          { text: "Status", value: "Status", align: "center" }
        ],
        data: [
          {
            id: 1,
            IDCard: "1218022911980001",
            FullName: "Budiman Aja",
            PlaceOfBirth: "Medan",
            DateOfBirth: "01/12/1998",
            Gender: "Male",
            BloodType: "-",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Islam",
            MaritalStatus: "Single",
            Nationality: "WNI",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Identity Card",
            InternalRemarks: "",
            Status: "ACTIVE"
          },
          {
            id: 2,
            IDCard: "1218022911980002",
            FullName: "Driver 1",
            PlaceOfBirth: "Medan",
            DateOfBirth: "01/03/1988",
            Gender: "Male",
            BloodType: "-",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Islam",
            MaritalStatus: "Married",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Identity Card",
            InternalRemarks: "",
            Status: "IN-ACTIVE"
          },
          {
            id: 3,
            IDCard: "1218022911980003",
            FullName: "Driver 2",
            PlaceOfBirth: "Medan",
            DateOfBirth: "31/03/1988",
            Gender: "Male",
            BloodType: "-",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Islam",
            MaritalStatus: "Married",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Identity Card",
            InternalRemarks: "",
            Status: "ACTIVE"
          },
          {
            id: 4,
            IDCard: "1218022911980004",
            FullName: "Driver 3",
            PlaceOfBirth: "Medan",
            DateOfBirth: "31/01/1988",
            Gender: "Male",
            BloodType: "-",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Islam",
            MaritalStatus: "Married",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Driving License",
            InternalRemarks: "",
            Status: "ACTIVE"
          },
          {
            id: 5,
            IDCard: "1218022911980005",
            FullName: "Driver 4",
            PlaceOfBirth: "Medan",
            DateOfBirth: "01/03/1988",
            Gender: "Male",
            BloodType: "-",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Islam",
            MaritalStatus: "Married",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Driving License",
            InternalRemarks: "",
            Status: "BLACKLIST"
          },
          {
            id: 6,
            IDCard: "1218022911980005",
            FullName: "Driver 5",
            PlaceOfBirth: "Medan",
            DateOfBirth: "01/03/1988",
            Gender: "Male",
            BloodType: "A",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Buddha",
            MaritalStatus: "Single",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Driving License",
            InternalRemarks: "",
            Status: "ACTIVE"
          },
          {
            id: 7,
            IDCard: "1218022911980007",
            FullName: "Driver 7",
            PlaceOfBirth: "Medan",
            DateOfBirth: "01/03/1988",
            Gender: "Male",
            BloodType: "O",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Hindu",
            MaritalStatus: "Married",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Identity Card",
            InternalRemarks: "",
            Status: "IN-ACTIVE"
          },
          {
            id: 8,
            IDCard: "1218022911980008",
            FullName: "Driver 8",
            PlaceOfBirth: "Medan",
            DateOfBirth: "01/03/1988",
            Gender: "Male",
            BloodType: "AB",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Konghucu",
            MaritalStatus: "Married",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Identity Card",
            InternalRemarks: "",
            Status: "ACTIVE"
          },
          {
            id: 9,
            IDCard: "1218022911980009",
            FullName: "Driver 9",
            PlaceOfBirth: "Medan",
            DateOfBirth: "01/03/1988",
            Gender: "Male",
            BloodType: "-",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Islam",
            MaritalStatus: "Married",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Driving License",
            InternalRemarks: "",
            Status: "ACTIVE"
          },
          {
            id: 10,
            IDCard: "1218022911980010",
            FullName: "Driver 9",
            PlaceOfBirth: "Medan",
            DateOfBirth: "01/03/1988",
            Gender: "Male",
            BloodType: "-",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Islam",
            MaritalStatus: "Married",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Driving License",
            InternalRemarks: "",
            Status: "BLACKLIST"
          },
          {
            id: 11,
            IDCard: "1218022911980011",
            FullName: "Driver 10",
            PlaceOfBirth: "Medan",
            DateOfBirth: "01/03/1988",
            Gender: "Male",
            BloodType: "-",
            Address: "Jl. Abcd No. 1A, Sitirejo I, Medan Kota",
            Religion: "Islam",
            MaritalStatus: "Married",
            Nationality: "WNA",
            Occupation: "General Employees",
            ValidThru: "No Expired",
            CardType: "Driving License",
            InternalRemarks: "",
            Status: "BLACKLIST"
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
      this.$router.replace({ path: "/driver-detail/0" });
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
      console.log(`Company: ${this.filter.field.company.id} | ${this.filter.field.company.value}`);
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
