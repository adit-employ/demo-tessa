<template>
    <div class="redirect">
        <div class="home-body">
            <img :src="require('@/assets/images/404.png')" class="home-logo">
            <h1 class="font-weight-bold pb-3">Page Not Found</h1>
            <h3 class="font-weight-light">Sorry, we couldn't find the page you were looking for.</h3>
            <h3 class="font-weight-light pb-6">We suggest that you return to main sections.</h3>
            <v-btn rounded @click="$router.go(-1)">
                <v-icon>
                    mdi-chevron-left
                </v-icon>
                Back To Previous Page
            </v-btn>
            <vue-home-footer />
        </div>
    </div>
</template>

<script>
    // Components
    import VueHomeFooter from '@/components/layouts/HomeFooter.vue';
    
    export default {
        name: "VueNotFound",
        components: {
            VueHomeFooter
        },
        // data() {
        //     return {
        //         prev_route: null
        //     }
        // },
        // beforeRouteEnter(to, from, next) {
        //     next(vm => {
        //         vm.prev_route = from
        //     })
        // }
    };
</script>
