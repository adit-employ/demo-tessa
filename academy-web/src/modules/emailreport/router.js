const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListEmailReport = () => import("./views/List.vue");
const VueEmailReportForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/emailreport",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "emailreport",
                meta: {
                    auth: false,
                    page_title: "Email Report",
                },
                component: VueListEmailReport,
            },
            {
                path: "",
                name: "create-emailreport",
                meta: {
                    auth: false,
                    page_title: "Register Email Report",
                },
                component: VueEmailReportForm
            },
            {
                path: ":id",
                name: "update-emailreport",
                meta: {
                    auth: false,
                    page_title: "Modify Email Report",
                },
                component: VueEmailReportForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
