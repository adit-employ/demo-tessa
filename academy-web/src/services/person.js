import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const getPerson = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`person/list`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

export { getPerson };
