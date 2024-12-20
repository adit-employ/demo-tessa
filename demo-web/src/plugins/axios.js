import Vue from "vue";
import notify from "@/plugins/notify";
import router from "@/routers";
import store from "@/stores";
import mgr from "@/utils/user-manager";
import axios from "axios";

Vue.prototype.$notify = notify;


//const mgr = new Mgr();

export const apiAdapter = async (baseURL) => {
    const config = {
        baseURL: baseURL,
        timeout: 150000,
        onUploadProgress: progressEvent => {
            let percentage = store.state.upload.upload;
            percentage = parseInt(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
            store.commit(`upload/SET_PROGRESS_UPLOAD`, percentage);
        }
    };
    let user = await mgr.getUser();
    const _axios = axios.create(config);

    _axios.interceptors.request.use(config => {
        const token = user != null ? `Bearer ${user.access_token}` : null;
        if (token) config.headers["Authorization"] = token;
        return config;
    });

    _axios.interceptors.response.use(
        response => {
            store.commit(`upload/SET_PROGRESS_UPLOAD`, 0);
            return response.data;
        },
        error => {
            if (error.response.status === 401) {
                Vue.prototype.$notify({
                    title: "Session Timeout.",
                    // title: "Failed",
                    content: "Your session is already expired, please sign in again to continue.",
                    // content: "Sesi telah habis, mohon login kembali",
                    color: "rgb(255, 0, 0)"
                });
                router.push({ name: "signout", query: { url: router.path } });
            }
            if (error.response.status === 403) {
                Vue.prototype.$notify({
                    title: "Forbidden.",
                    // title: "Failed",
                    content: "You cannot perform this action, please try again later or contact the administrator.",
                    // content: "Anda tidak dapat melakukan permintaan ini, silahkan coba lagi nanti atau hubungi adminsitrator",
                    color: "rgb(255, 0, 0)"
                });
            }
            store.commit(`upload/SET_PROGRESS_UPLOAD`, 0);
            return Promise.reject(error);
        }
    );

    return _axios;
};
