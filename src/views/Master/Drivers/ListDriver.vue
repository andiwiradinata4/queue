<template>
  <v-app>
    <div id="btn-driver" class="d-flex flex-row btn-header">
      <div class="list-title">
        {{ title }}
      </div>

      <v-spacer></v-spacer>

      <div id="btn-driver">
        <router-link to="/driver-detail/0">
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
                  :height="tableHeight"
                  multi-sort
                  fixed-header
                  dense
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
                    <router-link :to="'/driver-detail/' + item.id" >
                      <v-btn icon @click="pView(item.id)">
                      <v-icon small color="#304457">fas fa-edit</v-icon>
                    </v-btn>
                    </router-link>
                    
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
          { text: "#", value: "action", align: "center", sortable: false, width: "80" },

          { text: "ID Card", value: "IDCard" },
          { text: "Full Name", value: "FullName", width: "200" },
          { text: "Place of Birth", value: "PlaceOfBirth", width: "150"},
          { text: "Date of Birth ", value: "DateOfBirth", width: "150"},
          { text: "Gender", value: "Gender", width: "120"},
          { text: "Blood Type", value: "BloodType", width: "120", align: "center" },
          { text: "Address", value: "Address", width: "500" },
          { text: "Religion", value: "Religion" },
          { text: "Marital Status", value: "MaritalStatus" },
          { text: "Nationality", value: "Nationality", width: "120" },
          { text: "Occupation", value: "Occupation", width: "180" },
          { text: "Valid Thru", value: "ValidThru", width: "180" },
          { text: "Card Type", value: "CardType", width: "120" },
          { text: "Internal Remarks", value: "InternalRemarks", width: "200" },
          { text: "Status", value: "Status", align: "center" },
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
            CardType: "KTP",
            InternalRemarks: "",
            Status: "ACTIVE",
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
            CardType: "KTP",
            InternalRemarks: "",
            Status: "IN-ACTIVE",
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
            CardType: "KTP",
            InternalRemarks: "",
            Status: "ACTIVE",
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
            CardType: "SIM",
            InternalRemarks: "",
            Status: "ACTIVE",
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
            CardType: "SIM",
            InternalRemarks: "",
            Status: "BLACKLIST",
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
            CardType: "SIM",
            InternalRemarks: "",
            Status: "ACTIVE",
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
            CardType: "KTP",
            InternalRemarks: "",
            Status: "IN-ACTIVE",
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
            CardType: "KTP",
            InternalRemarks: "",
            Status: "ACTIVE",
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
            CardType: "SIM",
            InternalRemarks: "",
            Status: "ACTIVE",
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
            CardType: "SIM",
            InternalRemarks: "",
            Status: "BLACKLIST",
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
            CardType: "SIM",
            InternalRemarks: "",
            Status: "BLACKLIST",
          },
        ],
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
