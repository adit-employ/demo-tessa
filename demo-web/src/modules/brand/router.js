const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListBrand = () => import("./views/List.vue");
const VueBrandForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/brand",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "brand",
                meta: {
                    auth: false,
                    page_title: "Brand",
                },
                component: VueListBrand,
            },
            {
                path: "",
                name: "create-brand",
                meta: {
                    auth: false,
                    page_title: "Register Brand",
                },
                component: VueBrandForm
            },
            {
                path: ":id",
                name: "update-brand",
                meta: {
                    auth: false,
                    page_title: "Modify Brand",
                },
                component: VueBrandForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
