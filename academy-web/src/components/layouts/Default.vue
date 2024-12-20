<template>
    <div>
        <vue-sidebar/>
        <!-- Sizes your content based upon application components -->
        <v-main>
            <!-- Provides the application the proper gutter -->
            <v-container fluid>
                <!-- If using vue-router -->
                <router-view></router-view>
            </v-container>
            <vue-footer />
        </v-main>
        <vue-Notify />
    </div>
</template>

<script>
    // Components
    import VueNotify from '@/components/layouts/Notify.vue';
    import VueSidebar from '@/components/layouts/Sidebar.vue';
    import VueFooter from '@/components/layouts/Footer.vue';

    export default {
        name: 'VueDefault',
        components: {
            VueNotify,
            VueSidebar,
            VueFooter
        },
    }
</script>