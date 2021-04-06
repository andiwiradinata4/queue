<template>
  <v-app>
    <div id="btn-driver" class="d-flex flex-row btn-header">
      <div class="list-title">
        {{ title }}
      </div>
      
      <v-spacer></v-spacer>

      <div id="btn-driver">
        <router-link to="/driver-detail">
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
<!-- 
    <v-dialog v-model="dialog" persistent scrollable>
      <v-card>
        <v-card-title class="headline blue-grey lighten-5">
          Create New Driver
          <v-tabs v-model="tab" fixed-tabs background-color="transparent">
            <v-tabs-slider></v-tabs-slider>
            <v-tab href="#information" class="primary--text">
              Information
            </v-tab>
            <v-tab href="#image" class="primary--text"> Image </v-tab>
          </v-tabs>
        </v-card-title>

        <v-tabs-items v-model="tab">
          <v-tab-item value="information">
            <v-card-text>
              <v-form v-model="driver.isValid" lazy-validation>
                <v-container fluid>
                  <v-row class="mb-0 mt-2">
                    <v-col cols="4">
                      <v-text-field
                        v-model="driver.idCard"
                        :counter="16"
                        :rules="driver.idCardRules"
                        :placeholder="driver.idCardPlaceHolder"
                        outlined
                        clearable
                        :label="driver.idCardLabel"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        v-model="driver.fullName.value"
                        :rules="driver.fullName.rules"
                        :placeholder="driver.fullName.placeHolder"
                        outlined
                        clearable
                        :label="driver.fullName.label"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-0">
                    <v-col cols="4">
                      <v-text-field
                        v-model="driver.placeOfBirth.value"
                        :rules="driver.placeOfBirth.rules"
                        :placeholder="driver.placeOfBirth.placeHolder"
                        outlined
                        clearable
                        :label="driver.placeOfBirth.label"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="driver.birthDate.value"
                        :rules="driver.birthDate.rules"
                        :placeholder="driver.birthDate.placeHolder"
                        outlined
                        clearable
                        :label="driver.birthDate.label"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-select
                        v-model="driver.gender.value"
                        :items="itemsGender"
                        item-text="name"
                        item-value="id"
                        :rules="driver.gender.rules"
                        :label="driver.gender.label"
                        outlined
                        clearable
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="2">
                      <v-select
                        v-model="driver.bloodType.value"
                        :items="itemsBloodType"
                        item-text="name"
                        item-value="id"
                        :rules="driver.bloodType.rules"
                        :label="driver.bloodType.label"
                        outlined
                        clearable
                        required
                      ></v-select>
                    </v-col>
                  </v-row>

                  <v-row class="mt-0">
                    <v-col cols="4">
                      <v-textarea
                        v-model="driver.address.value"
                        :rules="driver.address.rules"
                        :placeholder="driver.address.placeHolder"
                        outlined
                        clearable
                        :label="driver.address.label"
                        counter="250"
                        rows="1"
                        auto-grow
                        required
                      ></v-textarea>
                    </v-col>

                    <v-col cols="2">
                      <v-select
                        v-model="driver.religion.value"
                        :items="itemsReligion"
                        item-text="name"
                        item-value="id"
                        :rules="driver.religion.rules"
                        :label="driver.religion.label"
                        outlined
                        clearable
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="2">
                      <v-select
                        v-model="driver.maritalStatus.value"
                        :items="itemsMaritalStatus"
                        item-text="name"
                        item-value="id"
                        :rules="driver.maritalStatus.rules"
                        :label="driver.maritalStatus.label"
                        outlined
                        clearable
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="2">
                      <v-select
                        v-model="driver.nationality.value"
                        :items="itemsNationality"
                        item-text="name"
                        item-value="id"
                        :rules="driver.nationality.rules"
                        :label="driver.nationality.label"
                        outlined
                        clearable
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="2">
                      <v-text-field
                        v-model="driver.occuption.value"
                        :rules="driver.occuption.rules"
                        :placeholder="driver.occuption.placeHolder"
                        outlined
                        clearable
                        :label="driver.occuption.label"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class="mt-0">
                    <v-col cols="2">
                      <v-text-field
                        v-model="driver.validThru.value"
                        :rules="driver.validThru.rules"
                        :placeholder="driver.validThru.placeHolder"
                        outlined
                        clearable
                        :label="driver.validThru.label"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="2">
                      <v-select
                        v-model="driver.cardTypeID.value"
                        :items="itemsCardTypeID"
                        item-text="name"
                        item-value="id"
                        :rules="driver.cardTypeID.rules"
                        :label="driver.cardTypeID.label"
                        outlined
                        clearable
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="2">
                      <v-select
                        v-model="driver.statusID.value"
                        :items="itemsStatusID"
                        item-text="name"
                        item-value="id"
                        :rules="driver.statusID.rules"
                        :label="driver.statusID.label"
                        outlined
                        clearable
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="6">
                      <v-textarea
                        v-model="driver.internalRemarks.value"
                        :rules="driver.internalRemarks.rules"
                        :placeholder="driver.internalRemarks.placeHolder"
                        outlined
                        clearable
                        :label="driver.internalRemarks.label"
                        counter="250"
                        rows="1"
                        auto-grow
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-tab-item>
          <v-tab-item value="image">
            <v-card-text scrollable>
              <v-form v-model="driver.isValid" lazy-validation>
                <v-container fluid>
                  <v-row class="mb-0 mt-2"> </v-row>
                  <v-col cols="4">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      aspect-ratio="1.7"
                      contain
                      max-height="600"
                      max-width="300"
                      src="https://picsum.photos/id/11/500/300"
                    ></v-img>
                  </v-col>
                  <v-col cols="4">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="600"
                      max-width="300"
                      src="https://picsum.photos/id/11/500/300"
                    ></v-img>
                  </v-col>
                  <v-col cols="4">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="600"
                      max-width="300"
                      src="https://picsum.photos/id/11/500/300"
                    ></v-img>
                  </v-col>
                  <v-col cols="4">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="600"
                      max-width="300"
                      src="https://picsum.photos/id/11/500/300"
                    ></v-img>
                  </v-col>
                  <v-row class="mt-0"> </v-row>

                  <v-row class="mt-0"> </v-row>

                  <v-row class="mt-0"> </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <Button :callBack="pNew" :properties="btnSave" />
          <Button :callBack="pClose" :properties="btnClose" />
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-app>
</template>

