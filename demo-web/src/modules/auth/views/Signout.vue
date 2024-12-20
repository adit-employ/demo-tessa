<template>
    <div class="redirect">
        <div class="home-body">
            <v-icon class="mdi-spin mdi-48px">
                mdi-loading
            </v-icon>
            <h2>
                Please wait
            </h2>
            <vue-home-footer />
        </div>
    </div>
</template>

<script>
    // Components
    import VueHomeFooter from '@/components/layouts/HomeFooter.vue';
    // Utils
    import mgr from '@/utils/user-manager';

    export default {
        name: "VueSignout",
        components: {
            VueHomeFooter
        },
        // data() {
        //    return {
        //        mgr: new Mgr()
        //    };
        // },
        async mounted() {
            // sementara start
            console.log("signout");
            // this.$router.push({ name: `home` });
            localStorage.removeItem("user");
            // sementara end


            // jangan lupa dibuka lagi
            await mgr.signoutRedirect();
        }

    };
</script>
