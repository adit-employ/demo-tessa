<template>
    <v-dialog ref="dialog"
              v-model="modal"
              :return-value.sync="value_date"
              :disabled="disabled"
              width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field v-model="label_date"
                          :label="placeholder"
                          prepend-icon="mdi-calendar"
                          :rules="rules"
                          :value="value"
                          :placeholder="placeholder"
                          :disabled="disabled"
                          readonly
                          v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="date_value"
                       scrollable
                       :min="min"
                       @input="modal = false; onInput()">
            <v-spacer></v-spacer>
            <v-btn text
                   color="primary"
                   @click="modal = false">
                Cancel
            </v-btn>
            <v-btn text
                   color="primary"
                   @click="$refs.dialog.save(value_date);onInput()">
                OK
            </v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
    import moment from 'moment';
    export default {
        name: "VueDatePicker",
        data: () => ({
            modal: false,
            date_value: null,
            value_date: null
        }),
        props: {
            value: {
                type: [String, Object],
                default: null,
            },
            placeholder: {
                type: String,
                default: "",
            },
            min: {
                type: String,
                default: "",
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            rules: {
                type: Array,
                default: () => [],
            },
        },
        computed: {
            label_date() {
                return this.date_value ? moment(this.date_value).format('DD MMMM YYYY') : ''
            },
        },
        watch: {
            date_value(value) {
                this.value_date = this.date_value ? moment(value) : null
            },
            value(value) {
                this.date_value = moment.isMoment(value) ? value.format('YYYY-MM-DD') : null;
            }
        },
        mounted() {
            this.date_value = moment.isMoment(this.value) ? (this.value.isValid() ? this.value.format('YYYY-MM-DD') : null) : null;
        },
        methods: {
            onInput() {
                this.$emit("input", moment(this.date_value));
                this.$emit("change", moment(this.date_value));
            }
        },
    };
</script>
