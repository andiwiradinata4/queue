<template>
  <v-app>
    <Title v-bind:title="title" />

    <v-container>
      <v-row class="mt-0">
        <v-col cols="12">
          <template>
            <Button :callback="pNew" :button="btnNew" />
            <Button :callback="pDetail" :button="btnDetail" />
            <Button :callback="pDelete" :button="btnDelete" />
          </template>
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col cols="12">
          <template>
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="desserts"
                :search="search"
              ></v-data-table>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Title from "@/components/ViewTitle.vue";
import Button from "@/components/Button.vue";

export default {
  name: "ListDriver",
  components: { Title, Button },
  data() {
    return {
      title: "Driver",
      btnNew: {
        icon: "add_circle_outline",
        text: "New",
        color: "primary",
      },
      btnDetail: {
        icon: "mode_edit",
        text: "Edit",
        color: "primary",
      },
      btnDelete: {
        icon: "delete",
        text: "Delete",
        color: "primary",
      },
      search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%',
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%',
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%',
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%',
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%',
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%',
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%',
          },
        ],
      
    };
  },
  methods: {
    pNew() {
      console.log("Press new");
    },
    pDetail() {
      console.log("Press detail");
    },
    pDelete() {
      console.log("Press delete");
    },
  },
};
</script>

<style scoped>
.btn-new {
  width: 120px;
  margin-right: 5px;
}

.btn-icon {
  margin-left: 0px;
  margin-right: 5px;
}
</style>