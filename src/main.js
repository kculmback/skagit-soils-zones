import 'fontsource-open-sans';
import 'fontsource-lato';
import '@fortawesome/fontawesome-free/css/all.css';
import 'verte/dist/verte.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount('#app');
