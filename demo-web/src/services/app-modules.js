import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

//  [SwaggerOperation(Summary = "Retrieve list of records by status", OperationId = "Get by status", Tags = new[] { "App Module" })]
const getModuleActive = async (recordStatus) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`appmodule/list${recordStatus}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getModuleAll = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`appmodule/list/`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

export { getModuleActive, getModuleAll };
