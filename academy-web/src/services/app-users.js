import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

//  [SwaggerOperation(Summary = "Retrieve record list by status", OperationId = "GetListByStatus", Tags = new[] { "App User" })]
const getUserAll = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`appuser/list/`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

//  [SwaggerOperation(Summary = "Retrieve record by id", OperationId = "GetById", Tags = new[] { "App User" })]
const getUserDetail = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`appuser/${id}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

//  [SwaggerOperation(Summary = "Register a new data", OperationId = "Create", Tags = new[] { "App User" })]
const createUser = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`appuser`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

//  [SwaggerOperation(Summary = "Modify existing data", OperationId = "Update", Tags = new[] { "App User" })]
const updateUser = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`appuser/${payload.id}`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getUserRoleModuleByEmail = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`appuser/email`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const GetUserRoleModuleByEmailBypass = async (email) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`appuser/emailbypass?email=${email}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};


//  For Select Option HTML
const getSelectOptionUserByRole = async (roleName) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`appuser/rolename?roleName=${roleName}`)
            .then(response => {
                resolve(response.items);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};




// export { login, logout, setTimerToken, refreshToken };
export { getUserAll, getUserDetail, createUser, updateUser, 
    getUserRoleModuleByEmail, getSelectOptionUserByRole
    , GetUserRoleModuleByEmailBypass
};
