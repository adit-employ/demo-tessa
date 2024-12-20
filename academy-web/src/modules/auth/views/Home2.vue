<template>
    <div class="background">
        <div class="home-body">
            <img :src="require('@/assets/images/ETG.png')" class="home-logo">
            <h1 class="font-weight-bold">Xsis Academy</h1>
             <v-row>
                <v-col cols="4" sm="4">
                    <v-text-field class="pl-12"
                    label="Email"
                    placeholder="Email"
                    v-model="form.email"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-btn class="white--text btn-grad" rounded @click="openMasterPage">
                Sign In By Pass
                <v-icon>
                    mdi-chevron-double-right
                </v-icon>
            </v-btn>
            <v-btn class="white--text btn-grad" rounded @click="openSignTessa()">
                Sign In
                <v-icon>
                    mdi-chevron-double-right
                </v-icon>
            </v-btn>
            <vue-home-footer />
        </div>
    </div>
</template>

<script>
    // Components
    import VueHomeFooter from '@/components/layouts/HomeFooter.vue';

    //      //  academy - temporary, jangan lupa di hapus dan dipindahkan ke auth => Callback.vue & SilentRenew.vue
    import { GetUserRoleModuleByEmailBypass } from "@/services/app-users.js";
    import errorMessage from "@/utils/notify-error";

    export default {
        name: 'VueHome',
        components: {
            VueHomeFooter
        },
        data(){
            return {
                form: {
                    email : null,
                },
            }
        },
        mounted(){
            localStorage.removeItem("user");
        },
        methods:{
            openSignTessa() {
                this.$router.push({
                    name: 'signin'
                });
            },
            // bypass login
            openMasterPage() {
                // getUserRoleModuleByEmail('ade.yahdjan@xsis.co.id')
                // if(this.form.email == undefined) return errorMessage('email tidak terbaca');
                console.log(this.form.email);

                GetUserRoleModuleByEmailBypass(this.form.email)
                    .then(response => {
                        // console.log('Home => getUserRoleModuleByEmail => response : ', response);

                        response['modulsOrigin'] = response.moduls;
                        response.moduls = generateMenuData(response);

                        // console.log('Home => getUserRoleModuleByEmail => moduls : ', response.moduls);

                        console.log('Home => getUserRoleModuleByEmail => response : ', response);
                        localStorage.setItem("user", JSON.stringify(response));
                        console.log('Home => getUserRoleModuleByEmail => user : ', localStorage.getItem("user"));

                        this.$router.push({ name: 'dashboard' });

                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    });


            },
        }
    }

    //  academy - temporary, jangan lupa di hapus dan dipindahkan ke auth => Callback.vue & SilentRenew.vue
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