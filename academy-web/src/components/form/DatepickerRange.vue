<template>
    <v-dialog ref="dialog"
                v-model="modal"
                :return-value.sync="date_value"
                persistent
                width="290px" >
        <template v-slot:activator="{ on }">
            <v-text-field
                            v-model="label_date"
                            prepend-inner-icon="mdi-calendar"
                            :label="placeholder"
                            :placeholder="placeholder"
                            :value="value"
                            :rules="rules"
                            :disabled="disabled"
                            readonly
                            v-on="on"
                            dense ></v-text-field>
                            <!-- v-bind="attrs" -->
        </template>
        <v-date-picker v-model="date_value" scrollable range no-title dense>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false" dense> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date_value);onInput()" dense> OK </v-btn>
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
                type: [Array, Object],
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
                if(this.date_value == undefined ){
                    return ''
                }
                else{
                    return this.date_value[1] < this.date_value[0] ? moment(this.date_value[1]).format('DD MMMM YYYY').concat(' - ', moment(this.date_value[0]).format('DD MMMM YYYY')) : moment(this.date_value[0]).format('DD MMMM YYYY').concat(' - ', moment(this.date_value[1]).format('DD MMMM YYYY'));
                }
            },
        },
        watch: {
            // date_value(value) {
            //     console.log('watch date_value', value);
            //     if(value.length == 2){
            //         console.log('watch date_value length', value.length);
            //         console.log('watch date_value variable ', this.date_value);
            //         // this.value_date[0] = moment(value[0])
            //         // this.value_date[1] = moment(value[1])
            //     }
            //     // this.value_date[0] = this.date_value[0] && value.length > 1 ? moment(value[0]) : null
            //     // this.value_date[1] = this.date_value[1] ? moment(value[1]) : null

            //     //this.value_date = this.date_value ? moment(value) : null
            // },
            value(value) {
                console.log('watch value', value);

                // this.date_value = moment.isMoment(value) ? value.format('YYYY-MM-DD') : null;
            }
        },
        mounted() {
            this.date_value = moment.isMoment(this.value) ? (this.value.isValid() ? this.value.format('YYYY-MM-DD') : null) : null;
        },
        methods: {
            onInput() {
                if(this.date_value.length == 2 && this.date_value[1] < this.date_value[0]){
                    var second = this.date_value[1];
                    var first = this.date_value[0];
                    this.date_value[0] = second;
                    this.date_value[1] = first;
                    console.log('date_value', this.date_value);
                }
                // console.log(this.date_value);
                this.$emit("input", moment(this.date_value[0]), moment(this.date_value[1]));
                this.$emit("change", moment(this.date_value[0]), moment(this.date_value[1]));
            }
        },
    };
</script>
