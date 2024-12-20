import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const getStudentsAll = async (status) => {
    const api = await apiAdapter(SERVICE.API);
    // debugger;
    // console.log('services student => getStudentsAll status : ', status);
    // console.log('services student => getStudentsAll status lenght : ', status.trim().lenght);
    let url = `students/list/`;

    if(status != undefined && status.trim().length > 0){
        url = `students/list?studentStatus=${status}`;
        // console.log('url harusnya berubah!');
    }

    // console.log('services student => getStudentsAll url : ', url);
    return new Promise((resolve, reject) => {
        return api
            .get(url)
            .then(response => {
                // console.log('services student => getStudentsAll response : ', response);
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getStudentsDetail = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    // console.log("services students get detail : ", id);
    return new Promise((resolve, reject) => {
        return api
            .get(`students/${id}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};


const getStudentsBootcamp = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    // console.log("services students get detail : ", id);
    return new Promise((resolve, reject) => {
        return api
            .get(`bootcamp/listByStudent?id=${id}`)
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
export { getStudentsAll, getStudentsDetail, getStudentsBootcamp };

