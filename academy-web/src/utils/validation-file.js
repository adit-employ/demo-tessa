import notify from "plugins/notify";

const ALLOWED = /(\.doc|\.docx|\.pdf|\.jpeg|\.jpg|\.xls|\.xlsx|\.png)$/i;

const validationFile = (path, allowed = null) => {
    if (!allowed) allowed = ALLOWED;

    if (!allowed.exec(path)) {
        notify({
            title: "Gagal",
            content: "Ekstensi file yang dipilih tidak didukung",
            color: "rgb(255, 0, 0)",
        });
        return false;
    }
    return true;
}

export default validationFile;
