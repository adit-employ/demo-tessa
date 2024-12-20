const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListGrade = () => import("./views/List.vue");
const VueGradeForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/grade",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "grade",
                meta: {
                    auth: false,
                    page_title: "Grade",
                },
                component: VueListGrade,
            },
            {
                path: "",
                name: "create-grade",
                meta: {
                    auth: false,
                    page_title: "Register Grade",
                },
                component: VueGradeForm
            },
            {
                path: ":id",
                name: "update-grade",
                meta: {
                    auth: false,
                    page_title: "Modify Grade",
                },
                component: VueGradeForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
