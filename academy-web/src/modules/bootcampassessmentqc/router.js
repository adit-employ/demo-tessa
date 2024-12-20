const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListBootcampAssessmentQC = () => import("./views/List.vue");
const VueBootcampAssessmentQCDetail = () => import("./views/Detail.vue");
const VueBootcampFormFT1 = () => import("./views/FormFT1.vue");
const VueBootcampFormFT2 = () => import("./views/FormFT2.vue");
const VueBootcampFormExtend = () => import("./views/FormExtend.vue");

const moduleRoute = [
    {
        path: "/bootcampassessmentqc",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "",
                name: "bootcampassessmentqc",
                meta: {
                    auth: false,
                    page_title: "Assessments QC",
                },
                component: VueListBootcampAssessmentQC,
            },
            {
                path: ":id",
                name: "detail-bootcampassessmentqc",
                meta: {
                    auth: false,
                    page_title: "Detail Assessments QC",
                },
                component: VueBootcampAssessmentQCDetail
            },
            {
                path: "ft1/:id/:studentid",
                name: "form-ft1-assessment",
                meta: {
                    auth: false,
                    page_title: "Form Assessment Filtering Test 1",
                },
                component: VueBootcampFormFT1
            },
            {
                path: "ft2/:id/:studentid",
                name: "form-ft2-assessment",
                meta: {
                    auth: false,
                    page_title: "Form Assessment Filtering Test 2",
                },
                component: VueBootcampFormFT2
            },
            {
                path: "extend/:id/:studentid",
                name: "form-extend-assessment",
                meta: {
                    auth: false,
                    page_title: "Form Assessment Extend",
                },
                component: VueBootcampFormExtend
            },

        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
