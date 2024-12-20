const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListBootcampAssessmentTrainer = () => import("./views/List.vue");
const VueBootcampAssessmentTrainerForm = () => import("./views/Detail.vue");
const VueBootcampFormLogic = () => import("./views/FormLogic.vue");
const VueBootcampFormTechnology = () => import("./views/FormTechnology.vue");

const moduleRoute = [
    {
        path: "/bootcampassessmenttrainer",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "bootcampassessmenttrainer",
                meta: {
                    auth: false,
                    page_title: "Bootcamp Assessment Trainer",
                },
                component: VueListBootcampAssessmentTrainer,
            },
            {
                path: ":id",
                name: "detail-bootcampassessmenttrainer",
                meta: {
                    auth: false,
                    page_title: "Detail Assessments Trainer",
                },
                component: VueBootcampAssessmentTrainerForm
            },
            {
                path: "logic/:id/:studentid",
                name: "form-logic-assessment",
                meta: {
                    auth: false,
                    page_title: "Form Assessment Logic",
                },
                component: VueBootcampFormLogic
            },
            {
                path: "technology/:id/:studentid",
                name: "form-technology-assessment",
                meta: {
                    auth: false,
                    page_title: "Form Assessment Technology",
                },
                component: VueBootcampFormTechnology
            },
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
