import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
Vue.prototype.$mapFields = Vue;

Vue.config.productionTip = false;

new Vue({
  router,
  render: home => home(App)
}).$mount('#app');
