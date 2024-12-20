<template>
    <v-footer padless>
        <v-col class="text-center"
               cols="12">
            <v-icon size="9">
                mdi-copyright
            </v-icon>
            {{ new Date().getFullYear() }} - Xsis Academy v2.0.1
            <br/>Equine Technologies Group
        </v-col>
    </v-footer>
</template>

<script>
    export default {
        name: 'VueFooter',
    }</script>