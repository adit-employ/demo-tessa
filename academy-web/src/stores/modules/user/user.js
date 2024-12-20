import { TYPES } from './mutation-type';

const state = () => ({
    user: {},
})

const mutations = {
    [TYPES.SET_USER](state, payload) {
        state.user = payload;
    },
}


export default {
    namespaced: true,
    state,
    mutations,
}
