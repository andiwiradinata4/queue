<template>
  <v-app id="list-template"><Title v-bind:title="title" /></v-app>
</template>

<script>
import Title from '@/components/ViewTitle.vue'

export default {
  name: "ListTemplate",
  components: {Title},
  data() {
    return {
      title: "List Template"
    }
  },

}
</script>

