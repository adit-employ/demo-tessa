<template>
    <v-card>
        <v-card-title>
            <v-row>
                <v-col cols="12" sm="8">
                    <v-text-field v-model="search"
                                  append-icon="mdi-magnify"
                                  label="Search"
                                  single-line
                                  hide-details>
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                    <vue-month-picker v-model="filter_date"
                                      v-bind="{placeholder: 'Filter by Month' }"
                                      :min="min_month"
                                      @change="filterEvents()" />
                </v-col>
            </v-row>
            <v-spacer v-if="size"></v-spacer>
            <div class="pt-2">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on"
                            depressed
                            color="primary"
                            class="white--text small ml-2"
                            @click="openSelectRoom()"
                            fab>
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </template>
                    <span>Add New Booking</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on"
                            icon
                            outlined
                            color="primary"
                            class="white--text small ml-2"
                            @click="doRefreshData()"
                            fab>
                                <v-icon dark>
                                    mdi-cached
                                </v-icon>
                            </v-btn>
                        </template>
                    <span>Refresh</span>
                </v-tooltip>
            </div>
        </v-card-title>
        <v-data-table :headers="headers"
                      :items="booking_list"
                      :search="search"
                      :loading="loading"
                      :footer-props="{'items-per-page-options':[10, 25, 50]}"
                      class="elevation-1">
                        <template v-slot:[`item.updated_at`]="{ item }">
                            <div>{{formatDate(item.updated_at,'fromnow')}}</div>
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon v-on="on" @click="$router.push({ name: 'reschedule', params: { event_id: item.id, calendar_id: item.calendar_id } })">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Edit Booking</span>
                            </v-tooltip>
                        </template>
        </v-data-table>
    </v-card>
</template>

<script>
    // Services
    import { eventsByEmail } from '@/services/events';

    import VueMonthPicker from '@/components/form/Monthpicker'

    //Utils
    import numberItems from '@/utils/map-number';
    import errorMessage from "@/utils/notify-error";
    import moment from 'moment';
    import formatDate from "@/utils/format-date";
    
    export default {
        name: "VueListBooking",
        data() {
            return {
                search: null,
                filter_date: null,
                params: {},
                filter_date_payload:{},
                loading: false,
                min_month: moment().startOf('day').format('yyyy-MM-DD'),
                booking_list: [],
                headers: [
                    { text: 'Date', value: 'time', align: 'start', sortable: true },
                    { text: 'Room', value: 'rooms_name', align: 'start', sortable: true },
                    { text: 'Organizer', value: 'organizer.display_name', align: 'start', sortable: true },
                    { text: 'Phone Number', value: 'organizer.phone', align: 'start', sortable: true },
                    { text: 'Updated At', value: 'updated_at', sortable: true },
                    { text: 'Action', value: 'action', sortable: false},
                ],
            };
        },
        components: {
            VueMonthPicker
        },
        computed: {
            size() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return true
                    case 'sm': return false
                    case 'md': return false
                    default: return false
                }
            },
        },
        mounted() {
            let payload = {
                month: moment().startOf('day').format('MM'),
                year: moment().startOf('day').format('yyyy'),
            };
            this.filter_date = moment();
            this.doGetData(payload);
        },
        methods: {
            formatDate,
            startDateFormat(start, end) {
                return moment.utc(start).local().format('DD MMM YYYY') + " " + moment.utc(start).local().format('HH:mm') + "-" + moment.utc(end).local().format('HH:mm');
            },
            numberItems,
            doGetData(payload) {
                this.loading = true;          
                eventsByEmail(payload)
                    .then(response => {
                        this.loading = false
                        this.booking_list = response.data.map(a => ({
                            ...a,
                            rooms_name: a.rooms.map(b => b.name).join(", "),
                            time: this.startDateFormat(a.start_date, a.end_date)
                        }));
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
            },
            openSelectRoom() {
                this.$router.push({
                    name: "select-room"
                });
            },
            doRefreshData() {
                this.booking_list=[];
                let payload = {
                    month: this.filter_date.startOf('day').format('MM'),
                    year: this.filter_date.startOf('day').format('yyyy'),
                }
                this.doGetData(payload);
            },
            filterEvents() {
                let payload = {
                    month: this.filter_date.startOf('day').format('MM'),
                    year: this.filter_date.startOf('day').format('yyyy'),
                }
                this.doGetData(payload);
            },
        }
    };
</script>
