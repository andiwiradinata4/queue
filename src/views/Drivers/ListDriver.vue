<template>
  <v-app>
    <div id="btn-driver" class="d-flex flex-row btn-header">
      <div class="list-title">
        {{ title }}
      </div>

      <v-spacer></v-spacer>

      <div id="btn-driver">
        <Button :callBack="pNew" :properties="btnNew" />
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
                  :headers="headers"
                  :items="itemDataTable"
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

    <v-dialog v-model="dialog" fullscreen persistent scrollable>
      <v-card>
        <v-card-title class="headline blue-grey lighten-5">
          Create New Driver
        </v-card-title>

        <v-divider></v-divider>

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
                    v-model="driver.fullName"
                    :rules="driver.fullNameRules"
                    :placeholder="driver.fullNamePlaceHolder"
                    outlined
                    clearable
                    :label="driver.fullNameLabel"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row class="mt-0">
                <v-col cols="4">
                  <v-text-field
                    v-model="driver.placeOfBirth"
                    :rules="driver.placeOfBirthRules"
                    :placeholder="driver.placeOfBirthPlaceHolder"
                    outlined
                    clearable
                    :label="driver.placeOfBirthLabel"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="driver.birthDate"
                    :rules="driver.birthDateRules"
                    :placeholder="driver.birthDatePlaceHolder"
                    outlined
                    clearable
                    :label="driver.birthDateLabel"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-select
                    v-model="driver.gender"
                    :items="itemsGender"
                    item-text="name"
                    item-value="id"
                    :rules="driver.genderRules"
                    :label="driver.genderLabel"
                    outlined
                    clearable
                    required
                  ></v-select>
                </v-col>
                <v-col cols="2">
                  <v-select
                    v-model="driver.bloodType"
                    :items="itemsBloodType"
                    item-text="name"
                    item-value="id"
                    :rules="driver.bloodTypeRules"
                    :label="driver.bloodTypeLabel"
                    outlined
                    clearable
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row class="mt-0">
                <v-col cols="4">
                  <v-textarea
                    v-model="driver.address"
                    :rules="driver.addressRules"
                    :placeholder="driver.addressPlaceHolder"
                    outlined
                    clearable
                    :label="driver.addressLabel"
                    counter="250"
                    rows="1"
                    auto-grow
                    required
                  ></v-textarea>
                </v-col>

                <v-col cols="2">
                  <v-select
                    v-model="driver.religion"
                    :items="itemsReligion"
                    item-text="name"
                    item-value="id"
                    :rules="driver.religionRules"
                    :label="driver.religionLabel"
                    outlined
                    clearable
                    required
                  ></v-select>
                </v-col>
                
                <v-col cols="2">
                  <v-select
                    v-model="driver.maritalStatus"
                    :items="itemsMaritalStatus"
                    item-text="name"
                    item-value="id"
                    :rules="driver.maritalStatusRules"
                    :label="driver.maritalStatusLabel"
                    outlined
                    clearable
                    required
                  ></v-select>
                </v-col>
                
                <v-col cols="2">
                  <v-select
                    v-model="driver.nationality"
                    :items="itemsNationality"
                    item-text="name"
                    item-value="id"
                    :rules="driver.nationalityRules"
                    :label="driver.nationalityLabel"
                    outlined
                    clearable
                    required
                    return-object
                  ></v-select>
                </v-col>
                
                <v-col cols="2">
                  <v-text-field
                    v-model="driver.occuption"
                    :counter="20"
                    :rules="driver.occuptionRules"
                    :placeholder="driver.occuptionPlaceHolder"
                    outlined
                    clearable
                    :label="driver.occuptionLabel"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <Button :callBack="pNew" :properties="btnSave" />
          <Button :callBack="pClose" :properties="btnClose" />
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false,
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
        fullName: "",
        fullNamePlaceHolder: "Full name driver",
        fullNameLabel: "Full Name",
        fullNameRules: [(v) => !!v || "Full name is required!"],

        placeOfBirth: "",
        placeOfBirthPlaceHolder: "Place of birth driver",
        placeOfBirthLabel: "Place of Birth",
        placeOfBirthRules: [(v) => !!v || "Place of birth is required!"],

        birthDate: "2021-01-01",
        birthDatePlaceHolder: "Date of birth driver",
        birthDateLabel: "Date of Birth",
        birthDateRules: [(v) => !!v || "Birth date is required!"],

        gender: {id: 1, name: "Male"},
        genderLabel: "Gender",
        genderRules: [(v) => !!v || "Gender is required!"],

        bloodType: {id: 1, name: "-"},
        bloodTypeLabel: "Blood Type",
        bloodTypeRules: [(v) => !!v || "Blood of Type is required!"],

        address: "",
        addressPlaceHolder: "Address of driver",
        addressLabel: "Address",
        addressRules: [(v) => !!v || "Address is required!"],
        
        religion: {id: 1, name: "Islam"},
        religionLabel: "Religion",
        religionRules: [(v) => !!v || "Religion is required!"],

        maritalStatus: {id: 1, name: "Single"},
        maritalStatusLabel: "Marital Status",
        maritalStatusRules: [(v) => !!v || "Marital Status is required!"],

        nationality: {id: 1, name: "WNI"},
        nationalityLabel: "Nationality",
        nationalityRules: [(v) => !!v || "Nationality is required!"],

        occuption: "",
        occuptionPlaceHolder: "Occuption driver",
        occuptionLabel: "Occuption",
        occuptionRules: [(v) => !!v || "Occuption is required!"],

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
