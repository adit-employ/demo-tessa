<template>
    <div>
        <router-view />
        <vue-Notify />
    </div>
</template>

<script>
    // Components
    import VueNotify from '@/components/layouts/Notify.vue';

    export default {
        name: "VueBlank",
        components: {
            VueNotify,
        }
    };
</script>
