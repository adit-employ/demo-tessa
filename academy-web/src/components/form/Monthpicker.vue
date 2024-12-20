<template>
    <v-dialog ref="dialog"
              v-model="modal"
              :return-value.sync="value_date"
              :disabled="disabled"
              width="290px">
        <template v-slot:activator="{ on }">
            <v-text-field v-model="label_date"
                          :label="placeholder"
                          append-icon="mdi-calendar"
                          :rules="rules"
                          :value="value"
                          :placeholder="placeholder"
                          :disabled="disabled"
                          hide-details
                          readonly
                          v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="date_value"
                       scrollable
                       :min="min"
                       type=month
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
        name: "VueMonthPicker",
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
                return this.date_value ? moment.utc(this.date_value).format('MMMM YYYY') : ''
            },
        },
        watch: {
            date_value(value) {
                this.value_date = this.date_value ? moment.utc(value) : null
            },
            value(value) {
                this.date_value = moment.isMoment(value) ? value.utc().format('YYYY-MM') : null;
            }
        },
        mounted() {
            this.date_value = moment.isMoment(this.value) ? (this.value.isValid() ? this.value.utc().format('YYYY-MM') : null) : null;
        },
        methods: {
            onInput() {
                this.$emit("input", moment.utc(this.date_value));
                this.$emit("change", moment.utc(this.date_value));
            }
        },
    };
</script>
