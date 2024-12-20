import { TYPES } from './mutation-type';

const state = () => ({
    progressUpload: 0
})

const mutations = {
    [TYPES.SET_PROGRESS_UPLOAD](state, payload) {
        state.progressUpload = payload;
    }
}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
