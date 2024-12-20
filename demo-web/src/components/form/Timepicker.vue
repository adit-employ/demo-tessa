<template>
    <v-dialog ref="dialog"
              v-model="modal"
              :return-value.sync="time_value"
              :disabled="disabled"
              width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field v-model="time_value"
                          :label="placeholder"
                          prepend-icon="mdi-clock-time-four-outline"
                          readonly
                          class="error-disabled"
                          :rules="rules"
                          v-bind="{...$props}"
                          v-on="on"></v-text-field>
        </template>
        <v-time-picker v-if="modal"
                       v-model="time_value"
                       format="24hr"
                       full-width
                       :min="min"
                       scrollable
                       @click:minute="$refs.dialog.save(time_value);onInput()">
            <v-spacer></v-spacer>
            <v-btn text
                   color="primary"
                   @click="modal = false">
                Cancel
            </v-btn>
            <v-btn text
                   color="primary"
                   @click="$refs.dialog.save(time_value);onInput()">
                OK
            </v-btn>
        </v-time-picker>
    </v-dialog>
</template>

<script>
    export default {
        name: "VueTimePicker",
        data: () => ({
            modal: false,
            time_value: null,
        }),
        props: {
            value: {
                type: [String, Number, Array, Date],
                default: null,
            },
            placeholder: {
                type: String,
                default: "",
            },
            rules: {
                type: Array,
                default: () => [],
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            min: {
                type: String,
                default: "",
            },
        },
        watch: {
            time_value(value) {
                this.$emit("input", value);
                this.$emit("change", value);
            },
            value(value) {
                this.time_value = value;
            }
        },
        mounted() {
            this.time_value = this.value;
        },
        methods: {
            onInput() {
                this.$emit("input", this.time_value);
                this.$emit("change", this.time_value);
            }
        },
    };
</script>
