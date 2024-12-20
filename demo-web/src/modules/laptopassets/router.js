const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListLaptopAssets = () => import("./views/List.vue");
const VueLaptopAssetsForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/laptopassets",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "laptopassets",
                meta: {
                    auth: false,
                    page_title: "Laptop Assets",
                },
                component: VueListLaptopAssets,
            },
            {
                path: "",
                name: "create-laptopassets",
                meta: {
                    auth: false,
                    page_title: "Register Laptop Assets",
                },
                component: VueLaptopAssetsForm
            },
            {
                path: ":id",
                name: "update-laptopassets",
                meta: {
                    auth: false,
                    page_title: "Modify Laptop Assets",
                },
                component: VueLaptopAssetsForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
