<template>
    <div>
        Silent Renew Process...
    </div>
</template>

<script>
    import Oidc from 'oidc-client';

    export default {
        name: "VueSilentRenew",
        mounted() {
            new Oidc.UserManager({ userStore: new Oidc.WebStorageStateStore({ store: window.localStorage }) })
                .signinSilentCallback();
        }
    };
</script>
