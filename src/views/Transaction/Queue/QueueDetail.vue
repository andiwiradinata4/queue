<template>
  <v-app>
    <v-container id="queue-detail">
      <div v-if="id == 0" class="list-title ml-5 pb-5 mt-2">{{ title }}</div>
      <div v-else class="list-title ml-5 pb-5 mt-2">
        View Queue [ ID : {{ id }} ]
      </div>

      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <template>
            <v-card>
              <v-card-title class="headline">
                <v-tabs v-model="tab" left background-color="transparent">
                  <v-tabs-slider color="teal darken-3"></v-tabs-slider>
                  <v-tab href="#information">Information</v-tab>
                  <v-tab href="#point-history">Point History</v-tab>
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
                            <v-checkbox
                              v-model="field.IsCompleted.value"
                              :label="field.IsCompleted.label"
                              readonly
                            ></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                  </v-card-text>
                </v-tab-item>
                <v-tab-item value="point-history">
                  <v-container class="pr-5 pl-5" style="max-width: 100%">
                    <v-timeline reverse>
                      <v-timeline-item
                        :color="item.color"
                        :icon="item.icon"
                        v-for="(item, i) in queuePoint"
                        :key="i"
                      >
                        <span slot="opposite">
                          <div style="font-size: 25px">
                            {{ item.Point }}
                            <span
                              class="font-weight-light"
                              style="font-size: 18px"
                            >
                              ( {{ item.PointSub }} )
                            </span>
                          </div>
                        </span>
                        <v-card color="grey lighten-5" elevation="3">
                          <v-container>
                            <v-row class="pl-3">
                              <v-col
                                cols="2"
                                sm="4"
                                lg="3"
                                class="pb-0 font-weight-bold pr-0"
                                >Plat Number</v-col
                              >
                              <v-col cols="4" sm="8" lg="3" class="pb-0 px-0"
                                >: {{ item.PlatNumber }}</v-col
                              >

                              <v-col
                                cols="2"
                                sm="4"
                                lg="3"
                                class="pb-0 font-weight-bold px-0"
                                >Request Date</v-col
                              >
                              <v-col cols="4" sm="8" lg="3" class="pb-0 px-0"
                                >: {{ item.RequestDate }}
                              </v-col>
                            </v-row>
                            <v-row class="pt-0 pl-3">
                              <v-col
                                cols="2"
                                sm="4"
                                lg="3"
                                class="pb-0 font-weight-bold pr-0"
                                >Verified By</v-col
                              >
                              <v-col cols="4" sm="8" lg="3" class="pb-0 px-0"
                                >: {{ item.VerifiedBy }}</v-col
                              >

                              <v-col
                                cols="2"
                                sm="4"
                                lg="3"
                                class="pb-0 font-weight-bold px-0"
                                >Verified Date</v-col
                              >
                              <v-col cols="4" sm="8" lg="3" class="pb-0 px-0"
                                >: {{ item.VerifiedDate }}
                              </v-col>
                            </v-row>

                            <v-row class="pt-0 pb-0 pl-3">
                              <v-col cols="12" class="pb-0 font-weight-bold"
                                >Internal Remarks</v-col
                              >
                            </v-row>
                            <v-row class="pt-0 pb-0 pl-3">
                              <v-col cols="12" class="pt-0"
                                >{{ item.InternalRemarks }}
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-container>
                </v-tab-item>
                <v-tab-item value="status-history">
                  <v-container class="pr-5 pl-5" style="max-width: 70%">
                    <v-timeline>
                      <v-timeline-item
                        right
                        small
                        v-for="(item, i) in queueStatus"
                        :key="i"
                      >
                        <span slot="opposite">
                          <div style="font-size: 20px">
                            {{ item.Status }}
                            <span
                              class="font-weight-light"
                              style="font-size: 15px"
                            >
                              ( {{ item.StatusDate }} )
                            </span>
                          </div>
                        </span>
                        <v-card color="grey lighten-5" elevation="3">
                          <v-container>
                            <v-row class="pl-3">
                              <v-col cols="3" class="pb-0 font-weight-bold"
                                >Status By</v-col
                              >
                              <v-col cols="9" class="pb-0"
                                >: {{ item.StatusBy }}</v-col
                              >
                            </v-row>

                            <v-row class="pt-0 pb-3 pl-3">
                              <v-col cols="3" class="pb-0 font-weight-bold"
                                >Remarks</v-col
                              >
                              <v-col cols="9" class="pb-0"
                                >: {{ item.Remarks }}</v-col
                              >
                            </v-row>
                          </v-container>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>

              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <Button :callBack="pSave" :properties="btnSave" />
                <router-link to="/queue">
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
    Snackbar,
  },
  props: { id: String },
  data() {
    return {
      title: "Create New Queue",
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
        outlined: true,
      },
      tab: null,
      itemsStatus: [
        { id: 3, name: "DRAFT" },
        { id: 4, name: "ON PROGRESS" },
        { id: 5, name: "CLOSED" },
      ],
      itemsCompany: [
        { id: "MM", name: "MUSIM MAS, PT" },
        { id: "AGR", name: "AGROWIRATAMA, PT" },
        { id: "GIN", name: "GUNTUNG IDAMANNUSA, PT." },
      ],
      itemsLocation: [
        { id: "MDN-KIM1", name: "MEDAN KIM 1" },
        { id: "MDN-KIM2", name: "MEDAN KIM 2" },
        { id: "MDN-KIM3", name: "MEDAN KIM 3" },
        { id: "BTG-KB-PEL", name: "BITUNG KB PELABUHAN" },
      ],
      field: {
        isValid: true,
        ID: {
          value: "Auto-Generate",
          placeHolder: "ID Queue",
          label: "ID Queue",
        },
        Company: {
          value: { id: 0, name: "" },
          label: "Company",
          rules: [(v) => !!v || "Company is required!"],
        },
        Location: {
          value: { id: 0, name: "" },
          label: "Location",
          rules: [(v) => !!v || "Location is required!"],
        },
        QueueNumber: {
          value: "Auto-Generate",
          placeHolder: "Queue number",
          label: "Queue Number",
        },
        QueueDate: {
          value: "16-04-2021",
          placeHolder: "Queue date",
          label: "Queue Date",
        },
        PlatNumber: {
          value: "",
          label: "Plat Number",
          rules: [(v) => !!v || "Plat number is required!"],
        },
        Driver: {
          value: { id: 0, name: "" },
          label: "Driver",
          rules: [(v) => !!v || "Driver is required!"],
        },
        StatusID: {
          value: { id: 4, name: "DRAFT" },
          label: "Status",
          rules: [(v) => !!v || "Status is required!"],
        },
        SPBNumber: {
          value: "",
          placeHolder: "SPB Number",
          label: "SPB Number",
          rules: [
            (v) =>
              v.length <= 150 ||
              "Character of SPB Number must below or be equal of 150!",
          ],
        },
        RFID: {
          value: "",
          placeHolder: "RFID",
          label: "RFID",
          rules: [
            (v) =>
              v.length <= 20 ||
              "Character of RFID must below or be equal of 20!",
          ],
        },
        ArrivalID: {
          value: "",
          placeHolder: "Arrival ID",
          label: "Arrival ID",
          rules: [
            (v) =>
              v.length <= 10 ||
              "Character of Arrival ID must below or be equal of 10!",
          ],
        },
        UnloadingSlot: {
          value: { id: 0, name: "" },
          placeHolder: "Unloading Slot",
          label: "Unloading Slot",
          rules: [
            (v) =>
              v.length <= 10 ||
              "Character of Unloading Slot must below or be equal of 10!",
          ],
        },
        IsCompleted: {
          value: false,
          placeHolder: "Complete?",
          label: "Complete?",
        },
        CompletedBy: {
          value: "-",
          placeHolder: "Completed By",
          label: "Completed By",
        },
        CompletedDate: {
          value: "-",
          placeHolder: "Completed Date",
          label: "Completed Date",
        },
        Remarks: {
          value: "",
          placeHolder: "Remarks",
          label: "Remarks",
          rules: [
            (v) =>
              v.length <= 250 ||
              "Character of remarks must below or be equal of 250!",
          ],
        },
        InternalRemarks: {
          value: "",
          placeHolder: "Internal remarks",
          label: "Internal Remarks",
          rules: [
            (v) =>
              v.length <= 250 ||
              "Character of internal remarks must below or be equal of 250!",
          ],
        },
      },
      queuePoint: [
        {
          ID: "20210419-KM1-0001-008",
          Point: "Weighbridge Check Out",
          PointSub: "Weighbridge Check Out 1",
          PlatNumber: "BK1234CC",
          RequestDate: "19-04-2021 14:45",
          VerifiedBy: "ADMIN",
          VerifiedDate: "19-04-2021 15:00",
          InternalRemarks: "-",
          color: "amber darken-4",
          icon: "local_shipping",
        },
        {
          ID: "20210419-KM1-0001-007",
          Point: "Unloading",
          PointSub: "Unloading 2",
          PlatNumber: "BK1234CC",
          RequestDate: "19-04-2021 13:30",
          VerifiedBy: "ADMIN",
          VerifiedDate: "19-04-2021 14:30",
          InternalRemarks: "-",
          color: "primary",
          icon: "",
        },
        {
          ID: "20210419-KM1-0001-006",
          Point: "Check In",
          PointSub: "Check In 2",
          PlatNumber: "BK1234CC",
          RequestDate: "19-04-2021 13:10",
          VerifiedBy: "ADMIN",
          VerifiedDate: "19-04-2021 13:20",
          InternalRemarks: "-",
          color: "primary",
          icon: "",
        },
        {
          ID: "20210419-KM1-0001-005",
          Point: "Laboratory / Labtest",
          PointSub: "Laboratory / Labtest 1",
          PlatNumber: "BK1234CC",
          RequestDate: "19-04-2021 11:15",
          VerifiedBy: "ADMIN",
          VerifiedDate: "19-04-2021 11:50",
          InternalRemarks: "-",
          color: "primary",
          icon: "",
        },
        {
          ID: "20210419-KM1-0001-004",
          Point: "Laboratory / Sampling",
          PointSub: "Laboratory / Sampling 1",
          PlatNumber: "BK1234CC",
          RequestDate: "19-04-2021 10:30",
          VerifiedBy: "ADMIN",
          VerifiedDate: "19-04-2021 11:00",
          InternalRemarks: "-",
          color: "primary",
          icon: "",
        },
        {
          ID: "20210419-KM1-0001-003",
          Point: "Weighbridge Checker",
          PointSub: "Weighbridge Checker 1",
          PlatNumber: "BK1234CC",
          RequestDate: "19-04-2021 10:00",
          VerifiedBy: "ADMIN",
          VerifiedDate: "19-04-2021 10:15",
          InternalRemarks: "-",
          color: "primary",
          icon: "",
        },
        {
          ID: "20210419-KM1-0001-002",
          Point: "Security",
          PointSub: "Security 1",
          PlatNumber: "BK1234CC",
          RequestDate: "19-04-2021 09:15",
          VerifiedBy: "ADMIN",
          VerifiedDate: "19-04-2021 09:45",
          InternalRemarks: "-",
          color: "primary",
          icon: "",
        },
        {
          ID: "20210419-KM1-0001-001",
          Point: "Parking Area",
          PointSub: "Parking Area 1",
          PlatNumber: "BK1234CC",
          RequestDate: "19-04-2021 08:00",
          VerifiedBy: null,
          VerifiedDate: null,
          InternalRemarks: "-",
          color: "primary",
          icon: "",
        },
      ],
      queueStatus: [
        {
          ID: "20210419-KM1-0001-016",
          Status: "Verify Check Out 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 15:00",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-015",
          Status: "Request Check Out 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 14:45",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-014",
          Status: "Verify Unloading 2",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 14:30",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-013",
          Status: "Request Unloading 2",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 13:30",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-012",
          Status: "Verify Check In 2",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 13:20",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-011",
          Status: "Request Check In 2",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 13:10",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-010",
          Status: "Verify Laboratory / Labtest 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 11:50",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-009",
          Status: "Request Laboratory / Labtest 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 11:15",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-008",
          Status: "Verify Laboratory / Sampling 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 11:00",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-007",
          Status: "Request Laboratory / Sampling 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 10:30",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-006",
          Status: "Verify Weighbridge Checker 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 10:15",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-005",
          Status: "Request Weighbridge Checker 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 10:00",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-004",
          Status: "Verify Security 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 09:45",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-003",
          Status: "Request Security 1",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 09:15",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-002",
          Status: "Request Parking Area",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 08:00",
          Remarks: "-",
        },
        {
          ID: "20210419-KM1-0001-001",
          Status: "Create New Queue",
          StatusBy: "ADMIN",
          StatusDate: "19-04-2021 08:15",
          Remarks: "-",
        },
      ],
    };
  },
  methods: {
    pSave() {},
    pBack() {
      window.scrollTo(0, 0);
    },
    pGetPlatNumber() {
      alert("Press Get Plat Number");
    },
  },
  computed: {},
};
</script>

<style scoped>
#queue-detail {
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
