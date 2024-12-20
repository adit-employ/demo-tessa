import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const getBootcampAssessmentQCAll = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`bootcamp/listbyqc/${id}`) // 
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampAssessmentFT1 = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/Assessmentft1/${payload.id}`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateAssessmentFT2 = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/assessmentft2/${payload.id}`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampAssessmentExtend = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/assessmentextend/${payload.id}`, payload)
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
export { getBootcampAssessmentQCAll, updateBootcampAssessmentFT1
    , updateAssessmentFT2, updateBootcampAssessmentExtend };
