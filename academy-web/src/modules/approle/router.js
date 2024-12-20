const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListRole = () => import("./views/List.vue");
const VueRoleForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/roles",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "roles",
                meta: {
                    auth: false,
                    page_title: "Roles",
                },
                component: VueListRole,
            },
            {
                path: "",
                name: "create-role",
                meta: {
                    auth: false,
                    page_title: "Register Role",
                },
                component: VueRoleForm
            },
            {
                path: ":id",
                name: "update-role",
                meta: {
                    auth: false,
                    page_title: "Modify Role",
                },
                component: VueRoleForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
