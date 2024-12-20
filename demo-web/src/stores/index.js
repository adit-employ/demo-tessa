import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import notify from '@/stores/modules/notify/notify';
import upload from '@/stores/modules/upload/upload';
import user from '@/stores/modules/user/user';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        notify,
        upload,
        user
    }
})
