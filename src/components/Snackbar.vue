<template>
  <v-snackbar v-model="properties.isActive" :color="properties.color">
    {{ properties.text }}

    <template v-slot:action="{ attrs }">
      <v-btn icon text v-bind="attrs" @click="properties.isActive = false">
        <v-icon small>close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: { properties: Array },
  components: {},
};
</script>