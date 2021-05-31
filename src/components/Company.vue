<template>
  <v-dialog ref="field" v-model="showDialog" :return-value.sync="GetCompanyID" width="800px">
    <template v-slot:activator="{on, attrs}">
      <v-text-field
        v-model="GetCompanyID"
        :label="label"
        append-icon="search"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>

    <v-card>
      <v-card-title class="pt-0 pb-2">
        <v-text-field v-model="search" append-icon="mdi-magnify" placeholder="Search" hide-details></v-text-field>
      </v-card-title>

      <template>
        <v-data-table :headers="headers" :items="itemData" :search="search" fixed-header multi-sort>
          <template v-slot:item.Get="{ item }">
            <v-btn @click="$refs.field.save(item)" color="success" fab x-small>
              <v-icon>check</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Company",
  props: {
    dialog: Boolean,
    id: String,
    value: String,
    label: String,
  },
  data() {
    return {
      CompanyID: this.id,
      CompanyName: this.value,
      search: "",
      showDialog: this.dialog,
      field: [],
      headers: [
        { text: "Get", value: "Get", width: 80, align: "center" },
        { text: "Company ID", value: "CompanyID", width: 150 },
        { text: "Company Name", value: "CompanyName" }
      ],
      itemData: [
        { CompanyID: "MM", CompanyName: "MUSIM MAS, PT" },
        { CompanyID: "AGR", CompanyName: "AGROWIRATAMA, PT" }
      ]
    };
  },
  computed: {
    GetCompanyID: {
      get() {
        return this.CompanyID;
      },
      set(value) {
        console.log(value);
        this.$emit('input', value.CompanyID);
        this.CompanyID = value.CompanyID;
        this.CompanyName = value.CompanyName;
      }
    }
  },
  watch: {
    value (newVal) {
      this.CompanyID = newVal
    }
  },
  methods: {
    pGet(item) {
      this.CompanyID = item.CompanyID;
      this.CompanyName = item.CompanyName;
      this.$emit('input', item.CompanyID);
      this.$emit('change', item.CompanyID);
      this.showDialog = false;
    }
  }
};
</script>