const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListServiceAccount = () => import("./views/List.vue");
const VueServiceAccountForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/service-account",
        component: VueDefault,
        meta: {
            auth: true
        },
        children: [
            {
                path: "",
                name: "service-account",
                meta: {
                    auth: true,
                    page_title: "Service Account",
                },
                component: VueListServiceAccount
            },
            {
                path: "create",
                name: "create-service-account",
                meta: {
                    auth: true,
                    page_title: "Create Service Account",
                    page_subtitle: "Google Service Account",
                },
                component: VueServiceAccountForm
            },
            {
                path: "update/:id",
                name: "update-service-account",
                meta: {
                    auth: true,
                    page_title: "Update Service Account",
                    page_subtitle: "Google Service Account",
                },
                component: VueServiceAccountForm
            }
        ]
    }
];

export default router => {
    router.addRoute(...moduleRoute);
};
