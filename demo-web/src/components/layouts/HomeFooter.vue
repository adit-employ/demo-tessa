<template>
    <v-footer padless>
        <div class="home-footer">
                <v-col class="text-center">
                    <v-icon size="13">
                        mdi-copyright
                    </v-icon>
                    {{ new Date().getFullYear() }} - Xsis Academy v2.0.1<br/>
                </v-col>
            </div>
    </v-footer>
</template>

<script>
    export default {
        name: 'VueHomeFooter',
    }
</script>