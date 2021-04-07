<template>
  <nav>
    <v-navigation-drawer permanent v-model="drawer" app>
      <v-layout column align-center>
        <v-flex class="mt-3 mb-3">
          <v-list-item-title class="title">QMS</v-list-item-title>
          <v-list-item-subtitle> Queue Management System </v-list-item-subtitle>
        </v-flex>
      </v-layout>

      <v-divider></v-divider>

      <v-list>
        <!-- Dashboard -->
        <v-list-item
          v-for="item in menuDashboard"
          :key="item.id"
          router
          :to="item.route"
          active-class="primary--text"
        >
          <template>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>

        <!-- Master -->
        <v-list-group value="false">
          <template v-slot:activator>
            <v-icon class="mr-8">source</v-icon>

            <v-list-item-title>Master</v-list-item-title>
          </template>

          <v-list-item
            v-for="item in menuMaster"
            :key="item.id"
            link
            :to="item.route"
            class="ml-2"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- Transaction -->
        <v-list-group value="false">
          <template v-slot:activator>
            <v-icon class="mr-8">sticky_note_2</v-icon>

            <v-list-item-title>Transaction</v-list-item-title>
          </template>

          <v-list-item
            v-for="item in menuTransaction"
            :key="item.id"
            link
            :to="item.route"
            class="ml-2"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  components: {},
  data: () => ({
    drawer: true,
    menuDashboard: [
      {
        id: 1,
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        route: "/",
      },
    ],
    menuMaster: [
      { id: 1, title: "Driver", icon: "mdi-account", route: "/driver" },
      {
        id: 2,
        title: "Queue Position",
        icon: "place",
        route: "/queue-position",
      },
      {
        id: 3,
        title: "Template",
        icon: "table_chart",
        route: "/template",
      },
    ],
    menuTransaction: [
      { id: 1, title: "Queue", icon: "queue", route: "/queue" },
    ],
    items: [
      {
        id: 1,
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        route: "/",
      },
      {
        id: 2,
        title: "Driver",
        icon: "mdi-account",
        route: "/driver",
      },
      {
        id: 3,
        title: "Queue",
        icon: "queue",
        route: "/queue",
      },
      {
        id: 4,
        title: "Template",
        icon: "table_chart",
        route: "/template",
      },
    ],
  }),
  methods: {},
};
</script>
<style scoped>
</style>