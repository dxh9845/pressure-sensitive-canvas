import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

// app.js
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import './registerServiceWorker';

Vue.use(BootstrapVue);


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
