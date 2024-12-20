import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const allBuilding = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`buildings`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

export { allBuilding };
