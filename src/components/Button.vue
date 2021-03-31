<template>
  <v-btn @click="execute" class="btn-new" :color="button.color">
    <v-icon class="btn-icon mr-2">
      {{ button.icon }} 
    </v-icon>
    {{ button.text }}
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: ['callback', 'button'],
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
.btn-new {
  width: 120px;
  margin-right: 5px;
  margin-bottom: 5px;
}

.btn-icon { 
  margin-left: 0px;
  margin-right: 5px;
}

</style>