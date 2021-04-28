<template>
  <v-app>
    <v-container>
      <div v-if="id == 0" class="list-title ml-5 pb-6 mt-2 pt-1">
        {{ title }}
      </div>
      <div v-else class="list-title ml-5 pb-6 mt-2 pt-1">
        View Timeline [ ID : {{ id }} ]
      </div>

      <v-row class="pt-0">
        <v-col cols="12" class="pt-0">
          <template>
            <v-card>
              <v-card-text>
                <v-form v-model="field.isValid" lazy-validation>
                  <v-container fluid>
                    <v-row class="mb-0 mt-0">
                      <v-col cols="9" sm="8" class="pt-0">
                        <v-row class="mb-0 mt-0">
                          <v-col cols="6">
                            <v-select
                              v-model="field.company.value"
                              :items="itemsCompany"
                              item-text="name"
                              item-value="id"
                              :rules="field.company.rules"
                              :label="field.company.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>
                          <v-col cols="6">
                            <v-select
                              v-model="field.location.value"
                              :items="itemsLocation"
                              item-text="name"
                              item-value="id"
                              :rules="field.location.rules"
                              :label="field.location.label"
                              outlined
                              required
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-timeline dense class="pt-0">
                          <v-slide-x-reverse-transition group hide-on-leave>
                            <v-timeline-item
                              small
                              v-for="(item, i) in field.point.value"
                              :key="i"
                            >
                              <v-col cols="12" class="pb-0 text-h6">
                                <div class="mb-2">
                                  {{ i + 1 }}. {{ item.PointName }}
                                  <span class="ml-2">
                                    <v-btn
                                      @click="pDelete(i)"
                                      fab
                                      small
                                      :color="btnDelete.color"
                                    >
                                      <v-icon>
                                        {{ btnDelete.icon }}
                                      </v-icon></v-btn
                                    >
                                  </span>
                                </div>
                              </v-col>
                            </v-timeline-item>
                          </v-slide-x-reverse-transition>
                        </v-timeline>
                      </v-col>
                      <v-col cols="3" sm="4">
                        <v-row class="ml-1">
                          <v-col>
                            <v-spacer></v-spacer>
                            <Button
                              :callBack="pRefreshPoint"
                              :properties="btnRefreshPoint"
                            />
                          </v-col>
                        </v-row>
                        <div v-for="(item, i) in itemsPoint" :key="item.ID">
                          <v-card
                            class="ma-3"
                            color="teal lighten-5"
                            elevation="2"
                            :key="i"
                          >
                            <v-card-text>
                              <v-row class="pa-0">
                                <v-col cols="12">
                                  <div class="caption">
                                    Point
                                    <h1 class="text-h6">
                                      {{ item.name }}
                                      <span class="ml-2">
                                        <v-btn
                                          @click="pAdd(item)"
                                          fab
                                          small
                                          :color="btnAdd.color"
                                          class="mb-1"
                                        >
                                          <v-icon>
                                            {{ btnAdd.icon }}
                                          </v-icon>
                                        </v-btn></span
                                      >
                                    </h1>
                                  </div>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <Button :callBack="pSave" :properties="btnSave" />
                <router-link to="/timeline">
                  <Button :callBack="pBack" :properties="btnBack" />
                </router-link>
              </v-card-actions>
            </v-card>
          </template>
        </v-col>
      </v-row>

      <v-dialog
        transition="dialog-top-transition"
        persistent
        max-width="500px"
        v-model="MessageBox.value"
        scrollable
      >
        <v-card>
          <v-card-title class="py-3">
            <div class="title">
              {{ MessageBox.title }}
            </div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text
            class="py-3 text-h6 font-weight-regular"
            style="background-color: w hite"
          >
            {{ MessageBox.text }}
          </v-card-text>
          <v-card-actions class="pt-0" style="background-color: white">
            <v-spacer></v-spacer>
            <Button :callBack="pCloseMessageBox" :properties="btnClose" />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>

    <Snackbar v-bind:properties="snackbar" />
  </v-app>
</template>

