<template>
  <v-app>
    <v-container id="queue-arrangement">
      <div class="list-title ml-5 pb-0 my-2">{{ title }}</div>

      <!-- Bread Crumbs -->
      <v-breadcrumbs :items="breadcrumbsItem" class="pt-1 pb-5 pl-5" large>
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <v-divider></v-divider>

      <v-container fluid>
        <v-row class="mt-0 ml-2">
          <v-col>
            <div class="subtitle-1 indigo--text">Search Queue</div>
          </v-col>
        </v-row>
        <v-row class="ml-2 mt-5">
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
          <v-col cols="2" class="pt-0">
            <v-text-field
              v-model="field.RFID.value"
              :placeholder="field.RFID.placeHolder"
              :rules="field.RFID.rules"
              :label="field.RFID.label"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col class="pt-1">
            <v-spacer></v-spacer>
            <Button :callBack="pExecute" :properties="btnExecute" />
          </v-col>
        </v-row>
      </v-container>

      <v-divider></v-divider>

      <v-card  v-if="IsShowDetail == true">
        <v-card-text class="py-0">
          <v-form v-model="field.isValid" lazy-validation>
            <v-container fluid>
              <v-row class="my-0">
                <v-col>
                  <div class="subtitle-1 indigo--text">Queue Detail</div>
                </v-col>
              </v-row>
              <v-row class="my-0">
                <v-col cols="3">
                  <v-text-field
                    v-model="field.ID.value"
                    :placeholder="field.ID.placeHolder"
                    outlined
                    :label="field.ID.label"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="field.QueueNumber.value"
                    :placeholder="field.QueueNumber.placeHolder"
                    outlined
                    :label="field.QueueNumber.label"
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
                    readonly
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
                    readonly
                  ></v-select>
                </v-col>
                <v-col cols="4" class="pt-0">
                  <v-text-field
                    v-model="field.Driver.value.name"
                    :placeholder="field.Driver.placeHolder"
                    :rules="field.Driver.rules"
                    :label="field.Driver.label"
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
                    readonly
                    outlined
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
          <v-btn
            @click="pSetRequest()"
            class="custom-btn"
            :color="btnRequest.color"
            :outlined="btnRequest.outlined"
          >
            <v-icon class="btn-icon mr-2">{{ btnRequest.icon }}</v-icon>
            {{ btnRequest.text }}
          </v-btn>
          <v-btn
            @click="pCancelRequest(item.ID)"
            class="custom-btn"
            :color="btnCancelRequest.color"
            outlined
          >
            <v-icon class="btn-icon mr-2">{{ btnCancelRequest.icon }}</v-icon>
            {{ btnCancelRequest.text }}
          </v-btn>
          <v-btn
            @click="pSetVerify()"
            class="custom-btn"
            :color="btnVerify.color"
            :outlined="btnVerify.outlined"
          >
            <v-icon class="btn-icon mr-2">{{ btnVerify.icon }}</v-icon>
            {{ btnVerify.text }}
          </v-btn>
          <v-btn
            @click="pCancelVerify(item.ID)"
            class="custom-btn"
            :color="btnCancelVerify.color"
            outlined
          >
            <v-icon class="btn-icon mr-2">{{ btnCancelVerify.icon }}</v-icon>
            {{ btnCancelVerify.text }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>

    <!-- Request -->
    <v-dialog
      transition="dialog-top-transition"
      persistent
      max-width="600px"
      scrollable
      v-model="IsRequested"
    >
      <v-card>
        <v-card-title class="pt-5 pb-3">
          <div class="headline">Request Queue Position</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container fluid>
            <v-row class="pt-4">
              <v-col class="pt-0 pl-0">
                <v-select
                  v-model="field.PointID.ID"
                  :items="ListPoint"
                  item-text="Description"
                  item-value="ID"
                  :rules="field.PointID.rules"
                  :label="field.PointID.label"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="py-0 mt-2">
              <v-col class="py-0 pl-0">
                <v-select
                  v-model="field.PointSubDetailID.ID"
                  :items="GetListSubPoint"
                  item-text="name"
                  item-value="id"
                  :rules="field.PointSubDetailID.rules"
                  :label="field.PointSubDetailID.label"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="pt-0 mt-0">
              <v-col class="pt-0 pl-0">
                <v-text-field
                  v-model="field.PlatNumber.value"
                  :label="field.PlatNumber.label"
                  :rules="field.PlatNumber.rules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="pSaveRequest()" class="custom-btn" :color="btnSaveRequest.color">
            <v-icon class="btn-icon mr-2">{{ btnSaveRequest.icon }}</v-icon>
            {{ btnSaveRequest.text }}
          </v-btn>
          <v-btn
            @click="pCloseRequest()"
            class="custom-btn"
            :color="btnCloseRequest.color"
            outlined
          >
            <v-icon class="btn-icon mr-2">{{ btnCloseRequest.icon }}</v-icon>
            {{ btnCloseRequest.text }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Verify -->
    <v-dialog
      transition="dialog-top-transition"
      persistent
      max-width="600px"
      scrollable
      v-model="IsVerified"
    >
      <v-card>
        <v-card-title class="pt-5 pb-3">
          <div class="headline">Verify Queue Position</div>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container fluid>
            <v-row class="pt-4">
              <v-col class="pt-0 pl-0">
                <v-select
                  v-model="field.PointID.ID"
                  :items="ListPoint"
                  item-text="Description"
                  item-value="ID"
                  :rules="field.PointID.rules"
                  :label="field.PointID.label"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="py-0 mt-2">
              <v-col class="py-0 pl-0">
                <v-select
                  v-model="field.PointSubDetailID.ID"
                  :items="GetListSubPoint"
                  item-text="name"
                  item-value="id"
                  :rules="field.PointSubDetailID.rules"
                  :label="field.PointSubDetailID.label"
                  outlined
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-row class="pt-0 mt-0">
              <v-col class="pt-0 pl-0">
                <v-text-field
                  v-model="field.PlatNumber.value"
                  :label="field.PlatNumber.label"
                  :rules="field.PlatNumber.rules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="pt-4 mt-2">
              <v-col class="pt-0 pl-0">
                <v-textarea
                  v-model="field.InternalRemarks.value"
                  :label="field.InternalRemarks.label"
                  :rules="field.InternalRemarks.rules"
                  outlined
                  counter="250"
                  rows="3"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="pSaveVerify()" class="custom-btn" :color="btnSaveRequest.color">
            <v-icon class="btn-icon mr-2">{{ btnSaveRequest.icon }}</v-icon>
            {{ btnSaveRequest.text }}
          </v-btn>
          <v-btn
            @click="IsVerified = false"
            class="custom-btn"
            :color="btnCloseRequest.color"
            outlined
          >
            <v-icon class="btn-icon mr-2">{{ btnCloseRequest.icon }}</v-icon>
            {{ btnCloseRequest.text }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <Snackbar v-bind:properties="snackbar" />
  </v-app>
</template>

<script>
import Snackbar from "@/components/Snackbar.vue";
import Button from "@/components/Button.vue";

export default {
  name: "QueueArrangement",
  components: {
    Snackbar,
    Button
  },
  data() {
    return {
      title: "Queue Arrangement",
      IsRequested: false,
      IsVerified: false,
      IsShowDetail: false,
      btnExecute: {
        icon: "done",
        text: "Execute",
        color: "primary",
        disabled: false
      },
      btnVerify: {
        icon: "done",
        text: "Verify",
        color: "success",
        disabled: false
      },
      btnCancelVerify: {
        icon: "close",
        text: "Cancel Verify",
        color: "normal",
        disabled: true
      },
      btnRequest: {
        icon: "near_me",
        text: "Request",
        color: "primary",
        disabled: true
      },
      btnCancelRequest: {
        icon: "near_me_disabled",
        text: "Cancel Request",
        color: "normal",
        disabled: true
      },
      btnSaveRequest: {
        icon: "done",
        text: "Save",
        color: "primary"
      },
      btnCloseRequest: {
        icon: "close",
        text: "Close",
        color: "normal"
      },
      btnChange: {
        icon: "mdi-pencil",
        text: "Change",
        color: "warning"
      },
      btnAdd: {
        icon: "mdi-plus",
        text: "Add Point",
        color: "indigo"
      },
      btnDelete: {
        icon: "mdi-delete",
        text: "Delete Point",
        color: "error"
      },
      snackbar: {
        isActive: false,
        text: "",
        color: "primary"
      },
      itemsStatus: [
        { id: 3, name: "DRAFT" },
        { id: 4, name: "ON PROGRESS" },
        { id: 5, name: "CLOSED" }
      ],
      queuePoint: [
        {
          Fab: false,
          ID: "20210419-KM1-0001-001",
          QueueID: "20210419-KM1-0001",
          PointID: 1,
          PointDescription: "Parking Area",
          PointSubID: 1,
          PointSubDescription: "Parking Area 1",
          PlatNumber: "BK1234CC",
          IsRequested: true,
          RequestedBy: "ADMIN",
          RequestedDate: "23/04/2021 08:05",
          IsVerified: true,
          VerifiedBy: "ADMIN",
          VerifiedDate: "23/04/2021 08:10",
          InternalRemarks: ""
        },
        {
          Fab: false,
          ID: "20210419-KM1-0001-002",
          QueueID: "20210419-KM1-0001",
          PointID: 2,
          PointDescription: "Security",
          PointSubID: 0,
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestedDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: ""
        },
        {
          Fab: false,
          ID: "20210419-KM1-0001-003",
          QueueID: "20210419-KM1-0001",
          PointID: "3",
          PointDescription: "Laboratory / Sampling",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestedDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: ""
        },
        {
          Fab: false,
          ID: "20210419-KM1-0001-004",
          QueueID: "20210419-KM1-0001",
          PointID: "4",
          PointDescription: "Laboratory / Labtest",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestedDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: ""
        },
        {
          Fab: false,
          ID: "20210419-KM1-0001-005",
          QueueID: "20210419-KM1-0001",
          PointID: "5",
          PointDescription: "Weighbridge Check In",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestedDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: ""
        },
        {
          Fab: false,
          ID: "20210419-KM1-0001-006",
          QueueID: "20210419-KM1-0001",
          PointID: "6",
          PointDescription: "Unloading Station",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestedDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: ""
        },
        {
          Fab: false,
          ID: "20210419-KM1-0001-007",
          QueueID: "20210419-KM1-0001",
          PointID: "7",
          PointDescription: "Weighbridge Check Out",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestedDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: ""
        }
      ],
      ListPoint: [
        {
          ID: 1,
          Description: "Parking Area"
        },
        {
          ID: 2,
          Description: "Security"
        },
        {
          ID: 3,
          Description: "Laboratory / Sampling"
        },
        {
          ID: 4,
          Description: "Laboratory / Labtest"
        },
        {
          ID: 5,
          Description: "Weighbridge Check In"
        },
        {
          ID: 6,
          Description: "Unloading Station"
        },
        {
          ID: 7,
          Description: "Weighbridge Check Out"
        }
      ],
      ListPointSub: [
        {
          id: 1,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 1,
          PointDescription: "Parking Area",
          name: "Parking Area 1",
          Status: "ACTIVE"
        },
        {
          id: 2,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 2,
          PointDescription: "Security",
          name: "Security 1",
          Status: "ACTIVE"
        },
        {
          id: 3,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 3,
          PointDescription: "Laboratory / Sampling",
          name: "Laboratory / Sampling 1",
          Status: "ACTIVE"
        },
        {
          id: 4,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 3,
          PointDescription: "Laboratory / Sampling",
          name: "Laboratory / Sampling 2",
          Status: "ACTIVE"
        },
        {
          id: 5,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 4,
          PointDescription: "Laboratory / Labtest",
          name: "Laboratory / Labtest 1",
          Status: "ACTIVE"
        },
        {
          id: 6,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 4,
          PointDescription: "Laboratory / Labtest",
          name: "Laboratory / Labtest 2",
          Status: "ACTIVE"
        },
        {
          id: 7,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 5,
          PointDescription: "Weighbridge Check In",
          name: "Weighbridge Check In 1",
          Status: "ACTIVE"
        },
        {
          id: 8,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 5,
          PointDescription: "Weighbridge Check In",
          name: "Weighbridge Check In 2",
          Status: "ACTIVE"
        },
        {
          id: 9,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 6,
          PointDescription: "Unloading Station",
          name: "Unloading Station 1",
          Status: "ACTIVE"
        },
        {
          id: 10,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 6,
          PointDescription: "Unloading Station",
          name: "Unloading Station 2",
          Status: "ACTIVE"
        },
        {
          id: 11,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 7,
          PointDescription: "Weighbridge Check Out",
          name: "Weighbridge Check Out 1",
          Status: "ACTIVE"
        },
        {
          id: 12,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 7,
          PointDescription: "Weighbridge Check Out",
          name: "Weighbridge Check Out 2",
          Status: "ACTIVE"
        },
        {
          id: 13,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 8,
          PointDescription: "Parking Area",
          name: "Parking Area 1",
          Status: "ACTIVE"
        },
        {
          id: 14,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 9,
          PointDescription: "Security",
          name: "Security 1",
          Status: "ACTIVE"
        },
        {
          id: 15,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 10,
          PointDescription: "Weighbridge Checker",
          name: "Weighbridge Checker 1",
          Status: "ACTIVE"
        },
        {
          id: 16,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 10,
          PointDescription: "Weighbridge Checker",
          name: "Weighbridge Checker 2",
          Status: "ACTIVE"
        },
        {
          id: 17,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 11,
          PointDescription: "Laboratory / Sampling",
          name: "Laboratory / Sampling 1",
          Status: "ACTIVE"
        },
        {
          id: 18,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 12,
          PointDescription: "Laboratory / Labtest",
          name: "Laboratory / Labtest 1",
          Status: "ACTIVE"
        },
        {
          id: 19,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 13,
          PointDescription: "Weighbridge Check In",
          name: "Weighbridge Check In 1",
          Status: "ACTIVE"
        },
        {
          id: 20,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 13,
          PointDescription: "Weighbridge Check In",
          name: "Weighbridge Check In 2",
          Status: "ACTIVE"
        },
        {
          id: 21,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 14,
          PointDescription: "Unloading Station",
          name: "Unloading Station 1",
          Status: "ACTIVE"
        },
        {
          id: 22,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 14,
          PointDescription: "Unloading Station",
          name: "Unloading Station 2",
          Status: "ACTIVE"
        },
        {
          id: 23,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 15,
          PointDescription: "Weighbridge Check Out",
          name: "Weighbridge Check Out 1",
          Status: "ACTIVE"
        },
        {
          id: 24,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 15,
          PointDescription: "Weighbridge Check Out",
          name: "Weighbridge Check Out 2",
          Status: "ACTIVE"
        }
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
          value: "20210401-KM1-0001",
          placeHolder: "ID Queue",
          label: "ID Queue"
        },
        Company: {
          value: { id: "MM", name: "" },
          label: "Company",
          rules: [v => !!v || "Company is required!"]
        },
        Location: {
          value: { id: "MDN-KIM1", name: "" },
          label: "Location",
          rules: [v => !!v || "Location is required!"]
        },
        QueueNumber: {
          value: "1",
          placeHolder: "Queue number",
          label: "Queue Number"
        },
        QueueDate: {
          value: "16-04-2021",
          placeHolder: "Queue date",
          label: "Queue Date"
        },
        PlatNumber: {
          value: "BK 1234 CC",
          label: "Plat Number",
          rules: [v => !!v || "Plat number is required!"]
        },
        Driver: {
          value: { id: 1, name: "BUDIMAN" },
          label: "Driver",
          rules: [v => !!v || "Driver is required!"]
        },
        StatusID: {
          value: { id: 4, name: "DRAFT" },
          label: "Status",
          rules: [v => !!v || "Status is required!"]
        },
        SPBNumber: {
          value: "SPB 001 ABC",
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
          value: "E210521001",
          placeHolder: "Arrival ID",
          label: "Arrival ID",
          rules: [
            v =>
              v.length <= 10 ||
              "Character of Arrival ID must below or be equal of 10!"
          ]
        },
        UnloadingSlot: {
          value: { id: 0, name: "Unloading Station 1" },
          placeHolder: "Unloading Slot",
          label: "Unloading Slot",
          rules: []
        },
        PointID: {
          ID: 0,
          value: "",
          label: "Point",
          rules: [v => !!v || "Point is required!"]
        },
        PointSubDetailID: {
          ID: 0,
          value: "",
          label: "Pointsub",
          rules: [v => !!v || "Pointsub is required!"]
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
      },
      breadcrumbsItem: [
        {
          text: "Queue",
          disabled: false,
          to: "/queue"
        },
        {
          text: "Queue Arrangement",
          disabled: true,
          to: ""
        }
      ]
    };
  },
  methods: {
    pExecute() {
      this.IsShowDetail = true;
    },
    pSave() {},
    pBack() {
      window.scrollTo(0, 0);
    },
    pGetPlatNumber() {
      alert("Press Get Plat Number");
    },
    pDisabledRequested(i, item) {
      if (i == 0) {
        if (item.IsRequested == false && item.IsVerified == false) {
          return false;
        } else if (item.IsRequested == true) {
          return true;
        }
      } else {
        if (this.queuePoint[i - 1].IsVerified == false) {
          return true;
        } else {
          if (item.IsRequested == false) {
            return false;
          } else {
            return true;
          }
        }
      }
      return false;
    },
    pIsOnProgress(i, item) {
      if ((item.IsRequested == false || item.IsVerified == false) && i == 0) {
        return true;
      } else if (
        i > 0 &&
        this.queuePoint[i - 1].IsVerified == true &&
        this.queuePoint[i - 1].IsRequested == true &&
        (item.IsRequested == false || item.IsVerified == false)
      ) {
        return true;
      } else {
        return false;
      }
    },
    pSetRequest() {
      this.IsRequested = true;
    },
    pSaveRequest() {
      this.queuePoint.map(e => {
        if (e.ID == this.field.ID.value) {
          let date = new Date();
          let dateWithFormat = date
            .toJSON()
            .slice(0, 10)
            .replace(/-/g, "/");
          let hour = date.getHours();
          let minute = date.getMinutes();

          e.PointSubID = this.field.PointSubDetailID.ID;
          e.PointSubDescription = this.GetSubPoint[0].name;
          e.IsRequested = true;
          e.RequestedBy = "ADMIN";
          e.RequestedDate = dateWithFormat + " " + hour + ":" + minute;
          console.log(e);
          console.log(this.GetSubPoint);
        }
      });
      this.IsRequested = false;
    },
    pCloseRequest() {
      this.IsRequested = false;
    },
    pCancelRequest(ID) {
      this.queuePoint.map(e => {
        if (e.ID == ID) {
          e.PointSubID = 0;
          e.PointSubDescription = "";
          e.PlatNumber = "";
          e.IsRequested = false;
          e.RequestedBy = "";
          e.RequestedDate = "";
        }
      });
    },
    pSetVerify() {
      this.IsVerified = true;
    },
    pSaveVerify() {
      this.queuePoint.map(e => {
        if (e.ID == this.field.ID.value) {
          let date = new Date();
          let dateWithFormat = date
            .toJSON()
            .slice(0, 10)
            .replace(/-/g, "/");
          let hour = date.getHours();
          let minute = date.getMinutes();
          e.PlatNumber = this.field.PlatNumber.value;
          e.IsVerified = true;
          e.VerifiedBy = "ADMIN";
          e.VerifiedDate = dateWithFormat + " " + hour + ":" + minute;
          e.InternalRemarks = this.field.InternalRemarks.value;
        }
      });
      this.IsVerified = false;
    },
    pCancelVerify(ID) {
      this.queuePoint.map(e => {
        if (e.ID == ID) {
          e.IsVerified = false;
          e.VerifiedBy = "";
          e.VerifiedDate = "";
        }
      });
    },
    pSetChange(item) {
      this.field.ID.value = item.ID;
      this.field.QueueID.value = item.QueueID;
      this.field.PointID.ID = item.PointID;
      this.field.PointID.value = item.PointDescription;
      this.field.PointSubDetailID.ID = item.PointSubID;
      this.field.PointSubDetailID.value = item.PointSubDescription;
      this.field.PlatNumber.value = item.PlatNumber;
      this.field.InternalRemarks.value = item.InternalRemarks;
      this.IsChanged = true;
    },
    pChange() {
      this.queuePoint.map(e => {
        if (e.ID == this.field.ID.value) {
          e.PointID = this.field.PointID.ID;
          e.PointDescription = this.GetPoint[0].Description;
          e.PointSubID = this.field.PointSubDetailID.ID;
          e.PointSubDescription = this.GetSubPoint[0].name;
          e.PlatNumber = this.field.PlatNumber.value;
          e.InternalRemarks = this.field.InternalRemarks.value;
        }
      });
      this.IsChanged = false;
    },
    pSetAddPoint(i) {
      this.field.Index = i;
      this.field.ID.value = "";
      this.field.QueueID.value = "";
      this.field.PointID.ID = 0;
      this.IsAddPoint = true;
    },
    pAddPoint() {
      this.queuePoint.splice(this.field.Index, 0, {
        Fab: false,
        ID: "20210419-KM1-0001-00" + this.field.Index,
        QueueID: "20210419-KM1-0001",
        PointID: this.field.PointID.ID,
        PointDescription: this.GetPoint[0].Description,
        PointSubID: 0,
        PointSubDescription: "",
        PlatNumber: "",
        IsRequested: false,
        RequestedBy: "",
        RequestedDate: "",
        IsVerified: false,
        VerifiedBy: "",
        VerifiedDate: "",
        InternalRemarks: ""
      });
      this.IsAddPoint = false;
    },
    pDeletePoint(index) {
      this.queuePoint.splice(index, 1);
    }
  },
  computed: {
    GetPoint() {
      return this.ListPoint.filter(e => e.ID == this.field.PointID.ID);
    },
    GetSubPoint() {
      return this.ListPointSub.filter(e => e.PointID == this.field.PointID.ID);
    },
    GetListSubPoint() {
      return this.ListPointSub.filter(e => e.PointID == this.field.PointID.ID);
    }
  }
};
</script>

<style scoped>
#queue-arrangement {
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

/* Button */
.custom-btn {
  min-width: 120px !important;
  margin-right: 5px;
  margin-bottom: 5px;
  margin-top: 5px;
}
.btn-icon {
  margin-left: 0px;
  margin-right: 5px;
}
/* Enf of Button */
</style>
