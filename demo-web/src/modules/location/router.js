const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListLocation = () => import("./views/List.vue");
const VueLocationForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/location",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "location",
                meta: {
                    auth: false,
                    page_title: "Location",
                },
                component: VueListLocation,
            },
            {
                path: "",
                name: "create-location",
                meta: {
                    auth: false,
                    page_title: "Register Location",
                },
                component: VueLocationForm
            },
            {
                path: ":id",
                name: "update-location",
                meta: {
                    auth: false,
                    page_title: "Modify Location",
                },
                component: VueLocationForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
