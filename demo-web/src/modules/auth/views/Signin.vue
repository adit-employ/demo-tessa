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
    import mgr from '@/utils/user-manager'

    export default {
        name: "VueSignin",
        components: {
            VueHomeFooter
        },
        async mounted() {
            await mgr.signinRedirect("yiuoug");
        }
    };
</script>
