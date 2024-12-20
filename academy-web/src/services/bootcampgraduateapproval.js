import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const getBootcampGraduateApprovalAll = async () => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`bootcamp/listbybod/`) // TESS
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampGraduateApproval = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/graduateapproval/${payload.id}`, payload) 
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampGraduateApprovalNeedAdjustment = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/graduateApprovalNeedAdjusment/${payload.id}`, payload) 
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

export { getBootcampGraduateApprovalAll, updateBootcampGraduateApproval, updateBootcampGraduateApprovalNeedAdjustment };
