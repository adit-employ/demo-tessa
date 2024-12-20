import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const getMajorAll = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`major/list/`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getMajorDetail = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`major/${id}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const createMajor = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`major`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateMajor = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`major/${payload.id}`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

// export { login, logout, setTimerToken, refreshToken };
export { getMajorAll, getMajorDetail, createMajor, updateMajor };
