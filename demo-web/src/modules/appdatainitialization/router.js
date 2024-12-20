const VueAppInit = () => import("./views/AppInit.vue");

const moduleRoute = [
    {
        path: "/appdatainitialization",
        component: VueAppInit,
        meta: {
            auth: false,
            page_title: "Initial Data Module",
        }
    },
];

export default router => {
    router.addRoute(...moduleRoute);
};
