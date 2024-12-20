const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListStorage = () => import("./views/List.vue");
const VueStorageForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/storage",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "storage",
                meta: {
                    auth: false,
                    page_title: "Storage",
                },
                component: VueListStorage,
            },
            {
                path: "",
                name: "create-storage",
                meta: {
                    auth: false,
                    page_title: "Register Storage",
                },
                component: VueStorageForm
            },
            {
                path: ":id",
                name: "update-storage",
                meta: {
                    auth: false,
                    page_title: "Modify Storage",
                },
                component: VueStorageForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
