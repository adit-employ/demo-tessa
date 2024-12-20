const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListUser = () => import("./views/List.vue");
const VueUserForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/users",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "users",
                meta: {
                    auth: false,
                    page_title: "Users",
                },
                component: VueListUser,
            },
            {
                path: "",
                name: "create-user",
                meta: {
                    auth: false,
                    page_title: "Register User",
                },
                component: VueUserForm
            },
            {
                path: ":id",
                name: "update-user",
                meta: {
                    auth: false,
                    page_title: "Modify User",
                },
                component: VueUserForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
