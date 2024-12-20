const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListBootcamp = () => import("./views/List.vue");
const VueBootcampDetail = () => import("./views/Detail.vue");
const VueBootcampFormInformation = () => import("./views/FormInformation.vue");
const VueBootcampFormPhaseDate = () => import("./views/FormPhaseDate.vue");
const VueBootcampFormStudent = () => import("./views/FormStudent.vue");
const VueBootcampDetailLaptop = () => import("./views/DetailLaptop.vue");
const VueBootcampFormLaptop = () => import("./views/FormLaptop.vue");

const moduleRoute = [
    {
        path: "/bootcamp",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "bootcamp",
                meta: {
                    auth: false,
                    page_title: "Bootcamps",
                },
                component: VueListBootcamp,
            },
            {
                path: "",
                name: "create-bootcamp",
                meta: {
                    auth: false,
                    page_title: "Register Bootcamp",
                },
                component: VueBootcampFormInformation
            },
            {
                path: ":id",
                name: "update-bootcamp",
                meta: {
                    auth: false,
                    page_title: "Modify Bootcamp",
                },
                component: VueBootcampFormInformation
            },
            {
                path: "detail/:id",
                name: "detail-bootcamp",
                meta: {
                    auth: false,
                    page_title: "Detail Bootcamp",
                },
                component: VueBootcampDetail
            },
            {
                path: "phasedate/:id",
                name: "form-phase-date-bootcamp",
                meta: {
                    auth: false,
                    page_title: "Modify Phase Date Detail Bootcamp",
                },
                component: VueBootcampFormPhaseDate
            },
            {
                path: "student/:id",
                name: "form-student-bootcamp",
                meta: {
                    auth: false,
                    page_title: "Mapping Student Bootcamp",
                },
                component: VueBootcampFormStudent
            },
            {
                path: "detaillaptop/:id",
                name: "detail-laptop-bootcamp",
                meta: {
                    auth: false,
                    page_title: "Detail Mapping Laptop Bootcamp",
                },
                component: VueBootcampDetailLaptop
            },
            {
                path: "laptop/:id/:studentid",
                name: "form-laptop-bootcamp",
                meta: {
                    auth: false,
                    page_title: "Form Mapping Laptop Bootcamp",
                },
                component: VueBootcampFormLaptop
            },
            {
                path: "detail/:id/:sendnotif",
                name: "detail-bootcamp-send-notif",
                meta: {
                    auth: false,
                    page_title: "Detail Bootcamp",
                },
                component: VueBootcampDetail
            },
            
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
