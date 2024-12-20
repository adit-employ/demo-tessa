const VueSignin = () => import("./views/Signin.vue");
const VueSignout = () => import("./views/Signout.vue");
const VueCallback = () => import("./views/Callback.vue");
const VueHome = () => import("./views/Home.vue");
const VueHome2 = () => import("./views/Home2.vue");

const moduleRouteHome = [
    {
        path: "/home",
        name: "home",
        component: VueHome
    }
];
const moduleRouteSignin = [
    {
        path: "/signin",
        name: "signin",
        component: VueSignin
    }
];
const moduleRouteCallBack = [
    {
        path: "/callback",
        name: "callback",
        component: VueCallback
    }
];
const moduleRouteSignout = [
    {
        path: "/signout",
        name: "signout",
        component: VueSignout
    }
];

// bypass
const moduleRouteHome2 = [
    {
        path: "/home2",
        name: "home2",
        component: VueHome2
    }
];


export default router => {
    router.addRoute(...moduleRouteHome);
    router.addRoute(...moduleRouteSignin);
    router.addRoute(...moduleRouteCallBack);
    router.addRoute(...moduleRouteSignout);
    router.addRoute(...moduleRouteHome2);
};
