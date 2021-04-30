<template>
  <v-app>
    <v-container id="queue-position">
      <div class="list-title ml-5 pb-5 my-2">
        Queue Position [ ID : {{ id }} ]
        <span v-if="queuePoint.length == 0" class="ml-2">
          <v-btn
            @click="pSetAddPoint(i + 1)"
            fab
            dark
            small
            :color="btnAdd.color"
          >
            <v-icon>{{ btnAdd.icon }}</v-icon>
          </v-btn></span
        >
      </div>

      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <template>
            <v-card>
              <v-container class="pr-5 pl-5" style="max-width: 100%">
                <v-row>
                  <v-col>
                    <v-timeline align-top dense>
                      <v-slide-x-reverse-transition group hide-on-leave>
                        <div v-for="(item, i) in queuePoint" :key="i">
                          <v-timeline-item
                            left
                            :color="
                              item.IsRequested && item.IsVerified
                                ? 'success'
                                : pIsOnProgress(i, item) == true
                                ? 'amber darken-4'
                                : 'primary'
                            "
                            :icon="
                              pIsOnProgress(i, item) == true
                                ? 'local_shipping'
                                : ''
                            "
                          >
                            <v-card
                              color="teal lighten-5"
                              elevation="3"
                              class="mb-5"
                            >
                              <v-card-title class="pa-2">
                                <span class="ml-2">
                                  <v-icon color="error">place</v-icon>
                                  {{ item.PointDescription }}
                                  <span
                                    v-if="item.IsRequested"
                                    class="font-weight-light"
                                    style="font-size: 18px"
                                  >
                                    ( {{ item.PointSubDescription }} )
                                  </span>
                                </span>

                                <!-- Button Add, Edit, Delete -->
                                <v-speed-dial
                                  class="ml-8 my-1"
                                  v-model="item.Fab"
                                  right
                                  direction="right"
                                  transition="slide-x-transition"
                                >
                                  <template v-slot:activator>
                                    <v-btn
                                      v-model="item.Fab"
                                      color="light-blue darken-4"
                                      dark
                                      fab
                                      small
                                    >
                                      <v-icon v-if="item.Fab">
                                        mdi-close
                                      </v-icon>
                                      <v-icon v-else> app_registration </v-icon>
                                    </v-btn>
                                  </template>

                                  <v-btn
                                    @click="pSetAddPoint(i + 1)"
                                    fab
                                    dark
                                    small
                                    :color="btnAdd.color"
                                  >
                                    <v-icon>{{ btnAdd.icon }}</v-icon>
                                  </v-btn>
                                  <v-btn
                                    @click="pSetChange(item)"
                                    fab
                                    dark
                                    small
                                    :color="btnChange.color"
                                  >
                                    <v-icon>{{ btnChange.icon }}</v-icon>
                                  </v-btn>
                                  <v-btn
                                    @click="pDeletePoint(i)"
                                    fab
                                    dark
                                    small
                                    :color="btnDelete.color"
                                  >
                                    <v-icon>{{ btnDelete.icon }}</v-icon>
                                  </v-btn>
                                </v-speed-dial>
                              </v-card-title>
                              <v-divider></v-divider>
                              <v-container class="ma-0">
                                <v-card-text class="pa-0">
                                  <v-row>
                                    <v-col class="font-weight-bold ml-2">
                                      Plat Number
                                      <div class="font-weight-regular">
                                        {{ item.PlatNumber }}
                                      </div>
                                    </v-col>
                                    <v-col class="font-weight-bold">
                                      Requested By
                                      <div class="font-weight-regular">
                                        {{ item.RequestedBy }}
                                      </div>
                                    </v-col>
                                    <v-col class="font-weight-bold">
                                      Requested Date
                                      <div class="font-weight-regular">
                                        {{ item.RequestedDate }}
                                      </div>
                                    </v-col>

                                    <v-col class="font-weight-bold">
                                      Verified By
                                      <div class="font-weight-regular">
                                        {{ item.VerifiedBy }}
                                      </div>
                                    </v-col>
                                    <v-col class="font-weight-bold">
                                      Verified Date
                                      <div class="font-weight-regular">
                                        {{ item.VerifiedDate }}
                                      </div>
                                    </v-col>

                                    <v-col class="font-weight-bold">
                                      Internal Remarks
                                      <div class="font-weight-regular">
                                        {{ item.InternalRemarks }}
                                      </div>
                                    </v-col>
                                  </v-row>
                                </v-card-text>
                              </v-container>
                              <v-divider></v-divider>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  @click="pSetRequest(item)"
                                  class="custom-btn"
                                  :color="btnRequest.color"
                                  :outlined="btnRequest.outlined"
                                  :disabled="pDisabledRequested(i, item)"
                                >
                                  <v-icon class="btn-icon mr-2">
                                    {{ btnRequest.icon }}
                                  </v-icon>
                                  {{ btnRequest.text }}
                                </v-btn>
                                <v-btn
                                  @click="pCancelRequest(item.ID)"
                                  class="custom-btn"
                                  :color="btnCancelRequest.color"
                                  outlined
                                >
                                  <v-icon class="btn-icon mr-2">
                                    {{ btnCancelRequest.icon }}
                                  </v-icon>
                                  {{ btnCancelRequest.text }}
                                </v-btn>
                                <v-btn
                                  @click="pSetVerify(item)"
                                  class="custom-btn"
                                  :color="btnVerify.color"
                                  :outlined="btnVerify.outlined"
                                  :disabled="
                                    item.IsRequested == false
                                      ? true
                                      : item.IsVerified
                                  "
                                >
                                  <v-icon class="btn-icon mr-2">
                                    {{ btnVerify.icon }}
                                  </v-icon>
                                  {{ btnVerify.text }}
                                </v-btn>
                                <v-btn
                                  @click="pCancelVerify(item.ID)"
                                  class="custom-btn"
                                  :color="btnCancelVerify.color"
                                  outlined
                                >
                                  <v-icon class="btn-icon mr-2">
                                    {{ btnCancelVerify.icon }}
                                  </v-icon>
                                  {{ btnCancelVerify.text }}
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-timeline-item>
                        </div>
                      </v-slide-x-reverse-transition>
                    </v-timeline>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </template>
        </v-col>
      </v-row>

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
                  <v-text-field
                    v-model="field.PointID.value"
                    :label="field.PointID.label"
                    readonly
                  ></v-text-field>
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
            <v-btn
              @click="pSaveRequest()"
              class="custom-btn"
              :color="btnSaveRequest.color"
            >
              <v-icon class="btn-icon mr-2">
                {{ btnSaveRequest.icon }}
              </v-icon>
              {{ btnSaveRequest.text }}
            </v-btn>
            <v-btn
              @click="pCloseRequest()"
              class="custom-btn"
              :color="btnCloseRequest.color"
              outlined
            >
              <v-icon class="btn-icon mr-2">
                {{ btnCloseRequest.icon }}
              </v-icon>
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
                  <v-text-field
                    v-model="field.PointID.value"
                    :label="field.PointID.label"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="py-0 mt-2">
                <v-col class="py-0 pl-0">
                  <v-text-field
                    v-model="field.PointSubDetailID.value"
                    :label="field.PointSubDetailID.label"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="pt-4 mt-2">
                <v-col class="py-0 pl-0">
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
            <v-btn
              @click="pSaveVerify()"
              class="custom-btn"
              :color="btnSaveRequest.color"
            >
              <v-icon class="btn-icon mr-2">
                {{ btnSaveRequest.icon }}
              </v-icon>
              {{ btnSaveRequest.text }}
            </v-btn>
            <v-btn
              @click="IsVerified = false"
              class="custom-btn"
              :color="btnCloseRequest.color"
              outlined
            >
              <v-icon class="btn-icon mr-2">
                {{ btnCloseRequest.icon }}
              </v-icon>
              {{ btnCloseRequest.text }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Change -->
      <v-dialog
        transition="dialog-top-transition"
        persistent
        max-width="600px"
        scrollable
        v-model="IsChanged"
      >
        <v-card>
          <v-card-title class="pt-5 pb-3">
            <div class="headline">Change Queue Position</div>
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
              <v-row class="pt-4 mt-2">
                <v-col class="py-0 pl-0">
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
            <v-btn
              @click="pChange()"
              class="custom-btn"
              :color="btnSaveRequest.color"
            >
              <v-icon class="btn-icon mr-2">
                {{ btnSaveRequest.icon }}
              </v-icon>
              {{ btnSaveRequest.text }}
            </v-btn>
            <v-btn
              @click="IsChanged = false"
              class="custom-btn"
              :color="btnCloseRequest.color"
              outlined
            >
              <v-icon class="btn-icon mr-2">
                {{ btnCloseRequest.icon }}
              </v-icon>
              {{ btnCloseRequest.text }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Add Point -->
      <v-dialog
        transition="dialog-top-transition"
        persistent
        max-width="600px"
        scrollable
        v-model="IsAddPoint"
      >
        <v-card>
          <v-card-title class="pt-5 pb-3">
            <div class="headline">Add New Point</div>
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
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              @click="pAddPoint()"
              class="custom-btn"
              :color="btnSaveRequest.color"
            >
              <v-icon class="btn-icon mr-2">
                {{ btnSaveRequest.icon }}
              </v-icon>
              {{ btnSaveRequest.text }}
            </v-btn>
            <v-btn
              @click="IsAddPoint = false"
              class="custom-btn"
              :color="btnCloseRequest.color"
              outlined
            >
              <v-icon class="btn-icon mr-2">
                {{ btnCloseRequest.icon }}
              </v-icon>
              {{ btnCloseRequest.text }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <Snackbar v-bind:properties="snackbar" />
  </v-app>
</template>

<script>
import Snackbar from "@/components/Snackbar.vue";

export default {
  name: "QueuePosition",
  components: {
    Snackbar,
  },
  props: { id: String },
  data() {
    return {
      title: "Create New Queue",
      IsRequested: false,
      IsVerified: false,
      IsChanged: false,
      IsAddPoint: false,
      btnVerify: {
        icon: "done",
        text: "Verify",
        color: "success",
        disabled: false,
      },
      btnCancelVerify: {
        icon: "close",
        text: "Cancel Verify",
        color: "normal",
        disabled: true,
      },
      btnRequest: {
        icon: "near_me",
        text: "Request",
        color: "primary",
        disabled: true,
      },
      btnCancelRequest: {
        icon: "near_me_disabled",
        text: "Cancel Request",
        color: "normal",
        disabled: true,
      },
      btnSaveRequest: {
        icon: "done",
        text: "Save",
        color: "primary",
      },
      btnCloseRequest: {
        icon: "close",
        text: "Close",
        color: "normal",
      },
      btnChange: {
        icon: "mdi-pencil",
        text: "Change",
        color: "warning",
      },
      btnAdd: {
        icon: "mdi-plus",
        text: "Add Point",
        color: "indigo",
      },
      btnDelete: {
        icon: "mdi-delete",
        text: "Delete Point",
        color: "error",
      },
      snackbar: {
        isActive: false,
        text: "",
        color: "primary",
      },
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
          InternalRemarks: "",
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
          InternalRemarks: "",
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
          InternalRemarks: "",
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
          InternalRemarks: "",
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
          InternalRemarks: "",
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
          InternalRemarks: "",
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
          InternalRemarks: "",
        },
      ],
      ListPoint: [
        {
          ID: 1,
          Description: "Parking Area",
        },
        {
          ID: 2,
          Description: "Security",
        },
        {
          ID: 3,
          Description: "Laboratory / Sampling",
        },
        {
          ID: 4,
          Description: "Laboratory / Labtest",
        },
        {
          ID: 5,
          Description: "Weighbridge Check In",
        },
        {
          ID: 6,
          Description: "Unloading Station",
        },
        {
          ID: 7,
          Description: "Weighbridge Check Out",
        },
      ],
      ListPointSub: [
        {
          id: 1,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 1,
          PointDescription: "Parking Area",
          name: "Parking Area 1",
          Status: "ACTIVE",
        },
        {
          id: 2,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 2,
          PointDescription: "Security",
          name: "Security 1",
          Status: "ACTIVE",
        },
        {
          id: 3,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 3,
          PointDescription: "Laboratory / Sampling",
          name: "Laboratory / Sampling 1",
          Status: "ACTIVE",
        },
        {
          id: 4,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 3,
          PointDescription: "Laboratory / Sampling",
          name: "Laboratory / Sampling 2",
          Status: "ACTIVE",
        },
        {
          id: 5,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 4,
          PointDescription: "Laboratory / Labtest",
          name: "Laboratory / Labtest 1",
          Status: "ACTIVE",
        },
        {
          id: 6,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 4,
          PointDescription: "Laboratory / Labtest",
          name: "Laboratory / Labtest 2",
          Status: "ACTIVE",
        },
        {
          id: 7,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 5,
          PointDescription: "Weighbridge Check In",
          name: "Weighbridge Check In 1",
          Status: "ACTIVE",
        },
        {
          id: 8,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 5,
          PointDescription: "Weighbridge Check In",
          name: "Weighbridge Check In 2",
          Status: "ACTIVE",
        },
        {
          id: 9,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 6,
          PointDescription: "Unloading Station",
          name: "Unloading Station 1",
          Status: "ACTIVE",
        },
        {
          id: 10,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 6,
          PointDescription: "Unloading Station",
          name: "Unloading Station 2",
          Status: "ACTIVE",
        },
        {
          id: 11,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 7,
          PointDescription: "Weighbridge Check Out",
          name: "Weighbridge Check Out 1",
          Status: "ACTIVE",
        },
        {
          id: 12,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 1",
          PointID: 7,
          PointDescription: "Weighbridge Check Out",
          name: "Weighbridge Check Out 2",
          Status: "ACTIVE",
        },
        {
          id: 13,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 8,
          PointDescription: "Parking Area",
          name: "Parking Area 1",
          Status: "ACTIVE",
        },
        {
          id: 14,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 9,
          PointDescription: "Security",
          name: "Security 1",
          Status: "ACTIVE",
        },
        {
          id: 15,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 10,
          PointDescription: "Weighbridge Checker",
          name: "Weighbridge Checker 1",
          Status: "ACTIVE",
        },
        {
          id: 16,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 10,
          PointDescription: "Weighbridge Checker",
          name: "Weighbridge Checker 2",
          Status: "ACTIVE",
        },
        {
          id: 17,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 11,
          PointDescription: "Laboratory / Sampling",
          name: "Laboratory / Sampling 1",
          Status: "ACTIVE",
        },
        {
          id: 18,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 12,
          PointDescription: "Laboratory / Labtest",
          name: "Laboratory / Labtest 1",
          Status: "ACTIVE",
        },
        {
          id: 19,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 13,
          PointDescription: "Weighbridge Check In",
          name: "Weighbridge Check In 1",
          Status: "ACTIVE",
        },
        {
          id: 20,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 13,
          PointDescription: "Weighbridge Check In",
          name: "Weighbridge Check In 2",
          Status: "ACTIVE",
        },
        {
          id: 21,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 14,
          PointDescription: "Unloading Station",
          name: "Unloading Station 1",
          Status: "ACTIVE",
        },
        {
          id: 22,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 14,
          PointDescription: "Unloading Station",
          name: "Unloading Station 2",
          Status: "ACTIVE",
        },
        {
          id: 23,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 15,
          PointDescription: "Weighbridge Check Out",
          name: "Weighbridge Check Out 1",
          Status: "ACTIVE",
        },
        {
          id: 24,
          Company: "MUSIM MAS, PT",
          Location: "MEDAN KIM 2",
          PointID: 15,
          PointDescription: "Weighbridge Check Out",
          name: "Weighbridge Check Out 2",
          Status: "ACTIVE",
        },
      ],

      field: {
        Index: 0,
        ID: { value: "", label: "ID" },
        QueueID: { value: "", label: "Queue ID" },
        PointID: {
          ID: 0,
          value: "",
          label: "Point",
          rules: [(v) => !!v || "Point is required!"],
        },
        PointSubDetailID: {
          ID: 0,
          value: "",
          label: "Pointsub",
          rules: [(v) => !!v || "Pointsub is required!"],
        },
        PlatNumber: {
          value: "",
          label: "Plat Number",
          rules: [(v) => !!v || "Plat Number is required!"],
        },
        IsEditPlatNumber: {
          value: false,
          label: "Is Edit Plat Number",
        },
        ImagePathPlatNumber: {
          value: "",
          label: "Image Path Plat Number",
          rules: [(v) => !!v || "Image Path Plat Number is required!"],
        },
        IsRequested: {
          value: false,
        },
        RequestedBy: {
          value: "",
        },
        RequestedDate: {
          value: "",
        },
        IsVerified: {
          value: false,
        },
        VerifiedBy: {
          value: "",
        },
        VerifiedDate: {
          value: "",
        },
        InternalRemarks: {
          value: "",
          label: "Internal Remarks",
          rules: [
            (v) =>
              v.length <= 250 ||
              "Character of internal remarks must below or be equal of 250!",
          ],
        },
      },
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
    pSetRequest(item) {
      this.field.ID.value = item.ID;
      this.field.QueueID.value = item.QueueID;
      this.field.PointID.ID = item.PointID;
      this.field.PointID.value = item.PointDescription;
      this.field.PlatNumber.value = "";
      this.field.IsRequested.value = false;
      this.field.RequestedBy.value = "";
      this.field.InternalRemarks.value = "";
      this.IsRequested = true;
    },
    pSaveRequest() {
      this.queuePoint.map((e) => {
        if (e.ID == this.field.ID.value) {
          let date = new Date();
          let dateWithFormat = date.toJSON().slice(0, 10).replace(/-/g, "/");
          let hour = date.getHours();
          let minute = date.getMinutes();

          e.PointSubID = this.field.PointSubDetailID.ID;
          e.PointSubDescription = this.GetSubPoint[0].name;
          e.PlatNumber = this.field.PlatNumber.value;
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
      this.queuePoint.map((e) => {
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
    pSetVerify(item) {
      console.log(item);
      this.field.ID.value = item.ID;
      this.field.QueueID.value = item.QueueID;
      this.field.PointID.ID = item.PointID;
      this.field.PointID.value = item.PointDescription;
      this.field.PointSubDetailID.value = item.PointSubDescription;
      this.IsVerified = true;
    },
    pSaveVerify() {
      this.queuePoint.map((e) => {
        if (e.ID == this.field.ID.value) {
          let date = new Date();
          let dateWithFormat = date.toJSON().slice(0, 10).replace(/-/g, "/");
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
      this.queuePoint.map((e) => {
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
      this.queuePoint.map((e) => {
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
        InternalRemarks: "",
      });
      this.IsAddPoint = false;
    },
    pDeletePoint(index) {
      this.queuePoint.splice(index, 1);
    },
  },
  computed: {
    GetPoint() {
      return this.ListPoint.filter((e) => e.ID == this.field.PointID.ID);
    },
    GetSubPoint() {
      return this.ListPointSub.filter(
        (e) => e.PointID == this.field.PointID.ID
      );
    },
    GetListSubPoint() {
      return this.ListPointSub.filter(
        (e) => e.PointID == this.field.PointID.ID
      );
    },
  },
};
</script>

<style scoped>
#queue-position {
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
