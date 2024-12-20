const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListUniversity = () => import("./views/List.vue");
const VueUniversityForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/university",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "university",
                meta: {
                    auth: false,
                    page_title: "University",
                },
                component: VueListUniversity,
            },
            {
                path: "",
                name: "create-university",
                meta: {
                    auth: false,
                    page_title: "Register University",
                },
                component: VueUniversityForm
            },
            {
                path: ":id",
                name: "update-university",
                meta: {
                    auth: false,
                    page_title: "Modify University",
                },
                component: VueUniversityForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
