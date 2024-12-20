const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListEmailBAST = () => import("./views/List.vue");
const VueEmailBASTForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/emailbast",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "emailbast",
                meta: {
                    auth: false,
                    page_title: "Email BAST",
                },
                component: VueListEmailBAST,
            },
            {
                path: "",
                name: "create-emailbast",
                meta: {
                    auth: false,
                    page_title: "Register Email BAST",
                },
                component: VueEmailBASTForm
            },
            {
                path: ":id",
                name: "update-emailbast",
                meta: {
                    auth: false,
                    page_title: "Modify Email BAST",
                },
                component: VueEmailBASTForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
