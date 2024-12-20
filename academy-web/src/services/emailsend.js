import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const sendEmail = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`sendEmail`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const sendEmailBootcampBastStudent = async (payload) => {
    console.log('==> service email on proses', payload);
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .put(`sendEmailBast/${payload.id}`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};


export {
    sendEmail
    ,sendEmailBootcampBastStudent
}