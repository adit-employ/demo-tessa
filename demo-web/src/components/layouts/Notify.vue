<template>
    <div>
        <v-snackbar v-for="(notify, index) in notifies"
                    :key="`notify-${index}`"
                    v-model="notify.show"
                    :color="notify.color"
                    :timeout="5000"
                    elevation="1"
                    right
                    top
                    style="z-index: 10000000;"
                    @input="snackbarClose">
            <p style="font-size:125%;margin-bottom:0">{{notify.title }}</p>
            {{ notify.content }}
            <template v-slot:action="{ attrs }">
                <v-btn color="white"
                       text
                       v-bind="attrs"
                       @click="snackbarClose()">
                        <v-icon>
                            mdi-close
                        </v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    // Types
    import { TYPES } from "@/stores/modules/notify/mutation-type";

    // Packages
    import { mapState } from "vuex";

    export default {
        name: "VueNotify",
        methods: {
            snackbarClose() {
                this.$store.commit(`notify/${TYPES.REMOVE_NOTIFY}`);
            },
        },
        computed: {
            ...mapState("notify", {
                notifies: (state) => state.notifies,
            }),
        },
    };
</script>

