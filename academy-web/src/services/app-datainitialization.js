import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

//  [SwaggerOperation(Summary = "Retrieve list of records by status", OperationId = "Get by status", Tags = new[] { "App Module" })]
const initAppModule = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`appdataInitializationModule`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const initAppRoleAdmin = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`appdataInitializationRoleAdmin`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const initBatch = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    console.log('service init Batch => payloas', payload);
    return new Promise((resolve, reject) => {
        return api
            .post(`appdataInitializationBatchNumber`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};



export { initAppModule, initAppRoleAdmin, initBatch };
