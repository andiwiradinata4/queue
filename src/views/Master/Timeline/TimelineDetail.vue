<template>
  <v-app>
    <v-container>
      <div v-if="id == 0" class="list-title ml-5 pb-5 mt-2">{{ title }}</div>
      <div v-else class="list-title ml-5 pb-5 mt-2">
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
                    <v-row class="mb-0 mt-0">
                      <v-col cols="4" class="pt-0">
                        <div v-for="item in itemsPoint" :key="item.ID">
                          <v-card
                            class="ma-2"
                            color="teal lighten-5"
                            elevation="2"
                          >
                            <v-card-text>
                              <v-row class="pa-0">
                                <v-col cols="9">
                                  <div class="caption">Point</div>
                                  <h1 class="title">{{ item.name }}</h1>
                                </v-col>

                                <v-col cols="3">
                                  <v-btn
                                    @click="pAdd(item)"
                                    class="ma-1"
                                    fab
                                    small
                                    :color="btnAdd.color"
                                  >
                                    <v-icon>
                                      {{ btnAdd.icon }}
                                    </v-icon>
                                  </v-btn>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                        </div>
                      </v-col>
                      <v-col cols="8" class="pt-0">
                        <v-timeline reverse>
                          <v-slide-x-reverse-transition group hide-on-leave>
                            <v-timeline-item
                              v-for="(item, i) in field.point.value"
                              :key="i"
                            >
                              <v-card color="grey lighten-5" elevation="3">
                                <v-container>
                                  <v-row class="pl-3">
                                    <v-col
                                      cols="10"
                                      class="pb-0 font-weight-bold pr-0"
                                      >{{ item.PointName }}</v-col
                                    >
                                    <v-col cols="2">
                                      <v-btn
                                        @click="pDelete(i)"
                                        class="ma-1"
                                        fab
                                        small
                                        :color="btnDelete.color"
                                      >                                    <v-icon>
                                      {{ btnDelete.icon }}
                                    </v-icon></v-btn>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card>
                            </v-timeline-item>
                          </v-slide-x-reverse-transition>
                        </v-timeline>
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
        color: "warning",
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
      itemsPoint: [
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
          name: "Laboratory / Sampling",
        },
        {
          id: 4,
          name: "Laboratory / labtest",
        },
        {
          id: 5,
          name: "Weighbridge Check In",
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
      this.idx = this.idx + 1;
      this.field.point.value.push({
        PointID: point.id,
        Idx: this.idx,
        PointName: point.name,
      });
      console.log(this.field.point.value);
    },
    pDelete(i) {
      this.field.point.value.pop(i);
      console.log(this.field.point.value);
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