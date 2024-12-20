<template>
    <div class="background">
        <div class="home-body">
            <img :src="require('@/assets/images/ETG.png')" class="home-logo">
            <h1 class="font-weight-bold">Xsis Academy</h1>
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
        },
        methods:{
            openSignTessa() {
                localStorage.removeItem("user");

                this.$router.push({
                    name: 'signin'
                });
            },
        }
    }

</script>