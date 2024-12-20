const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListBootcampApproval = () => import("./views/List.vue");
const VueBootcampApprovalForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/bootcampapproval",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "bootcampapproval",
                meta: {
                    auth: false,
                    page_title: "Bootcamp Approvals",
                },
                component: VueListBootcampApproval,
            },
            {
                path: ":id",
                name: "update-bootcampapproval",
                meta: {
                    auth: false,
                    page_title: "Detail Bootcamp Approval",
                },
                component: VueBootcampApprovalForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
