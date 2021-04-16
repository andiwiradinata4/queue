<template>
  <v-app>
    <v-container>
      <div v-if="id == 0" class="list-title ml-5 pb-5 mt-2">{{ title }}</div>
      <div v-else class="list-title ml-5 pb-5 mt-2">View Driver [ ID : {{ id }} ]</div>

      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <template>
            <v-card>
              <v-card-title class="headline">
                <v-tabs v-model="tab" left background-color="transparent">
                  <v-tabs-slider color="teal darken-3"></v-tabs-slider>
                  <v-tab href="#information">Information</v-tab>
                  <v-tab href="#image">Image</v-tab>
                </v-tabs>
              </v-card-title>

              <v-tabs-items v-model="tab">
                <v-tab-item value="information">
                  <v-card-text>
                    <v-form v-model="field.isValid" lazy-validation>
                      <v-container fluid>
                        <v-row class="mb-0 mt-0">
                          <v-col cols="4">
                            <v-text-field
                              v-model="field.idCard.value"
                              :counter="16"
                              :rules="field.idCard.rules"
                              :placeholder="field.idCard.placeHolder"
                              outlined
                              :label="field.idCard.label"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="8">
                            <v-text-field
                              v-model="field.fullName.value"
                              :rules="field.fullName.rules"
                              :placeholder="field.fullName.placeHolder"
                              outlined
                              :label="field.fullName.label"
                              counter="250"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row class="mt-0">
                          <v-col cols="4" class="pt-0">
                            <v-text-field
                              v-model="field.placeOfBirth.value"
                              :rules="field.placeOfBirth.rules"
                              :placeholder="field.placeOfBirth.placeHolder"
                              outlined
                              :label="field.placeOfBirth.label"
                              counter="20"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="4" class="pt-0">
                            <v-text-field
                              v-model="field.birthDate.value"
                              :rules="field.birthDate.rules"
                              :placeholder="field.birthDate.placeHolder"
                              outlined
                              :label="field.birthDate.label"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2" class="pt-0">
                            <v-select
                              v-model="field.gender.value"
                              :items="itemsGender"
                              item-text="name"
                              item-value="id"
                              :rules="field.gender.rules"
                              :label="field.gender.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="2" class="pt-0">
                            <v-select
                              v-model="field.bloodType.value"
                              :items="itemsBloodType"
                              item-text="name"
                              item-value="id"
                              :rules="field.bloodType.rules"
                              :label="field.bloodType.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row class="mt-0">
                          <v-col cols="4" class="pt-0">
                            <v-textarea
                              v-model="field.address.value"
                              :rules="field.address.rules"
                              :placeholder="field.address.placeHolder"
                              outlined
                              :label="field.address.label"
                              counter="250"
                              rows="1"
                              auto-grow
                              required
                            ></v-textarea>
                          </v-col>

                          <v-col cols="2" class="pt-0">
                            <v-select
                              v-model="field.religion.value"
                              :items="itemsReligion"
                              item-text="name"
                              item-value="id"
                              :rules="field.religion.rules"
                              :label="field.religion.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>

                          <v-col cols="2" class="pt-0">
                            <v-select
                              v-model="field.maritalStatus.value"
                              :items="itemsMaritalStatus"
                              item-text="name"
                              item-value="id"
                              :rules="field.maritalStatus.rules"
                              :label="field.maritalStatus.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>

                          <v-col cols="2" class="pt-0">
                            <v-select
                              v-model="field.nationality.value"
                              :items="itemsNationality"
                              item-text="name"
                              item-value="id"
                              :rules="field.nationality.rules"
                              :label="field.nationality.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>

                          <v-col cols="2" class="pt-0">
                            <v-text-field
                              v-model="field.occuption.value"
                              :rules="field.occuption.rules"
                              :placeholder="field.occuption.placeHolder"
                              outlined
                              :label="field.occuption.label"
                              counter="20"
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row class="mt-0">
                          <v-col cols="4" class="pt-0">
                            <v-text-field
                              v-model="field.validThru.value"
                              :rules="field.validThru.rules"
                              :placeholder="field.validThru.placeHolder"
                              outlined
                              :label="field.validThru.label"
                              counter="50"
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="4" class="pt-0">
                            <v-select
                              v-model="field.cardTypeID.value"
                              :items="itemsCardType"
                              item-text="name"
                              item-value="id"
                              :rules="field.cardTypeID.rules"
                              :label="field.cardTypeID.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>

                          <v-col cols="4" class="pt-0">
                            <v-select
                              v-model="field.statusID.value"
                              :items="itemsStatus"
                              item-text="name"
                              item-value="id"
                              :rules="field.statusID.rules"
                              :label="field.statusID.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row class="mt-0">
                          <v-col cols="4" class="pt-0">
                            <v-textarea
                              v-model="field.remarks.value"
                              :rules="field.remarks.rules"
                              :placeholder="field.remarks.placeHolder"
                              outlined
                              :label="field.remarks.label"
                              counter="250"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                          </v-col>
                          <v-col cols="8" class="pt-0">
                            <v-textarea
                              v-model="field.internalRemarks.value"
                              :rules="field.internalRemarks.rules"
                              :placeholder="field.internalRemarks.placeHolder"
                              outlined
                              :label="field.internalRemarks.label"
                              counter="250"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-tab-item>
                <v-tab-item value="image">
                  <v-card-text>
                    <v-form v-model="field.isValid" lazy-validation>
                      <v-container fluid>
                        <v-row class="mb-0 mt-0" justify="center">
                          <v-col cols="4">
                            <div v-if="field.cardImage.path == ''">
                              <v-card class="mx-auto" height="400" width="auto">
                                <v-container fluid>
                                  <div class="cardtype-text">Card Image</div>
                                </v-container>
                              </v-card>
                            </div>
                            <div v-else>
                              <v-img
                                :lazy-src="field.cardImage.path"
                                aspect-ratio="1.7"
                                contain
                                height="400"
                                width="auto"
                                :src="field.cardImage.path"
                                alt="Card Image"
                              ></v-img>
                            </div>

                            <v-file-input
                              show-size
                              counter
                              prepend-icon="image"
                              label="Card image"
                              accept="image/*"
                              @change="chooseCardImage"
                            ></v-file-input>
                          </v-col>

                          <v-col cols="4">
                            <div v-if="field.faceRecognationImage.path == ''">
                              <v-card class="mx-auto" height="400" width="auto">
                                <v-container fluid>
                                  <div class="facerecognation-text">Face Recognation Image</div>
                                </v-container>
                              </v-card>
                            </div>
                            <div v-else>
                              <v-img
                                :lazy-src="field.faceRecognationImage.path"
                                aspect-ratio="1.7"
                                contain
                                height="400"
                                width="auto"
                                :src="field.faceRecognationImage.path"
                                alt="Face Recognation"
                              ></v-img>
                            </div>
                            <v-file-input
                              show-size
                              counter
                              prepend-icon="face"
                              label="Face recognation"
                              accept="image/*"
                              @change="chooseFaceRecognationImage"
                            ></v-file-input>
                          </v-col>

                          <v-col cols="4">
                            <div v-if="field.fingerPrintImage.path == ''">
                              <v-card class="mx-auto" height="400" width="auto">
                                <v-container fluid>
                                  <div class="fingerprint-text">Finger Print Image</div>
                                </v-container>
                              </v-card>
                            </div>
                            <div v-else>
                              <v-img
                                :lazy-src="field.fingerPrintImage.path"
                                aspect-ratio="1.7"
                                contain
                                height="400"
                                width="auto"
                                :src="field.fingerPrintImage.path"
                                alt="Finger Print"
                              ></v-img>
                            </div>

                            <v-file-input
                              show-size
                              counter
                              prepend-icon="fingerprint"
                              label="Finger Print"
                              accept="image/*"
                              @change="chooseFingerPrintImage"
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
    Snackbar
  },
  props: { id: String },
  data() {
    return {
      title: "Create New Driver",
      snackbar: {
        isActive: false,
        text: "",
        color: "primary"
      },
      btnSave: {
        icon: "done",
        text: "Save",
        color: "primary"
      },
      btnBack: {
        icon: "arrow_back",
        text: "Back",
        color: "primary",
        outlined: true
      },
      tab: null,

      itemsGender: [
        { id: 1, name: "Male" },
        { id: 2, name: "Female" }
      ],
      itemsBloodType: [
        { id: 1, name: "-" },
        { id: 2, name: "A" },
        { id: 3, name: "B" },
        { id: 4, name: "O" },
        { id: 5, name: "AB" }
      ],
      itemsReligion: [
        { id: 1, name: "Islam" },
        { id: 2, name: "Buddha" },
        { id: 3, name: "Kristen" },
        { id: 4, name: "Hindu" },
        { id: 5, name: "Konghuchu" }
      ],
      itemsMaritalStatus: [
        { id: 1, name: "Single" },
        { id: 2, name: "Married" }
      ],
      itemsNationality: [
        { id: 1, name: "WNI" },
        { id: 2, name: "WNA" }
      ],
      itemsCardType: [
        { id: 1, name: "Identity Card" },
        { id: 2, name: "Driving License" }
      ],
      itemsStatus: [
        { id: 0, name: "ACTIVE" },
        { id: 1, name: "IN-ACTIVE" },
        { id: 2, name: "BLACKLIST" }
      ],
      field: {
        isValid: true,
        idCard: {
          value: "",
          placeHolder: "ID card driver",
          label: "ID Card",
          rules: [
            v => !!v || "ID Card is required!",
            v => (v && v.length == 16) || "ID Card must be equal 16 characters"
          ]
        },
        fullName: {
          value: "",
          placeHolder: "Full name driver",
          label: "Full Name",
          rules: [
            v => !!v || "Full name is required!",
            v =>
              v.length <= 250 ||
              "Character of full name must below or be equal of 250!"
          ]
        },
        placeOfBirth: {
          value: "",
          placeHolder: "Place of birth driver",
          label: "Place of Birth",
          rules: [
            v => !!v || "Place of birth is required!",
            v =>
              v.length <= 20 ||
              "Character of full name must below or be equal of 20!"
          ]
        },

        birthDate: {
          value: "31/01/1992",
          placeHolder: "Date of birth driver",
          label: "Date of Birth",
          rules: [v => !!v || "Birth of birth is required!"]
        },

        gender: {
          value: { id: 1, name: "Male" },
          label: "Gender",
          rules: [v => !!v || "Gender is required!"]
        },

        bloodType: {
          value: { id: 1, name: "-" },
          label: "Blood Type",
          rules: [v => !!v || "Blood type is required!"]
        },

        address: {
          value: "",
          placeHolder: "Address",
          label: "Address",
          rules: [
            v => !!v || "Address is required!",
            v =>
              v.length <= 250 ||
              "Character of address must below or be equal of 250!"
          ]
        },

        religion: {
          value: { id: 1, name: "Islam" },
          label: "Religion",
          rules: [v => !!v || "Religion is required!"]
        },

        maritalStatus: {
          value: { id: 1, name: "Single" },
          label: "Marital Status",
          rules: [v => !!v || "Marital status is required!"]
        },

        nationality: {
          value: { id: 1, name: "WNI" },
          label: "Nationality",
          rules: [v => !!v || "Nationality is required!"]
        },

        occuption: {
          value: "",
          placeHolder: "Occuption driver",
          label: "Occuption",
          rules: [
            v => !!v || "Occuption is required!",
            v =>
              v.length <= 20 ||
              "Character of occuption must below or be equal of 20!"
          ]
        },

        validThru: {
          value: "",
          placeHolder: "Valid thru",
          label: "Valid Thru",
          rules: [
            v => !!v || "Valid thru is required!",
            v =>
              v.length <= 50 ||
              "Character of valid thru must below or be equal of 50!"
          ]
        },

        cardTypeID: {
          value: { id: 1, name: "Identity Card" },
          label: "Card Type",
          rules: [v => !!v || "Card type is required!"]
        },

        statusID: {
          value: { id: 0, name: "ACTIVE" },
          label: "Status",
          rules: [v => !!v || "Status is required!"]
        },

        remarks: {
          value: "",
          placeHolder: "Remarks",
          label: "Remarks",
          rules: [
            v =>
              v.length <= 250 ||
              "Character of remarks must below or be equal of 250!"
          ]
        },

        internalRemarks: {
          value: "",
          placeHolder: "Internal remarks",
          label: "Internal Remarks",
          rules: [
            v =>
              v.length <= 250 ||
              "Character of internal remarks must below or be equal of 250!"
          ]
        },

        cardImage: {
          id: 1,
          path: "",
          value: null,
          errorImage: "url of an image to use to indicate an error"
        },

        faceRecognationImage: {
          id: 2,
          path: "",
          value: null,
          errorImage: "url of an image to use to indicate an error"
        },

        fingerPrintImage: {
          id: 3,
          path: "",
          value: null,
          errorImage: "url of an image to use to indicate an error"
        }
      }
    };
  },
  methods: {
    pSave() {
      console.log(this.field.cardImage.value);
    },
    pBack() {
      window.scrollTo(0, 0);
    },
    chooseCardImage(e) {
      if (e == null) {
        this.field.cardImage.path = "";
        this.field.cardImage.value = null;
      } else {
        this.field.cardImage.path = URL.createObjectURL(e);
        this.field.cardImage.value = e;
      }
    },
    chooseFaceRecognationImage(e) {
      if (e == null) {
        this.field.faceRecognationImage.path = "";
        this.field.faceRecognationImage.value = null;
      } else {
        this.field.faceRecognationImage.path = URL.createObjectURL(e);
        this.field.faceRecognationImage.value = e;
      }
    },
    chooseFingerPrintImage(e) {
      if (e == null) {
        this.field.fingerPrintImage.path = "";
        this.field.fingerPrintImage.value = null;
      } else {
        this.field.fingerPrintImage.path = URL.createObjectURL(e);
        this.field.fingerPrintImage.value = e;
      }
    }
  },
  computed: {}
};
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 0 !important;
}

.v-card__title {
  padding: 0px;
}
.v-chip.v-size--default {
  width: 100px;
  display: inline-block !important;
  text-align: center;
}

.v-tab {
  display: block;
  line-height: inherit;
  padding-top: 8px;
}

.cardtype-text {
  font-size: 1.4rem;
  padding-top: 170px;
  padding-left: 75px;
  padding-right: 70px;
  color: #566b80;
  text-align: center;
}
.facerecognation-text {
  font-size: 1.4rem;
  padding-top: 170px;
  padding-left: 75px;
  padding-right: 70px;
  color: #566b80;
  text-align: center;
}
.fingerprint-text {
  font-size: 1.4rem;
  padding-top: 170px;
  padding-left: 75px;
  padding-right: 70px;
  color: #566b80;
  text-align: center;
}
</style>
