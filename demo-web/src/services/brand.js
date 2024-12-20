import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const getBrandAll = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`brand/list/`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getBrandDetail = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`brand/${id}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const createBrand = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`brand`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBrand = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`brand/${payload.id}`, payload)
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
export { getBrandAll, getBrandDetail, createBrand, updateBrand };
