const VueDefault = () => import("@/components/layouts/Default.vue");
const VueDashboard = () => import("./views/Dashboard.vue");
import { AUTH } from "@/constants/auth";


const moduleRoute = [
    {
        path: "/dashboard",
        component: VueDefault,
        meta: {
            auth: AUTH.AUTH
        },
        children: [
            {
                path: "",
                name: "dashboard",
                meta: {
                    auth: AUTH.AUTH,
                    page_title: "Dashboard",
                    breadcrumbs: [
                        {
                            html:"<i class='fa fa-home'></i> Beranda",
                            active: true
                        }
                    ]
                },
                component: VueDashboard
            },
        ]
    }
];

export default router => {
    router.addRoute(...moduleRoute);
};
