const VueBlank = () => import("@/components/layouts/Blank.vue");
const VueNotFound = () => import("./views/Pages.vue");

const moduleRoute = [
    {
        path: "*",
        component: VueBlank,
        children: [
            {
                path: "*",
                name: "not-found",
                component: VueNotFound
            },
        ]
    }
];

export default router => {
    router.addRoute(...moduleRoute);
};
