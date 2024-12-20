import { TYPES } from './mutation-type';

const state = () => ({
    notifies: [],
})

const mutations = {
    [TYPES.SET_SHOW_NOTIFY](state, payload) {
        const { title, content, color } = payload;

        if (state.notifies.length > 0) state.notifies = [];
        state.notifies = [...state.notifies, { title, content, color, show: true }];
    },
    [TYPES.REMOVE_NOTIFY](state) {
        state.notifies = [];
    }
}


export default {
    namespaced: true,
    state,
    mutations,
}
