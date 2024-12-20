import store from '@/stores';
import { TYPES } from "@/stores/modules/notify/mutation-type";

const notify = (payload) => {
    store.commit(`notify/${TYPES.SET_SHOW_NOTIFY}`, payload);
};

export default notify;
