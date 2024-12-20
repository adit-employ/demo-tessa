import Vue from "vue";
import VueRouter from "vue-router";
// import mgr from '@/utils/user-manager'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
});
// const mgr = new Mgr();

router.beforeEach((to, from, next) => {
    // login check auth tessa using oidc
    // if (to.meta.auth){
    //     mgr.getUser().then(function(user) {
    //         console.log('user : ', user);
    //         if (user == null) next({ name: 'home' })
    //             else next();
    //     });
    // }
    // else if (to.path == "/") {
    //     mgr.getUser().then(function(user) {
    //         console.log('user : ', user);
    //         if (user == null) next({ name: 'home' })
    //             else next({ name: 'dashboard'});
    //     });
    // }
    // else {
    //     next();
    // }

    // bypass login
    next();

    //// console.log('to from next : ', to, from, next);
    //// console.log('to : ', to);
    //// console.log('from : ', from);
    //// console.log('next : ', next);



});

export default router;
