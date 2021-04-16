<template>
  <v-app>
    <v-container>
      <div v-if="id == 0" class="list-title ml-5 pb-5 mt-2">{{ title }}</div>
      <div v-else class="list-title ml-5 pb-5 mt-2">View Queue [ ID : {{ id }} ]</div>

      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <template>
            <v-card>
              <v-card-title class="headline">
                <v-tabs v-model="tab" left background-color="transparent">
                  <v-tabs-slider color="teal darken-3"></v-tabs-slider>
                  <v-tab href="#information">Information</v-tab>
                  <v-tab href="#position-history">Point History</v-tab>
                  <v-tab href="#status-history">Status History</v-tab>
                </v-tabs>
              </v-card-title>

              <v-tabs-items v-model="tab">
                <v-tab-item value="information">
                  <v-card-text>
                    <v-form v-model="field.isValid" lazy-validation>
                      <v-container fluid>
                        <v-row class="mb-0 mt-0">
                          <v-col cols="3">
                            <v-text-field
                              v-model="field.ID.value"
                              :placeholder="field.ID.placeHolder"
                              outlined
                              :label="field.ID.label"
                              required
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="3">
                            <v-text-field
                              v-model="field.QueueNumber.value"
                              :placeholder="field.QueueNumber.placeHolder"
                              outlined
                              :label="field.QueueNumber.label"
                              required
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2"></v-col>
                          <v-col cols="2">
                            <v-text-field
                              v-model="field.QueueDate.value"
                              :placeholder="field.QueueDate.placeHolder"
                              outlined
                              :label="field.QueueDate.label"
                              required
                              readonly
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2">
                            <v-select
                              v-model="field.StatusID.value"
                              :items="itemsStatus"
                              item-text="name"
                              item-value="id"
                              :rules="field.StatusID.rules"
                              :label="field.StatusID.label"
                              outlined
                              required
                              readonly
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row class="mb-0 mt-0">
                          <v-col cols="3" class="pt-0">
                            <v-select
                              v-model="field.Company.value"
                              :items="itemsCompany"
                              item-text="name"
                              item-value="id"
                              :rules="field.Company.rules"
                              :label="field.Company.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="3" class="pt-0">
                            <v-select
                              v-model="field.Location.value"
                              :items="itemsLocation"
                              item-text="name"
                              item-value="id"
                              :rules="field.Location.rules"
                              :label="field.Location.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="4" class="pt-0">
                            <v-text-field
                              v-model="field.Driver.value.name"
                              :placeholder="field.Driver.placeHolder"
                              :rules="field.Driver.rules"
                              :label="field.Driver.label"
                              append-icon="search"
                              @click:append="pGetPlatNumber"
                              readonly
                              outlined
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2" class="pt-0">
                            <v-text-field
                              v-model="field.PlatNumber.value"
                              :placeholder="field.PlatNumber.placeHolder"
                              :rules="field.PlatNumber.rules"
                              :label="field.PlatNumber.label"
                              append-icon="search"
                              @click:append="pGetPlatNumber"
                              readonly
                              outlined
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row class="mb-0 mt-0">
                          <v-col cols="3" class="pt-0">
                            <v-text-field
                              v-model="field.ArrivalID.value"
                              :placeholder="field.ArrivalID.placeHolder"
                              :rules="field.ArrivalID.rules"
                              :label="field.ArrivalID.label"
                              append-icon="search"
                              @click:append="pGetPlatNumber"
                              readonly
                              outlined
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="3" class="pt-0">
                            <v-text-field
                              v-model="field.SPBNumber.value"
                              :placeholder="field.SPBNumber.placeHolder"
                              :rules="field.SPBNumber.rules"
                              :label="field.SPBNumber.label"
                              append-icon="search"
                              @click:append="pGetPlatNumber"
                              readonly
                              outlined
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="4" class="pt-0">
                            <v-text-field
                              v-model="field.UnloadingSlot.value.name"
                              :placeholder="field.UnloadingSlot.placeHolder"
                              :rules="field.UnloadingSlot.rules"
                              :label="field.UnloadingSlot.label"
                              append-icon="search"
                              @click:append="pGetPlatNumber"
                              readonly
                              outlined
                              required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="2" class="pt-0">
                            <v-text-field
                              v-model="field.RFID.value"
                              :placeholder="field.RFID.placeHolder"
                              :rules="field.RFID.rules"
                              :label="field.RFID.label"
                              append-icon="search"
                              @click:append="pGetPlatNumber"
                              readonly
                              outlined
                              required
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <v-row class="mt-0">
                          <v-col cols="6" class="pt-0">
                            <v-textarea
                              v-model="field.Remarks.value"
                              :rules="field.Remarks.rules"
                              :placeholder="field.Remarks.placeHolder"
                              outlined
                              :label="field.Remarks.label"
                              counter="250"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                          </v-col>
                          <v-col cols="6" class="pt-0">
                            <v-textarea
                              v-model="field.InternalRemarks.value"
                              :rules="field.InternalRemarks.rules"
                              :placeholder="field.InternalRemarks.placeHolder"
                              outlined
                              :label="field.InternalRemarks.label"
                              counter="250"
                              rows="1"
                              auto-grow
                            ></v-textarea>
                          </v-col>
                        </v-row>

                        <v-row class="mb-0 mt-0">
                          <v-col cols="2" class="pt-0">
                            <v-text-field
                              v-model="field.CompletedBy.value"
                              :placeholder="field.CompletedBy.placeHolder"
                              :label="field.CompletedBy.label"
                              readonly
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2" class="pt-0">
                            <v-text-field
                              v-model="field.CompletedDate.value"
                              :placeholder="field.CompletedDate.placeHolder"
                              :label="field.CompletedDate.label"
                              readonly
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="2" class="pt-0">
                            <v-switch
                              color="success"
                              v-model="field.IsCompleted.value"
                              :placeholder="field.IsCompleted.placeHolder"
                              :label="field.IsCompleted.label"
                              readonly=""
                            ></v-switch>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-tab-item>
                <v-tab-item value="position-history"></v-tab-item>
                <v-tab-item value="status-history"></v-tab-item>
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
  name: "QueueDetail",
  components: {
    Button,
    Snackbar
  },
  props: { id: String },
  data() {
    return {
      title: "Create New Queue",
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
      itemsStatus: [
        { id: 3, name: "DRAFT" },
        { id: 4, name: "ON PROGRESS" },
        { id: 5, name: "CLOSED" }
      ],
      itemsCompany: [
        { id: "MM", name: "MUSIM MAS, PT" },
        { id: "AGR", name: "AGROWIRATAMA, PT" },
        { id: "GIN", name: "GUNTUNG IDAMANNUSA, PT." }
      ],
      itemsLocation: [
        { id: "MDN-KIM1", name: "MEDAN KIM 1" },
        { id: "MDN-KIM2", name: "MEDAN KIM 2" },
        { id: "MDN-KIM3", name: "MEDAN KIM 3" },
        { id: "BTG-KB-PEL", name: "BITUNG KB PELABUHAN" }
      ],
      field: {
        isValid: true,
        ID: {
          value: "Auto-Generate",
          placeHolder: "ID Queue",
          label: "ID Queue"
        },
        Company: {
          value: { id: 0, name: "" },
          label: "Company",
          rules: [v => !!v || "Company is required!"]
        },
        Location: {
          value: { id: 0, name: "" },
          label: "Location",
          rules: [v => !!v || "Location is required!"]
        },
        QueueNumber: {
          value: "Auto-Generate",
          placeHolder: "Queue number",
          label: "Queue Number"
        },
        QueueDate: {
          value: "16-04-2021",
          placeHolder: "Queue date",
          label: "Queue Date"
        },
        PlatNumber: {
          value: "",
          label: "Plat Number",
          rules: [v => !!v || "Plat number is required!"]
        },
        Driver: {
          value: { id: 0, name: "" },
          label: "Driver",
          rules: [v => !!v || "Driver is required!"]
        },
        StatusID: {
          value: { id: 4, name: "DRAFT" },
          label: "Status",
          rules: [v => !!v || "Status is required!"]
        },
        SPBNumber: {
          value: "",
          placeHolder: "SPB Number",
          label: "SPB Number",
          rules: [
            v =>
              v.length <= 150 ||
              "Character of SPB Number must below or be equal of 150!"
          ]
        },
        RFID: {
          value: "",
          placeHolder: "RFID",
          label: "RFID",
          rules: [
            v =>
              v.length <= 20 ||
              "Character of RFID must below or be equal of 20!"
          ]
        },
        ArrivalID: {
          value: "",
          placeHolder: "Arrival ID",
          label: "Arrival ID",
          rules: [
            v =>
              v.length <= 10 ||
              "Character of Arrival ID must below or be equal of 10!"
          ]
        },
        UnloadingSlot: {
          value: { id: 0, name: "" },
          placeHolder: "Unloading Slot",
          label: "Unloading Slot",
          rules: [
            v =>
              v.length <= 10 ||
              "Character of Unloading Slot must below or be equal of 10!"
          ]
        },
        IsCompleted: {
          value: false,
          placeHolder: "Complete?",
          label: "Complete?"
        },
        CompletedBy: {
          value: "-",
          placeHolder: "Completed By",
          label: "Completed By"
        },
        CompletedDate: {
          value: "-",
          placeHolder: "Completed Date",
          label: "Completed Date"
        },
        Remarks: {
          value: "",
          placeHolder: "Remarks",
          label: "Remarks",
          rules: [
            v =>
              v.length <= 250 ||
              "Character of remarks must below or be equal of 250!"
          ]
        },
        InternalRemarks: {
          value: "",
          placeHolder: "Internal remarks",
          label: "Internal Remarks",
          rules: [
            v =>
              v.length <= 250 ||
              "Character of internal remarks must below or be equal of 250!"
          ]
        }
      }
    };
  },
  methods: {
    pSave() {},
    pBack() {
      window.scrollTo(0, 0);
    },
    pGetPlatNumber() {
      alert("Press Get Plat Number");
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
</style>
