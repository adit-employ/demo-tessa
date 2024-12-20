import moment from "moment";

const formatDate = (value, format) => {
    if (value == null || typeof (value) == 'undefined') return '-';
    if (format == 'fromnow')
        if (moment.utc().isSameOrAfter(moment.utc(value).add(3, 'days'))) return moment.utc(value).local().format('DD MMMM YYYY HH:mm:ss');
        else return moment.utc(value).fromNow();
    else if (format == 'fromnow2')
        if (moment.utc().isSameOrAfter(moment.utc(value).add(1, 'days'))) return moment.utc(value).local().format('DD MMMM YYYY HH:mm:ss');
        else return moment.utc(value).fromNow();
    else if (format == 'datetime') return moment.utc(value).local().format('DD MMMM YYYY HH:mm:ss');
    else if (format == 'date') return moment.utc(value).local().format('DD MMM YYYY');
    else return moment.utc(value).local().format('DD-MM-YYYY');
}

export default formatDate;