<script>
import Button from "@/components/Button.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  name: "ListDriver",
  components: {
    Button,
    Snackbar,
  },
  data() {
    return {
      title: "Driver",
      // dialog: false,
      buttons: [
        {
          id: 1,
          properties: { icon: "refresh", text: "Refresh", color: "primary" },
        },
      ],
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
      tabItems: ["Information", "Image"],
      tab: null,
      itemDataTable: {
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
        data: [
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
            id: 11,
            name: "Frozen Yogurt",
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: "1%",
            status: "IN-ACTIVE",
          },
          {
            id: 12,
            name: "Ice cream sandwich",
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: "1%",
            status: "BLACKLIST",
          },
          {
            id: 13,
            name: "Eclair",
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: "7%",
            status: "ACTIVE",
          },
          {
            id: 14,
            name: "Cupcake",
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: "8%",
            status: "ACTIVE",
          },
          {
            id: 15,
            name: "Gingerbread",
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: "16%",
            status: "ACTIVE",
          },
          {
            id: 16,
            name: "Jelly bean",
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: "0%",
            status: "ACTIVE",
          },
          {
            id: 17,
            name: "Lollipop",
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: "2%",
            status: "ACTIVE",
          },
          {
            id: 18,
            name: "Honeycomb",
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: "45%",
            status: "ACTIVE",
          },
          {
            id: 19,
            name: "Donut",
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: "22%",
            status: "ACTIVE",
          },
          {
            id: 20,
            name: "KitKat",
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: "6%",
            status: "ACTIVE",
          },
        ],
      },
      itemsComLocDivSubDivSubSivID: [
        { id: 0, name: "Musim Mas" },
        { id: 1, name: "Sukajadi Sawitmekar" },
      ],
      itemsGender: [
        { id: 1, name: "Male" },
        { id: 2, name: "Female" },
      ],
      itemsBloodType: [
        { id: 1, name: "-" },
        { id: 2, name: "A" },
        { id: 3, name: "B" },
        { id: 4, name: "O" },
        { id: 5, name: "AB" },
      ],
      itemsReligion: [
        { id: 1, name: "Islam" },
        { id: 2, name: "Buddha" },
        { id: 3, name: "Kristen" },
        { id: 4, name: "Hindu" },
        { id: 5, name: "Konghuchu" },
      ],
      itemsMaritalStatus: [
        { id: 1, name: "Single" },
        { id: 2, name: "Married" },
      ],
      itemsNationality: [
        { id: 1, name: "WNI" },
        { id: 2, name: "WNA" },
      ],
      itemsCardType: [
        { id: 1, name: "KTP" },
        { id: 2, name: "SIM" },
      ],
      itemsStatus: [
        { id: 0, name: "ACTIVE" },
        { id: 1, name: "IN-ACTIVE" },
        { id: 2, name: "BLACKLIST" },
      ],
      driver: {
        isValid: true,
        selectedComLocDivSubDivSubSivID: { id: 1, name: "Sukajadi Sawitmekar" },
        idCard: "",
        idCardPlaceHolder: "ID card driver",
        idCardLabel: "ID Card",
        idCardRules: [
          (v) => !!v || "ID Card is required!",
          (v) => (v && v.length == 16) || "ID Card must be equal 16 characters",
        ],
        fullName: {
          value: "",
          placeHolder: "Full name driver",
          label: "Full Name",
          rules: [(v) => !!v || "Full name is required!"],
        },
        placeOfBirth: {
          value: "",
          placeHolder: "Place of birth driver",
          label: "Place of Birth",
          rules: [(v) => !!v || "Place of birth is required!"],
        },

        birthDate: {
          value: "2021-01-31",
          placeHolder: "Date of birth driver",
          label: "Date of Birth",
          rules: [(v) => !!v || "Birth of birth is required!"],
        },

        gender: {
          value: { id: 1, name: "Male" },
          label: "Gender",
          rules: [(v) => !!v || "Gender is required!"],
        },

        bloodType: {
          value: { id: 1, name: "-" },
          label: "Blood Type",
          rules: [(v) => !!v || "Blood type is required!"],
        },

        address: {
          value: "",
          placeHolder: "Address",
          label: "Address",
          rules: [(v) => !!v || "Address is required!"],
        },

        religion: {
          value: { id: 1, name: "Islam" },
          label: "Religion",
          rules: [(v) => !!v || "Religion is required!"],
        },

        maritalStatus: {
          value: { id: 1, name: "Single" },
          label: "Marital Status",
          rules: [(v) => !!v || "Marital status is required!"],
        },

        nationality: {
          value: { id: 1, name: "WNI" },
          label: "Nationality",
          rules: [(v) => !!v || "Nationality is required!"],
        },

        occuption: {
          value: "",
          placeHolder: "Occuption driver",
          label: "Occuption",
          rules: [(v) => !!v || "Occuption is required!"],
        },

        validThru: {
          value: "",
          placeHolder: "Valid thru",
          label: "Valid Thru",
          rules: [(v) => !!v || "Valid thru is required!"],
        },

        cardTypeID: {
          value: { id: 1, name: "KTP" },
          label: "Card Type",
          rules: [(v) => !!v || "Card type is required!"],
        },

        statusID: {
          value: { id: 0, name: "ACTIVE" },
          label: "Status",
          rules: [(v) => !!v || "Status is required!"],
        },

        internalRemarks: {
          value: "",
          placeHolder: "Internal remarks",
          label: "Internal Remarks",
          rules: [(v) => !!v || "Internal remarks is required!"],
        },
      },
    };
  },
  methods: {
    pNew() {
      // this.dialog = true;
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
