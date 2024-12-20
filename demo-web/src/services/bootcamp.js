import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const getBootcampAll = async () => {
    const api = await apiAdapter(SERVICE.API);
    // console.log("url api get al Bootcamp : ", api);
    return new Promise((resolve, reject) => {
        return api
            .get(`bootcamp/list`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getBootcampDetail = async (id) => {
    const api = await apiAdapter(SERVICE.API);
    // console.log("services Bootcamp get detail : ", id);
    return new Promise((resolve, reject) => {
        return api
            .get(`bootcamp/${id}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            }); 
    });
};

const getDetailBootcampAssessmentByStudent = async (bootcampId, studentid) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`bootcamp/detailbootcampandassessment/${bootcampId}/${studentid}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getDetailBootcampAssessmentByBootcampId = async (bootcampId) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`bootcamp/detailbootcampandassessment/${bootcampId}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const getSourceDateDetails = async () =>{

    let listDatail = [
        { phase: "Phase1", startDate: null, endDate: null, title: "Kick Off Bootcamp, Soft Skill Business Etiquette & Communication Skill" },
        { phase: "Phase2", startDate: null, endDate: null, title: "Soft Skill Profesional Etic & Softskill Tips Interview" },
        { phase: "Phase3", startDate: null, endDate: null, title: "Logical Material" },
        { phase: "Phase4", startDate: null, endDate: null, title: "Filtering Test 1" },
        { phase: "Phase5", startDate: null, endDate: null, title: "Technology Material" },
        { phase: "Phase6", startDate: null, endDate: null, title: "Mini Project" },
        { phase: "Phase7", startDate: null, endDate: null, title: "Final Presentation" },
        { phase: "Phase8", startDate: null, endDate: null, title: "Extend Mini Project" },
        { phase: "Phase9", startDate: null, endDate: null, title: "Extend Final Presentation" }

    ];

    return new Promise((resolve) => {
        resolve(listDatail);
    })
}

const getSourceStatusBootcamp = async () =>{

    let listDatail = [
        { status: "Created", color:"deep-purple lighten-1",  title: "Register new Bootcamp" },
        { status: "Approval", color:"deep-purple lighten-1",  title: "Bootcamp Approval" },
        { status: "Approved", color:"deep-purple lighten-1",  title: "Bootcamp Approved" },
        { status: "Phase_1", color:"deep-purple lighten-1",  title: "Material Logic" },
        { status: "FT_1", color:"deep-purple lighten-1",  title: "Filtering Test 1" },
        { status: "Phase_2", color:"deep-purple lighten-1",  title: "Material Technology" },
        { status: "FT_2", color:"deep-purple lighten-1",  title: "Filtering Test 2" },
        { status: "ApprovalBOD", color:"deep-purple lighten-1",  title: "Approval BOD - Filtering Test 2" },
        { status: "Extend", color:"deep-purple lighten-1",  title: "Extend Mini Project" },
        { status: "ApprovalBODExtend", color:"deep-purple lighten-1",  title: "Approval BOD - Extend" },
        { status: "Finished", color:"deep-purple lighten-1",  title: "Bootcamp has finished" },

    ];

    return new Promise((resolve) => {
        resolve(listDatail);
    })
}


const createBootcamp = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`bootcamp`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampHeader = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    // console.log("payload update Bootcamp : ", payload);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/header/${payload.id}`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampMappingStudent = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    // console.log("payload update Bootcamp : ", payload);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/student/${payload.id}`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampDateDetails = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    // console.log("payload id : ", payload.id);
    // console.log("payload : ", payload);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/datedetail/${payload.id}`, payload)
            .then(response => {
                // console.log('response updateBootcampDateDetails : ', response);
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampMappingStudentLaptop = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    // console.log("payload id : ", payload.id);
    // console.log("payload : ", payload);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/laptop/${payload.id}`, payload)
            .then(response => {
                // console.log('response updateBootcampDateDetails : ', response);
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateBootcampChangeStatus = async (payload) => {
    const api = await apiAdapter(SERVICE.API);
    // console.log("payload update Bootcamp : ", payload.id);
    return new Promise((resolve, reject) => {
        return api
            .put(`bootcamp/changestatus/${payload.id}`, payload)
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
export {
    getBootcampAll, getBootcampDetail
    , getDetailBootcampAssessmentByBootcampId
    , getDetailBootcampAssessmentByStudent
    , updateBootcampChangeStatus
    , getSourceDateDetails, getSourceStatusBootcamp
    , createBootcamp, updateBootcampHeader, updateBootcampDateDetails
    , updateBootcampMappingStudent, updateBootcampMappingStudentLaptop
};
