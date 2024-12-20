const VueDefault = () => import("@/components/layouts/Default.vue");
const VueUsersList = () => import("./views/List.vue");
const VueUsersForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/users",
        component: VueDefault,
        meta: {
            auth: true
        },
        children: [
            {
                path: "",
                name: "users",
                meta: {
                    auth: true,
                    page_title: "Users",
                },
                component: VueUsersList
            },
            {
                path: "create",
                name: "create-users",
                meta: {
                    auth: true,
                    page_title: "Create Users",
                },
                component: VueUsersForm
            },
            {
                path: "update/:id",
                name: "update-users",
                meta: {
                    auth: true,
                    page_title: "Update Users"
                },
                component: VueUsersForm
            },
        ]
    }
];

export default router => {
    router.addRoute(...moduleRoute);
};
