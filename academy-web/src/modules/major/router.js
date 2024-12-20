const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListMajor = () => import("./views/List.vue");
const VueMajorForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/major",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "major",
                meta: {
                    auth: false,
                    page_title: "Major",
                },
                component: VueListMajor,
            },
            {
                path: "",
                name: "create-major",
                meta: {
                    auth: false,
                    page_title: "Register Major",
                },
                component: VueMajorForm
            },
            {
                path: ":id",
                name: "update-major",
                meta: {
                    auth: false,
                    page_title: "Modify Major",
                },
                component: VueMajorForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
