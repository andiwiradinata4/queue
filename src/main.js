import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
// import datetimepicker from './plugins/datetimepicker';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  // datetimepicker,
  render: h => h(App)
}).$mount('#app')
