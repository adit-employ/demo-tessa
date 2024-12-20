const VueDefault = () => import("@/components/layouts/Default.vue");
const VueEmployeeProfile = () => import("./views/EmployeeProfile.vue");
const VueEmployeeProfileDetail = () => import("./views/EmployeeProfileDetail.vue");
const VueManagementKpiEmployeeForm = () => import("./views/ManagementKpiEmployeeForm.vue");


const moduleRoute = [
    {
        path: "/demo",
        component: VueDefault,
        meta: {
            auth: false
        },
        children: [
            {
                path: "employeeprofile",
                name: "employeeprofile",
                meta: {
                    auth: true,
                    page_title: "Demo",
                    breadcrumbs: [
                        {
                            html:"<i class='fa fa-home'></i> Beranda",
                            active: true
                        }
                    ]
                },
                component: VueEmployeeProfile
            },
            {
                path: "employeeprofiledetail",
                name: "employeeprofiledetail",
                meta: {
                    auth: false,
                    page_title: "Employee Profile Detail",
                },
                component: VueEmployeeProfileDetail
            },
            
            // route for module admin manage kpi assessment employee
            {
                path: "managementkpiassessment",
                name: "managementkpiassessment",
                meta: {
                    auth: false,
                    page_title: "Form Key Performance Indicator Employee",
                },
                component: VueManagementKpiEmployeeForm
            },
            
        ]
    }
];

export default router => {
    router.addRoute(...moduleRoute);
};
