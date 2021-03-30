<template>
  <v-app><Title v-bind:title="title" /></v-app>
</template>

<script>
import Title from '@/components/ViewTitle.vue'

export default {
  name: "ListDriver",
  components: {Title},
  data() {
    return {
      title: "List Driver"
    }
  },

}
</script>