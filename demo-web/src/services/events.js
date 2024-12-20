import { apiAdapter } from "@/plugins/axios.js";
import { SERVICE } from "@/constants/services";

const createEvent = async payload => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .post(`events`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};
const getEvents = async payload => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`events/list`, { params: payload })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const eventsByEmail = async payload => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`events/`, { params: payload })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const eventsDetail = async (event_id, calendar_id) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .get(`events/detail/${event_id}/${calendar_id}`)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const updateEvent = async payload => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .patch(`events/`, payload)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

const deleteEvent = async (calendar_id, event_id, payload) => {
    const api = await apiAdapter(SERVICE.API);
    return new Promise((resolve, reject) => {
        return api
            .delete(`events/${calendar_id}/${event_id}`, { params: payload })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error.response);
                new Error(error);
            });
    });
};

export { createEvent, eventsByEmail, eventsDetail, updateEvent, getEvents, deleteEvent };
