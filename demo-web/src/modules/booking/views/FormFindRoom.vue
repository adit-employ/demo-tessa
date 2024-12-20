<template>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-col cols="12" xs="12" class="pt-8">
                    <v-form v-model="form_error" ref="form" lazy-validation>
                        <v-row>
                            <v-col cols="12" :md="state_form == 'CREATE' ? 6 : 12">
                                <v-row>
                                    <v-col cols="12" sm="6" class="pt-0 pb-0">
                                        <vue-date-picker v-model="form.start_date"
                                                         v-bind="{placeholder: 'Event Date *' }"
                                                         :disabled="loading"
                                                         :min="minDate"
                                                         :rules="rules.start_date"
                                                         @change="eventDateChange()" />
                                    </v-col>
                                    <v-col cols="12" sm="3" class="pt-0 pb-0">
                                        <vue-time-picker v-model="form.start_time"
                                                         :rules="rules.start_time"
                                                         v-bind="{placeholder: 'Start *' }"
                                                         :disabled="form.full_day || form.start_date == null" />
                                    </v-col>
                                    <v-col cols="12" sm="3" class="pt-0 pb-0">
                                        <vue-time-picker v-model="form.end_time"
                                                         :rules="rules.end_time"
                                                         v-bind="{placeholder: 'End *' }"
                                                         :disabled="form.full_day || form.start_date == null" />
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="3" class="pt-0 pb-0">
                                        <v-checkbox v-model="form.full_day"
                                                    @change="fullDayCheck()"
                                                    label="Full Day"
                                                    :disabled="form.start_date == null"></v-checkbox>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="12" md="6" v-if="state_form == 'CREATE'">
                                <v-row>
                                    <v-col cols="12" :sm="form.is_repetition ? 6 : 12" class="pt-0  pb-0">
                                        <v-row>
                                            <v-col cols="12" :sm="form.is_repetition && form.type_repetition ==='1' || form.type_repetition ==='2' ? 9 : 12">
                                                <v-select v-model="form.type_repetition"
                                                          :items="type_repetition_list"
                                                          item-text="text"
                                                          clearable
                                                          @change="typeRepetitionChange()"
                                                          :rules="rules.type_repetition"
                                                          :disabled="!form.is_repetition"
                                                          item-value="id"
                                                          label="Repetition *">
                                                    <template v-slot:prepend>
                                                        <v-checkbox class="no-top" v-model="form.is_repetition" @change="repetitionChange()" :disabled="form.start_date == null"></v-checkbox>
                                                    </template>
                                                </v-select>
                                            </v-col>
                                            <v-col cols="12" v-if="form.is_repetition && form.type_repetition ==='1' || form.type_repetition ==='2'" sm="3">
                                                <v-text-field v-model="form.interval"
                                                              label="Interval *"
                                                              type="number"
                                                              min="1"
                                                              max="12"
                                                              :disabled="loading"
                                                              :rules="rules.interval">
                                                </v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                    <v-col cols="12" sm="6" v-if="form.is_repetition" class="pt-0 pb-0">
                                        <vue-date-picker v-model="form.end_of_repetition"
                                                         :rules="rules.end_of_repetition"
                                                         :min="minEnd"
                                                         v-bind="{placeholder: 'End Date *' }"
                                                         :disabled="loading" />
                                    </v-col>
                                </v-row>
                                <div v-if="form.is_repetition && form.type_repetition ==='1'" class="pt-9">
                                    <v-btn v-for="(day, index) in repetition_day_list" :key="index"
                                           color="primary"
                                           :class="{'margin-left-15': day != 'SU'}"
                                           x-small
                                           fab
                                           :outlined="!form.repetition_day.some(a=>a==day)"
                                           @click="repetitionDayClick(day)">
                                        {{day}}
                                    </v-btn>
                                    <v-text-field class="hidden-input-only" hidden :rules="rules.repetition_day" v-model="form.repetition_day"></v-text-field>
                                </div>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-col>
                <v-divider />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="useGoBack" @click="onGoback()" outlined color="primary">
                        Back
                    </v-btn>
                    <v-btn color="primary" @click="onFindRoom()">
                        Find Room
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import VueDatePicker from "@/components/form/Datepicker";
    import VueTimePicker from "@/components/form/Timepicker";
    import { dateAndTimeToMoment } from "@/utils/form-parser"
    import moment from 'moment';
    export default {
        name: "VueFormFindRoom",
        components: {
            VueDatePicker,
            VueTimePicker
        },

        mounted() {
            this.form = this.schedule;
            this.repetitionChange();
            this.typeRepetitionChange();
        },
        props: {
            schedule: {
                type: Object,
                default: () => {
                    return {
                        start_date: null,
                        start_time: null,
                        end_time: null,
                        is_repetition: false,
                        type_repetition: null,
                        end_of_repetition: null,
                        full_day: false,
                        repetition_day: [],
                        interval: null
                    };
                },
                required: true
            },
            state_form: {
                type: String,
                default: 'CREATE',
            },
            useGoBack: {
                type: Boolean,
                default: false,
            },
        },
        watch: {
            form: {
                handler() {
                    this.$emit('update:schedule', this.form)
                    this.$emit("change");
                    if (this.form.start_date != null)
                        this.minEnd = moment(this.form.start_date).add(1, 'day').format('yyyy-MM-DD');
                },
                deep: true
            },
            schedule: {
                handler() {
                    this.form = this.schedule;
                },
                deep: true
            }
        },
        data() {
            return {
                form: {
                    start_date: null,
                    start_time: null,
                    end_time: null,
                    is_repetition: false,
                    type_repetition: null,
                    end_of_repetition: null,
                    full_day: false,
                    repetition_day: []
                },
                minDate: moment().startOf('day').format('yyyy-MM-DD'),
                minEnd: moment().add(1, 'day').startOf('day').format('yyyy-MM-DD'),
                form_payload: {},
                rules: {
                    start_date: [
                        v => !!v || 'Event date is required',
                    ],
                    start_time: [
                        v => !!v || 'Start is required',
                        () => this.dateAndTimeToMoment(moment().startOf('day'), moment().hour()).isBefore(this.dateAndTimeToMoment(this.form.start_date, this.form.start_time)) || 'Start time must be greater than current time.'
                    ],
                    end_time: [
                        v => !!v || 'End is required',
                        () => this.dateAndTimeToMoment(this.form.start_date, this.form.start_time).isBefore(this.dateAndTimeToMoment(this.form.start_date, this.form.end_time)) || 'End time must be greater than start time.'
                    ],
                    type_repetition: [],
                    end_of_repetition: [
                        () => (this.form.start_date == null ? moment() : moment(this.form.start_date))
                            .isBefore((this.form.end_of_repetition == null ? moment() : moment(this.form.end_of_repetition))) || 'End date must after event date'],
                    repetition_day: [],
                    interval: [
                        v => !!v || 'Interval is required',
                        v => v > 0 || 'Min interval is 1',
                        v => v <= 12 || 'Max interval is 12',
                    ],
                },
                form_error: false,
                loading: false,
                room_list: [],
                type_repetition_list: [
                    { id: "0", text: "Daily" },
                    { id: "1", text: "Weekly" },
                    { id: "2", text: "Monthly" }
                ],
                repetition_day_list: ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]
            };
        },
        methods: {
            dateAndTimeToMoment,
            fullDayCheck() {
                this.form.start_time = '08:00';
                this.form.end_time = '17:00';
            },
            repetitionDayClick(day) {
                if (this.form.repetition_day.indexOf(day) >= 0) this.form.repetition_day.splice(this.form.repetition_day.indexOf(day), 1);
                else this.form.repetition_day.push(day);
            },
            repetitionChange() {
                if (!this.form.is_repetition) {
                    this.form.type_repetition = null;
                    this.form.end_of_repetition = null;
                    this.form.repetition_day = [];
                    this.rules.type_repetition = [];
                    this.rules.end_of_repetition = [];
                    this.rules.repetition_day = [];
                }
                else {
                    //if (this.form.start_date != null) this.form.repetition_day.push(this.repetition_day_list[this.form.start_date.day()]);
                    this.rules.type_repetition = [v => !!v || 'Repetition is required'];
                    this.rules.end_of_repetition = [() => (this.form.start_date == null ? moment() : moment(this.form.start_date))
                        .isBefore((this.form.end_of_repetition == null ? moment() : moment(this.form.end_of_repetition))) || 'End date must after event date',
                    v => !!v || 'End date is required'
                    ];
                }
            },
            typeRepetitionChange() {
                if (this.form.type_repetition !== '1') {
                    this.rules.repetition_day = [];
                    this.form.repetition_day = [];
                }
                else {
                    this.rules.repetition_day = [v => v.length > 0 || 'Day is required'];
                    this.eventDateChange();
                }
            },
            eventDateChange() {
                if (!(this.form.start_time === null || this.form.end_time === null || !this.$refs.form.validate())) {
                    this.$refs.form.resetValidation();
                }
                this.form.repetition_day = [];
                if (this.form.is_repetition && this.form.type_repetition === '1' && this.form.start_date != null)
                    this.form.repetition_day.push(this.repetition_day_list[this.form.start_date.day()]);
            },
            onFindRoom() {
                if (!this.$refs.form.validate()) return false;
                this.$emit("findRoom");
            },
            onGoback() {
                this.$emit("goBack");
            }
        }
    };
</script>
