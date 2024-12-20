const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListStudents = () => import("./views/List.vue");
const VueStudentsDetail = () => import("./views/Detail.vue");

const moduleRoute = [
    {
        path: "/students",
        component: VueDefault,
        meta: {
            auth: true
        },
        children: [
            {
                path: "",
                name: "students",
                meta: {
                    auth: true,
                    page_title: "Student",
                },
                component: VueListStudents,
            },
            {
                path: ":id",
                name: "detail-students",
                meta: {
                    auth: true,
                    page_title: "Detail Student",
                },
                component: VueStudentsDetail
            }
        ]
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
