import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const getLaptopAssetsAll = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`laptopassets/listAll/`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getLaptopAssetsByStatus = async (status) => {
    const api = await apiAdapter(SERVICE.API);
    let url = `laptopassets/list/`;

    if(status != undefined && status.trim().length > 0){
        url = `laptopassets/list?assetStatus=${status}`;
        // console.log('service => getLaptopAssetsByStatus : ', url);
    }

    return new Promise((resolve, reject) => {
        return api
            .get(url)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getLaptopAssetsByLocationIdAndStatus = async (id, status) => {
    const api = await apiAdapter(SERVICE.API);
    let url = `laptopassets/listbylocation/${id}`;

    if(status != undefined && status.trim().length > 0){
        url = `laptopassets/listbylocation/${id}?assetStatus=${status}`;
        console.log('service => getLaptopAssetsByLocationIdAndStatus : ', url);
    }

    return new Promise((resolve, reject) => {
        return api
            .get(url)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getLaptopAssetsDetail = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`laptopassets/${id}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getLaptopAssetsHistory = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`laptopassets/history/${id}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const createLaptopAssets = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`laptopassets`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateLaptopAssets = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`laptopassets/${payload.id}`, payload)
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
export { getLaptopAssetsAll, getLaptopAssetsDetail, getLaptopAssetsHistory, createLaptopAssets, updateLaptopAssets, getLaptopAssetsByStatus, getLaptopAssetsByLocationIdAndStatus };
