import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";


/*  Summary API = "Retrieve list of records by status", OperationId = "GetList", Tags = new[] { "App Role" }) */
const getRoleAll = async (status) => {
    console.log('status : ', status);
    let url = `approle/list`;
    if(status !== undefined && status.length >0){
        url = `approle/list?status=${status}`;
    }
    console.log('URI : ', url);

    const api = await apiAdapter(SERVICE.API);
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

const getSelectOptionRole = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`approle/list?status=Active`)
            .then(response => {
                response.items.forEach(function(v){ 
                    v['name'] = v.roleName, 
                    delete v.createdAt,
                    delete v.createdBy,
                    delete v.deletedAt,
                    delete v.deletedBy,
                    delete v.updatedAt,
                    delete v.updatedBy,
                    delete v.moduls,
                    delete v.position,
                    delete v.recordStatus,
                    delete v.roleName,
                    delete v.version
                 });

                resolve(response.items);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

//  [SwaggerOperation(Summary = "Retrieve record by id", OperationId = "GetById", Tags = new[] { "App Role" })]
const getRoleDetail = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`approle/${id}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

//  [SwaggerOperation(Summary = "Register a new data", OperationId = "Create", Tags = new[] { "App Role" })]
const createRole = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`approle`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

//  [SwaggerOperation(Summary = "Modify existing data", OperationId = "Modify", Tags = new[] { "App Role" })]
const updateRole = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`approle/${payload.id}`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const changeStatusRole = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`approle/changestatus/${payload.id}`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};


export { getRoleAll, getRoleDetail, createRole, updateRole, changeStatusRole, getSelectOptionRole };
