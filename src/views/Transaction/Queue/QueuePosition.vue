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
                  <v-col>
                    <v-timeline align-top dense>
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
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-container class="ma-0">
                              <v-card-text class="pa-0">
                                <v-row class="mb-2">
                                  <v-col cols="1" class="font-weight-bold ml-2">
                                    Plat Number
                                    <div class="font-weight-regular">
                                      {{ item.PlatNumber }}
                                    </div>
                                  </v-col>
                                  <v-col cols="1" class="font-weight-bold">
                                    Requested By
                                    <div class="font-weight-regular">
                                      {{ item.RequestedBy }}
                                    </div>
                                  </v-col>
                                  <v-col cols="1" class="font-weight-bold">
                                    Requested Date
                                    <div class="font-weight-regular">
                                      {{ item.RequestDate }}
                                    </div>
                                  </v-col>

                                  <v-col cols="1" class="font-weight-bold">
                                    Verified By
                                    <div class="font-weight-regular">
                                      {{ item.VerifiedBy }}
                                    </div>
                                  </v-col>
                                  <v-col cols="1" class="font-weight-bold">
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
                              <v-divider></v-divider>
                              <v-card-actions class="pb-0">
                                <v-spacer></v-spacer>
                                <v-btn
                                  @click="pSave"
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
                                  @click="pSave"
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
                              </v-card-actions>
                            </v-container>
                          </v-card>
                        </v-timeline-item>
                      </div>
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
      btnVerify: {
        icon: "done",
        text: "Verify",
        color: "success",
        disabled: false,
      },
      btnRequest: {
        icon: "near_me",
        text: "Request",
        color: "primary",
        disabled: true,
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
      queuePoint: [
        {
          ID: "20210419-KM1-0001-001",
          QueueID: "20210419-KM1-0001",
          PointID: "1",
          PointDescription: "Parking Area",
          PointSubID: "1",
          PointSubDescription: "Parking Area 1",
          PlatNumber: "BK1234CC",
          IsRequested: true,
          RequestedBy: "ADMIN",
          RequestDate: "23/04/2021 08:05",
          IsVerified: true,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: "",
        },
        {
          ID: "20210419-KM1-0001-002",
          QueueID: "20210419-KM1-0001",
          PointID: "2",
          PointDescription: "Security",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: true,
          RequestedBy: "",
          RequestDate: "",
          IsVerified: true,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: "",
        },
        {
          ID: "20210419-KM1-0001-003",
          QueueID: "20210419-KM1-0001",
          PointID: "3",
          PointDescription: "Laboratory / Sampling",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: "",
        },
        {
          ID: "20210419-KM1-0001-004",
          QueueID: "20210419-KM1-0001",
          PointID: "4",
          PointDescription: "Laboratory / Labtest",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: "",
        },
        {
          ID: "20210419-KM1-0001-005",
          QueueID: "20210419-KM1-0001",
          PointID: "5",
          PointDescription: "Weighbridge Check In",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: "",
        },
        {
          ID: "20210419-KM1-0001-006",
          QueueID: "20210419-KM1-0001",
          PointID: "6",
          PointDescription: "Unloading Station",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: "",
        },
        {
          ID: "20210419-KM1-0001-007",
          QueueID: "20210419-KM1-0001",
          PointID: "7",
          PointDescription: "Weighbridge Check Out",
          PointSubID: "0",
          PointSubDescription: "",
          PlatNumber: "",
          IsRequested: false,
          RequestedBy: "",
          RequestDate: "",
          IsVerified: false,
          VerifiedBy: "",
          VerifiedDate: "",
          InternalRemarks: "",
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
