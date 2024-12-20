import notify from "plugins/notify";

const errorMessage = (error) => {
    if (error == null || typeof (error) == 'undefined') {
        notify({
            title: "Oops! Something Went Wrong.",
            // title: "Terjadi Kesalahan",
            content: "Sorry an unexpected system error occurred, please try again later or contact the administrator.",
            // content: "Maaf sistem terjadi sedikit kesalahan, silahkan coba lagi nanti atau hubungi administrator",
            color: "rgb(255, 0, 0)",
        });
    }
    else if (error.status == 415) {
        notify({
            title: error.status,
            content: error.statusText,
            color: "rgb(255, 0, 0)",
        });
    }
    else if (error.status == 500) {
        notify({
            title: error.status,
            content: error.data.message,
            color: "rgb(255, 0, 0)",
        });
    }
    else if (error.status == 403) {
        notify({
            title: error.status,
            content: "You cannot perform this request, please try again later or contact the administrator.",
            // content: "Anda tidak dapat melakukan permintaan ini, silahkan coba lagi nanti atau hubungi adminsitrator",
            color: "rgb(255, 0, 0)",
        });
    }
    else if (error.status == 401) {
        notify({
            title: error.status,
            content: "Your session has ended, please login again.",
            // content: "Sesi anda berakhir silahkan melakukan login kembali",
            color: "rgb(255, 0, 0)",
        });
    }
    else if (error.status == 400) {
        let message = "";
        if (typeof (error.data.data) != 'undefined') {
            notify({
                title: error.data.message,
                content: error.data.message,
                color: "rgb(255, 0, 0)",
            });
        }
        else {
            let keys = Object.keys(error.data.errors);
            keys.forEach(function (i) {
                error.data.errors[i].forEach(function (j) {
                    message = j;
                })
            });
            notify({
                title: error.data.title,
                content: message,
                color: "rgb(255, 0, 0)",
            });
        }
        
    }
    else if (error.status == 404) {
        notify({
            title: error.status,
            content: "Your request could not be found, please try again later or contact the administrator.",
            // content: "Permintaan anda tidak dapat ditemukan, silahkan coba lagi nanti atau hubungi adminsitrator",
            color: "rgb(255, 0, 0)",
        });
    }
    else {
        notify({
            title: error.status,
            content: error.statusText,
            color: "rgb(255, 0, 0)",
        });
    }
}

export default errorMessage;
