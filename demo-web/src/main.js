import Vue from 'vue';
import App from "./App.vue";
// Packages
import vuetify from "@/plugins/vuetify";
import router from "./routers";
import store from "./stores";
import Vuelidate from "vuelidate";
import VueSlimScroll from 'vue-slimscroll';
import VueSession from 'vue-session'
import moment from "moment";
// Plugins
import notify from "plugins/notify";
import { TiptapVuetifyPlugin } from 'tiptap-vuetify';
import VueMask from 'v-mask';

// Css
import 'tiptap-vuetify/dist/main.css'
import 'vuetify/dist/vuetify.min.css';
// Utils
import { registerModules } from "./register-modules";
import modules from "./list-module";
import '@/assets/sass/main.scss';

registerModules(modules);

Vue.prototype.$notify = notify;
Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueSlimScroll);
Vue.use(VueSession);

Vue.use(TiptapVuetifyPlugin, {
    // the next line is important! You need to provide the Vuetify Object to this place.
    vuetify, // same as "vuetify: vuetify"
    // optional, default to 'md' (default vuetify icons before v2.0.0)
    iconsGroup: 'mdi'
})

Vue.use(VueMask);
//Vue.use(moment);
moment.locale('en');

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");