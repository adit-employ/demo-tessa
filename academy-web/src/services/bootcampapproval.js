import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const getBootcampApprovalAll = async (userId) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`bootcamp/listbyapprover/${userId}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampApproval = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/approval/${payload.id}`, payload)
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
export { getBootcampApprovalAll, updateBootcampApproval };
