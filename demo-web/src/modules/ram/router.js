const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListRam = () => import("./views/List.vue");
const VueRamForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/ram",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "ram",
                meta: {
                    auth: false,
                    page_title: "Ram",
                },
                component: VueListRam,
            },
            {
                path: "",
                name: "create-ram",
                meta: {
                    auth: false,
                    page_title: "Register Ram",
                },
                component: VueRamForm
            },
            {
                path: ":id",
                name: "update-ram",
                meta: {
                    auth: false,
                    page_title: "Modify Ram",
                },
                component: VueRamForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
