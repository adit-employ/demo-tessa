const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListAssessmentClassroom = () => import("./views/List.vue");
const VueAssessmentClassroomForm = () => import("./views/Form.vue");

const moduleRoute = [
    {
        path: "/assessmentclassroom",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "assessmentclassroom",
                meta: {
                    auth: false,
                    page_title: "Assessment Classroom",
                },
                component: VueListAssessmentClassroom,
            },
            {
                path: "",
                name: "create-assessmentclassroom",
                meta: {
                    auth: false,
                    page_title: "Register Assessment Classroom",
                },
                component: VueAssessmentClassroomForm
            },
            {
                path: ":id",
                name: "update-assessmentclassroom",
                meta: {
                    auth: false,
                    page_title: "Modify Assessment Classroom",
                },
                component: VueAssessmentClassroomForm
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
