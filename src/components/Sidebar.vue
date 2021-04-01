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
        <v-list-item
          v-for="item in items"
          :key="item.id"
          router
          :to="item.route"
          active-class="menu-active"
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
};
</script>
<style scoped>
.menu-active {
  border-left: 4px solid rgb(152, 238, 152);
}
</style>