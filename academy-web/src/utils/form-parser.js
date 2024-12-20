import moment from "moment";

const toFormSubmit = (payload) => {
    payload.start_date = moment.isMoment(payload.start_date) ? payload.start_date : moment(payload.start_date);
    payload.end_of_repetition = moment.isMoment(payload.end_of_repetition) ? payload.end_of_repetition : moment(payload.end_of_repetition);
    return {
        start: moment(payload.start_date.format('YYYY-MM-DD') + ' ' + payload.start_time, 'YYYY-MM-DD HH:mm').utc().toDate(),
        end: moment(payload.start_date.format('YYYY-MM-DD') + ' ' + payload.end_time, 'YYYY-MM-DD HH:mm').utc().toDate(),
        is_repetition: payload.is_repetition,
        type_repetition: parseInt(payload.type_repetition),
        end_of_repetition: payload.is_repetition ? moment(payload.end_of_repetition.format('YYYY-MM-DD') + ' ' + payload.end_time, 'YYYY-MM-DD HH:mm').utc().toDate() : null,
        repetition_day: payload.repetition_day,
        interval: payload.interval,
    };
}
const toFormValue = (payload) => {
    return {
        start_date: moment(payload.start_date),
        start_time: null,
        end_time: null,
        full_day: false
    };
}

const dateAndTimeToMoment = (date, time) => {
    date = moment.isMoment(date) ? date : moment(date);
    return moment(date.format('YYYY-MM-DD') + ' ' + time, 'YYYY-MM-DD HH:mm').utc();
}

const dateToMoment = (date) => {
    date = moment.isMoment(date) ? date : moment(date);
    return moment(date.format('YYYY-MM-DD'), 'YYYY-MM-DD');
}

export { toFormSubmit, toFormValue, dateAndTimeToMoment, dateToMoment };
