const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListBootcampGraduateApproval = () => import("./views/List.vue");
const VueBootcampGraduateApprovalDetail = () => import("./views/Detail.vue");

const moduleRoute = [
    {
        path: "/bootcampgraduateapproval",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "bootcampgraduateapproval",
                meta: {
                    auth: false,
                    page_title: "Graduate Approval",
                },
                component: VueListBootcampGraduateApproval,
            },
            {
                path: ":id",
                name: "detail-bootcampgraduateapproval",
                meta: {
                    auth: false,
                    page_title: "Detail Graduate Approval",
                },
                component: VueBootcampGraduateApprovalDetail
            },
            {
                path: ":id/:sendnotif",
                name: "bootcampgraduateapproval-send-notif",
                meta: {
                    auth: false,
                    page_title: "Graduate Approval",
                },
                component: VueListBootcampGraduateApproval
            },

        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
