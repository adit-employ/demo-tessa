const VueDefault = () => import("@/components/layouts/Default.vue");
const VueListMaster = () => import("./views/List.vue");

const moduleRoute = [
    {
        path: "/master",
        component: VueDefault,
        meta: {
            auth: true
        },
        children: [
            {
                path: "",
                name: "master",
                meta: {
                    auth: true,
                    page_title: "Master",
                    breadcrumbs: [
                        {
                            html:"<i class='fa fa-home'></i> Beranda",
                            active: true
                        }
                    ]
                },
                component: VueListMaster
            },
        ]
    }
];

export default router => {
    router.addRoute(...moduleRoute);
};