<script>
import Button from "@/components/Button.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  name: "TimelineDetail",
  components: {
    Button,
    Snackbar,
  },
  props: { id: String },
  data() {
    return {
      title: "Create New Timeline",
      idx: 0,
      snackbar: {
        isActive: false,
        text: "",
        color: "primary",
      },
      btnAdd: {
        icon: "mdi-plus",
        text: "Add",
        color: "primary",
      },
      btnDelete: {
        icon: "delete",
        text: "Delete",
        color: "error",
      },
      btnRefreshPoint: {
        icon: "refresh",
        text: "Refresh Point",
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
      btnClose: {
        icon: "close",
        text: "Close",
        color: "normal",
        outlined: true,
      },
      allItemPoint: [
        {
          id: 1,
          name: "Parking Area",
        },
        {
          id: 2,
          name: "Security",
        },
        {
          id: 3,
          name: "Weighbridge Checker",
        },
        {
          id: 4,
          name: "Laboratory / Sampling",
        },
        {
          id: 5,
          name: "Laboratory / Labtest",
        },
        {
          id: 6,
          name: "Weighbridge Check In",
        },
        {
          id: 7,
          name: "Unloading Station",
        },
        {
          id: 8,
          name: "Weighbridge Check Out",
        },
      ],
      itemsPoint: [
        // {
        //   id: 1,
        //   name: "Parking Area",
        // },
        // {
        //   id: 2,
        //   name: "Security",
        // },
        // {
        //   id: 3,
        //   name: "Laboratory / Sampling",
        // },
        // {
        //   id: 4,
        //   name: "Laboratory / labtest",
        // },
        // {
        //   id: 5,
        //   name: "Weighbridge Check In",
        // },
        // {
        //   id: 6,
        //   name: "Weighbridge Check In",
        // },
        // {
        //   id: 7,
        //   name: "Unloading Station",
        // },
        // {
        //   id: 8,
        //   name: "Weighbridge Check Out",
        // },
      ],
      itemsStatus: [
        { id: 0, name: "ACTIVE" },
        { id: 1, name: "IN-ACTIVE" },
        { id: 2, name: "BLACKLIST" },
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
      ],
      MessageBox: {
        value: false,
        text: "",
        title: "",
        color: "error",
      },
      field: {
        isValid: true,
        company: {
          value: { id: "", name: "" },
          placeHolder: "Company",
          label: "Company",
          rules: [(v) => !!v || "Company is required!"],
        },
        location: {
          value: { id: "", name: "" },
          placeHolder: "Location",
          label: "Location",
          rules: [(v) => !!v || "Location is required!"],
        },
        point: {
          value: [],
          label: "Point",
          rules: [(v) => v.id != 0 || "Point is required!"],
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
        statusID: {
          value: { id: 0, name: "ACTIVE" },
          label: "Status",
          rules: [(v) => !!v || "Status is required!"],
        },
      },
    };
  },
  methods: {
    pAdd(point) {
      this.field.point.value.push({
        PointID: point.id,
        Idx: this.idx++,
        PointName: point.name,
      });
    },
    pDelete(i) {
      this.field.point.value.splice(i, 1);
    },
    pRefreshPoint() {
      if (
        this.field.company.value.id == "" &&
        this.field.location.value.id == ""
      ) {
        this.MessageBox.title = "Message";
        this.MessageBox.text = "Please choose company and location first";
        this.MessageBox.value = true;
      } else if (this.field.company.value.id == "") {
        this.MessageBox.title = "Message";
        this.MessageBox.text = "Please choose company first";
        this.MessageBox.value = true;
      } else if (this.field.location.value.id == "") {
        this.MessageBox.title = "Message";
        this.MessageBox.text = "Please choose location first";
        this.MessageBox.value = true;
      } else {
        this.itemsPoint = this.allItemPoint;
        // this.allItemPoint.forEach((e) => {
        //   this.itemsPoint.push(e);
        // });
        console.log(this.itemsPoint);
      }
    },
    pCloseMessageBox() {
      this.MessageBox.value = false;
    },
    pSave() {
      this.snackbar.isActive = true;
      this.snackbar.text = "Press save";
    },
    pBack() {
      window.scrollTo(0, 0);
    },
  },
  computed: {},
};
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 0 !important;
}
</style>>