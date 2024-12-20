const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListAssessmentFilteringTest = () => import("./views/List.vue");
const VueAssessmentFilteringTestForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/assessmentfilteringtest",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "assessmentfilteringtest",
                meta: {
                    auth: false,
                    page_title: "Assessment Filtering Test",
                },
                component: VueListAssessmentFilteringTest,
            },
            {
                path: "",
                name: "create-assessmentfilteringtest",
                meta: {
                    auth: false,
                    page_title: "Register Assessment Filtering Test",
                },
                component: VueAssessmentFilteringTestForm
            },
            {
                path: ":id",
                name: "update-assessmentfilteringtest",
                meta: {
                    auth: false,
                    page_title: "Modify Assessment Filtering Test",
                },
                component: VueAssessmentFilteringTestForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
