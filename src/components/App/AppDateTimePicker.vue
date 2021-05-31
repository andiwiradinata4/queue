<template>
  <v-app>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
      :disabled="disabled"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="DateFormatted"
          :label="label"
          :placeholder="placeHolder"
          append-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          :outlined="outlined"
          :rules="rules"
          :required="required"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
      </v-date-picker>
    </v-menu>
  </v-app>
</template>

<script>
export default {
  name: "DateTimePicker",
  props: {
    value: String,
    label: String,
    placeHolder: String,
    outlined: Boolean,
    rules: Array,
    disabled: Boolean,
    required: Boolean
  },
  data() {
    return {
      menu: false,
      date: this.value
    };
  },
  computed: {
    DateFormatted: {
      get() {
        return this.formatDate(this.date);
      },
      set(value) {
        this.date = value;
      }
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    }
  }
};
</script>