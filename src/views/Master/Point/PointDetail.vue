<template>
  <v-app>
    <div id="btn-driver" class="d-flex flex-row btn-header">
      <div v-if="id == 0" class="list-title">
        {{ title }}
      </div>
      <div v-else class="list-title">View Point [ ID : {{ id }} ]</div>

      <v-spacer></v-spacer>
    </div>
    <v-divider></v-divider>

    <v-container>
      <v-row class="mt-0">
        <v-col cols="12">
          <template>
            <v-card>
              <v-card-text>
                <v-form v-model="field.isValid" lazy-validation>
                  <v-container fluid>
                    <v-row class="mb-0 mt-0">
                      <v-col cols="12">
                        <v-textarea
                          v-model="field.description.value"
                          :rules="field.description.rules"
                          :placeholder="field.description.placeHolder"
                          outlined
                          clearable
                          :label="field.description.label"
                          counter="250"
                          rows="5"
                          required
                        ></v-textarea>
                      </v-col>
                    </v-row>
                    <v-row class="mt-0">
                      <v-col cols="3">
                        <v-select
                          v-model="field.statusID.value"
                          :items="itemsStatus"
                          item-text="name"
                          item-value="id"
                          :rules="field.statusID.rules"
                          :label="field.statusID.label"
                          outlined
                          clearable
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
    Snackbar,
  },
  props: { id: String },
  data() {
    return {
      title: "Create New Point",
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
      itemsStatus: [
        { id: 0, name: "ACTIVE" },
        { id: 1, name: "IN-ACTIVE" },
        { id: 2, name: "BLACKLIST" },
      ],
      field: {
        isValid: true,
        description: {
          value: "",
          placeHolder: "Description",
          label: "Description",
          rules: [(v) => !!v || "Description is required!"],
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
    pSave() {
      this.snackbar.isActive = true;
      this.snackbar.text = "Press save";
    },
    pBack() {},
  },
  computed: {},
};
</script>