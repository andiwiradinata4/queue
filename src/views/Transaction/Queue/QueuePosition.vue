<template>
  <v-app>
    <v-container id="queue-detail">
      <div class="list-title ml-5 pb-5 my-2">
        Queue Position [ ID : {{ id }} ]
      </div>

      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <template>
            <v-card>
              <v-container class="pr-5 pl-5" style="max-width: 100%">
                <v-row>
                  <v-col></v-col>
                  <v-col md="12" lg="10" xl="9">
                    <v-timeline align-top dense>
                      <v-timeline-item left color="success">
                        <v-card color="teal lighten-5" elevation="3">
                          <v-card-title class="pa-2">
                            <span class="ml-2">
                              <v-icon color="error">place</v-icon>
                              Parking Area</span
                            >
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-container class="ma-0">
                            <v-card-text class="pa-0">
                              <v-row class="mb-2">
                                <v-col cols="2" class="font-weight-bold ml-2">
                                  Plat Number
                                  <div class="font-weight-regular">
                                    BK1234CC
                                  </div>
                                </v-col>
                                <v-col cols="2" class="font-weight-bold">
                                  Request Date
                                  <div class="font-weight-regular">
                                    19-04-2021 14:45
                                  </div>
                                </v-col>

                                <v-col cols="2" class="font-weight-bold">
                                  Verified By
                                  <div class="font-weight-regular">ADMIN</div>
                                </v-col>
                                <v-col cols="2" class="font-weight-bold">
                                  Verified Date
                                  <div class="font-weight-regular">
                                    19-04-2021 15:00
                                  </div>
                                </v-col>

                                <v-col class="font-weight-bold">
                                  Internal Remarks
                                  <div class="font-weight-regular">
                                    19-04-2021 15:00
                                  </div>
                                </v-col>
                              </v-row>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="pb-0">
                              <v-spacer></v-spacer>
                              <Button
                                :callBack="pSave"
                                :properties="btnRequest"
                              />
                              <Button
                                :callBack="pSave"
                                :properties="btnVerify"
                              />
                              <Button
                                :callBack="pSave"
                                :properties="btnChange"
                              />
                            </v-card-actions>
                          </v-container>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                  </v-col>
                </v-row>
              </v-container>
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
  name: "QueuePosition",
  components: {
    Button,
    Snackbar,
  },
  props: { id: String },
  data() {
    return {
      title: "Create New Queue",
      btnVerify: {
        icon: "done",
        text: "Verify",
        color: "success",
      },
      btnRequest: {
        icon: "next_plan",
        text: "Request",
        color: "error",
      },
      btnChange: {
        icon: "edit",
        text: "Change Point",
        color: "normal",
        outlined: true,
      },
      snackbar: {
        isActive: false,
        text: "",
        color: "primary",
      },
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
