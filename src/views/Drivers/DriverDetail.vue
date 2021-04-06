<template>
  <v-app>
    <div id="btn-driver" class="d-flex flex-row btn-header">
      <div v-if="id == null" class="list-title">
        {{ title }}
      </div>
      <div v-else class="list-title">View Driver [ ID : {{ id }} ]</div>

      <v-spacer></v-spacer>
    </div>
    <v-divider></v-divider>

    <v-container>
      <v-row class="mt-0">
        <v-col cols="12">
          <template>
            <v-card>
              <v-card-title class="headline blue-grey lighten-5">
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
                              :items="itemsCardType"
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
                              :items="itemsStatus"
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
                        <v-row class="mb-0 mt-2" justify="center">
                          <v-col cols="4">
                            <v-img
                              lazy-src="https://picsum.photos/id/11/10/6"
                              aspect-ratio="1.7"
                              contain
                              max-height="600"
                              max-width="300"
                              src="https://picsum.photos/id/11/500/300"
                            ></v-img>
                            <v-file-input
                              show-size
                              counter
                              prepend-icon="image"
                              label="Card image"
                              accept="image/*"
                              @change="getCardImage"
                            ></v-file-input>
                          </v-col>

                          <v-col cols="4">
                            <v-img
                              lazy-src="https://picsum.photos/id/11/10/6"
                              aspect-ratio="1.7"
                              contain
                              max-height="600"
                              max-width="300"
                              src="https://picsum.photos/id/11/500/300"
                            ></v-img>
                            <v-file-input
                              show-size
                              counter
                              prepend-icon="face"
                              label="Face recognation"
                              accept="image/*"
                            ></v-file-input>
                          </v-col>

                          <v-col cols="4">
                            <v-img
                              lazy-src="https://picsum.photos/id/11/10/6"
                              aspect-ratio="1.7"
                              contain
                              max-height="600"
                              max-width="300"
                              src="https://picsum.photos/id/11/500/300"
                            ></v-img>
                            <v-file-input
                              show-size
                              counter
                              prepend-icon="fingerprint"
                              label="Finger Print"
                              accept="image/*"
                            ></v-file-input>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-tab-item>
              </v-tabs-items>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <Button :callBack="pSave" :properties="btnSave" />
                <router-link to="/driver">
                  <Button :callBack="pBack" :properties="btnBack" />
                </router-link>
              </v-card-actions>
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
  name: "DriverDetail",
  components: {
    Button,
    Snackbar,
  },
  props: { id: String },
  data() {
    return {
      title: "Create New Driver",
      dialog: false,
      snackbar: {
        isActive: false,
        text: "",
        color: "primary",
      },
      btnSave: {
        icon: "done",
        text: "Save",
        color: "primary",
      },
      btnBack: {
        icon: "arrow_back",
        text: "Back",
        color: "primary",
        // outlined: true,
      },
      tab: null,

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

        cardImage: {
          id: 1,
          value: '',
          preview: [],
          errorImage: "url of an image to use to indicate an error",
        },

        faceRecognationImage: {
          id: 2,
          value: [],
        },

        fingerPrintImage: {
          id: 3,
          value: [],
        },
      },
    };
  },
  methods: {
    pSave() {
      console.log(this.driver.cardImage.value);
    },
    pBack() {},
    getCardImage(files) {
      console.log(files);
    },
  },
  computed: {},
};
</script>

<style scoped>
.v-chip.v-size--default {
  width: 100px;
  display: inline-block !important;
  text-align: center;
}
</style>
