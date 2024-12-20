const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListTechnology = () => import("./views/List.vue");
const VueTechnologyForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/technology",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "technology",
                meta: {
                    auth: false,
                    page_title: "Technology",
                },
                component: VueListTechnology,
            },
            {
                path: "",
                name: "create-technology",
                meta: {
                    auth: false,
                    page_title: "Register Technology",
                },
                component: VueTechnologyForm
            },
            {
                path: ":id",
                name: "update-technology",
                meta: {
                    auth: false,
                    page_title: "Modify Technology",
                },
                component: VueTechnologyForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
