<template>
  <v-app>
    <v-container>
      <div v-if="id == 0" class="list-title ml-5 pb-0 mt-2 pt-1">{{ title }}</div>
      <div v-else class="list-title ml-5 pb-0 mt-2 pt-1">View Point [ ID : {{ id }} ]</div>

      <!-- Bread Crumbs -->
      <v-breadcrumbs :items="breadcrumbsItem" class="pt-3 pb-5 pl-5" large>
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

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
                      <v-col cols="6">
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
                    </v-row>
                    <v-row class="mb-0 mt-0">
                      <v-col cols="12" class="pt-0">
                        <v-textarea
                          v-model="field.Description.value"
                          :rules="field.Description.rules"
                          :placeholder="field.Description.placeHolder"
                          outlined
                          :label="field.Description.label"
                          counter="250"
                          rows="5"
                          required
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row class="mt-0">
                      <v-col cols="8" class="pt-0">
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
                      <v-col cols="4" class="pt-0">
                        <v-select
                          v-model="field.StatusID.value"
                          :items="itemsStatus"
                          item-text="name"
                          item-value="id"
                          :rules="field.StatusID.rules"
                          :label="field.StatusID.label"
                          outlined
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <Button :callBack="pSave" :properties="btnSave" />
                <router-link to="/point">
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
  name: "PointDetail",
  components: {
    Button,
    Snackbar
  },
  props: { id: String },
  data() {
    return {
      title: "Create New Point",
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
      itemsStatus: [
        { id: 0, name: "ACTIVE" },
        { id: 1, name: "IN-ACTIVE" },
        { id: 2, name: "BLACKLIST" }
      ],
      itemsCompany: [
        { id: "MM", name: "MUSIM MAS, PT" },
        { id: "AGR", name: "AGROWIRATAMA, PT" },
        { id: "GIN", name: "GUNTUNG IDAMANNUSA, PT." }
      ],
      itemsLocation: [
        { id: "MDN-KIM1", name: "MEDAN KIM 1" },
        { id: "MDN-KIM2", name: "MEDAN KIM 2" },
        { id: "MDN-KIM3", name: "MEDAN KIM 3" }
      ],
      field: {
        isValid: true,
        Company: {
          value: { id: "", name: "" },
          placeHolder: "Company",
          label: "Company",
          rules: [v => !!v || "Company is required!"]
        },
        Location: {
          value: { id: "", name: "" },
          placeHolder: "Location",
          label: "Location",
          rules: [v => !!v || "Location is required!"]
        },
        Description: {
          value: "",
          placeHolder: "Description",
          label: "Description",
          rules: [
            v => !!v || "Description is required!",
            v =>
              v.length <= 250 ||
              "Character of description must below or be equal of 250!"
          ]
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

        StatusID: {
          value: { id: 0, name: "ACTIVE" },
          label: "Status",
          rules: [v => !!v || "Status is required!"]
        }
      },
      breadcrumbsItem: [
        {
          text: "Point",
          disabled: false,
          to: "/point"
        },
        {
          text: "Point Detail",
          disabled: true,
          to: ""
        }
      ]
    };
  },
  methods: {
    pSave() {
      this.snackbar.isActive = true;
      this.snackbar.text = "Press save";
    },
    pBack() {
      window.scrollTo(0, 0);
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
</style>>
