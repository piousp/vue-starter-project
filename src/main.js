// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Datepicker from "vuejs-datepicker";
import VeeValidate from "vee-validate";
import VueI18n from "vue-i18n";
import VueToastr from "@deveodk/vue-toastr";
import App from "./App.vue";
import router from "./config/router";
import Auth from "./config/auth.js";
import axios from "./config/axios.js";
import messages from "./i18n";
import "./config/filtros.js";

const pkg = require("../package.json").name;

Vue.config.productionTip = false;

Vue.use(VueToastr);
Vue.use(VeeValidate);
Vue.use(Auth, axios, { pkg });
Vue.use(VueI18n);

Vue.component("datepicker", Datepicker);

Vue.prototype.$auth.checkAuth();

const i18n = new VueI18n({
  locale: "es",
  messages,
});

/* eslint-disable no-new */
export default new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  i18n,
});
