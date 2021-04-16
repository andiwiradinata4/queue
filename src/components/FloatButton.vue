<template>
  <v-btn
    @click="clickMe"
    class="ma-1"
    fab small
    :color="properties.color"
    :outlined="properties.outlined"
  >
    <v-icon>
      {{ properties.icon }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    callBack: Function,
    properties: Object,
  },
  data: function () {
    return { clickMe: this.callBack };
  },
  components: {},
};
</script>

<style scoped>


</style>