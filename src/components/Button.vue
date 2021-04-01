<template>
  <v-btn @click="execute" class="custom-btn" :color="properties.color" :outlined="properties.outlined">
    <v-icon class="btn-icon mr-2">
      {{ properties.icon }} 
    </v-icon>
    {{ properties.text }}
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: ['callback', 'properties'],
  methods: {
    execute() {
      if (this.callback) {
        this.callback();
      }
    },
  },
  components: {},
};
</script>

<style scoped>
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

</style>