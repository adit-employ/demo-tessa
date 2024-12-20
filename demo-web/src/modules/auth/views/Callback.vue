<template>
    <div class="redirect">
        <div class="home-body">
            <v-icon class="mdi-spin mdi-48px">
                mdi-loading
            </v-icon>
            <h2>Hold On!</h2>
            <h3 class="font-weight-light">You're being redirected to another page.</h3>
            <vue-home-footer />
        </div>
    </div>
</template>

<script>
    // Components
    import VueHomeFooter from '@/components/layouts/HomeFooter.vue';
    // Utils
    import mgr from '@/utils/user-manager';
    import errorMessage from "@/utils/notify-error";
    // Services
    // import { getMe } from "@/services/profile";
    import { getUserRoleModuleByEmail } from "@/services/app-users.js";

    export default {
        name: "VueCallback",
        components: {
            VueHomeFooter
        },
        data() {
            return {
                signedIn: false
            };
        },
        async mounted() {
            await mgr.signinRedirectCallback();
            await this.doGetMyIdentity();
            // this.$router.push({ name: 'dashboard' });
        },
        methods: {
            async doGetMyIdentity() {
                this.loading = true;
                

                await getUserRoleModuleByEmail()
                .then(response => {
                    console.log('==> response module by email : ', response);

                    console.log('==> check user', response.id == "00000000-0000-0000-0000-000000000000");
                    // this.$router.push({ name: 'user-not-found' });

                    // user belum terdaftar
                    if(response.id == "00000000-0000-0000-0000-000000000000"){ 
                        localStorage.setItem("user", JSON.stringify(response));
                        // console.log('==> local storage user not found : ', localStorage.getItem("user"));

                        setTimeout(() => {
                            this.$router.push({ name: 'dashboard' });
                        }, 1000);
                    }
                    else{
                        response['modulsOrigin'] = response.moduls;
                        response.moduls = generateMenuData(response);

                        // console.log('Home => getUserRoleModuleByEmail => moduls : ', response.moduls);

                        console.log('Home => getUserRoleModuleByEmail => response : ', response);
                        localStorage.setItem("user", JSON.stringify(response));
                        console.log('==> local storage user : ', localStorage.getItem("user"));

                        setTimeout(() => {
                            this.$router.push({ name: 'dashboard' });
                        }, 1000);
                    }

                    

                })
                .catch(error => {
                    console.log();
                    this.loading = false
                    errorMessage(error);
                });


                // await getMe()
                //     .then(response => {
                //         this.loading = false;
                //         this.my_identity = response.data;
                //     })
                //     .catch(error => {
                //         this.loading = false
                //         errorMessage(error);
                //     })
            },
        }
    };

    function generateMenuData(my_identity){
        let dParent = my_identity.moduls.filter(x => x.isParent == true);
        let dChild = my_identity.moduls.filter(x => (!x.isParent == true));

        let menu = [];
        for (let i = 0; i < dParent.length; i++) {

            // debugger;
            let menuChild = [];
            for (let j = 0; j < dChild.length; j++) {
                let mParent = dParent[i];
                let mChild = dChild[j];
                if(mChild.parentId == mParent.moduleId){
                    menuChild.push({
                        action: mChild.icon,
                        title: mChild.title,
                        to: mChild.action
                    });
                }
            }
            
            if(menuChild.length > 0){
                menu.push({
                    action: dParent[i].icon,
                    title: dParent[i].title,
                    to: dParent[i].action,
                    items: menuChild
                })
            }else {
                menu.push({
                    action: dParent[i].icon,
                    title: dParent[i].title,
                    to: dParent[i].action
                })
            }
            
        }
        return menu;
    }

</script>
