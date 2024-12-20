<template>
    <v-row>
        <v-col cols="12">
            <v-card :loading="rooms.loading || events.loading">
                <vue-calendar-title @changeBuilding="changeBuilding()"
                                    @prev="prev"
                                    @next="next"
                                    @setToday="setToday"
                                    :date="focus"
                                    :date_start.sync="date_start"
                                    :disabled="rooms.loading || events.loading"
                                    :building_selected.sync="building_selected"
                                    :selected_room_type.sync="selected_room_type"
                                    @changeRoomType="changeRoomType()"
                                    :room_type_list="room_type.list"
                                    :room_type_loading="room_type.loading" />
                <v-col>
                    <v-sheet height="520">
                        <v-calendar ref="calendar"
                                    class="hide-header-date"
                                    v-model="focus"
                                    color="primary"
                                    type="category"
                                    category-show-all
                                    :interval-format="intervalFormat"
                                    :categories="rooms_list"
                                    :events="events.list"
                                    @click:event="onClickEvent"
                                    @change="doGetEvent">
                            <template v-slot:day-body="{date}">
                                <div class="v-current-time" v-if="now==date"
                                     :style="{ top: nowY }"></div>
                            </template>
                            <template v-slot:event="{ event }">
                                <div>{{event.name}}</div>
                                <div v-if="!event.is_out_system">
                                    {{event.organizer == null ? '-' :event.organizer.display_name}} <br />
                                    {{event.organizer == null ? '-' :event.organizer.phone}}
                                </div>
                                {{event.start.substr(11)}} - {{event.end.substr(11)}}
                            </template>
                        </v-calendar>
                    </v-sheet>
                    <vue-event-detail ref="modalDialog" />
                </v-col>
            </v-card>
        </v-col>
    </v-row>

</template>

<script>
    import moment from 'moment'
    import errorMessage from "@/utils/notify-error";
    import VueCalendarTitle from './CalendarTitle';
    import VueEventDetail from './EventDetail';
    import { getEvents } from '@/services/events';
    import { roomByBuilding } from '@/services/resources';
    export default {
        name: "VueDashboardCalendar",
        components: {
            VueCalendarTitle,
            VueEventDetail,
        },
        data: () => ({
            building_selected: {},
            selected_room_type: null,
            loading: false,
            ready: false,
            focus: '',
            dialog: false,
            date_start: moment().startOf('day').format('yyyy-MM-DD'),
            now: moment().startOf('day').format('yyyy-MM-DD'),
            title: '',
            rooms_list: [],
            rooms: {
                loading: false,
                list: []
            },
            room_type: {
                loading: false,
                list: []
            },
            events: {
                loading: false,
                list: []
            },
            event_list: []
        }),
        watch: {
            date_start() {
                let day_calendar = this.focus == null || this.focus == '' ? moment().startOf('day') : moment(this.focus);
                let go_to_date = moment(this.date_start);
                let diff = go_to_date.diff(day_calendar, 'days')
                this.$refs.calendar.move(diff);
                this.title = this.$refs.calendar.title;
            },
        },
        computed: {
            cal() {
                return this.ready ? this.$refs.calendar : null
            },
            nowY() {
                return this.cal ? this.cal.timeToY(this.cal.times.now) + 'px' : '-10px'
            }
        },
        async mounted() {
            this.ready = true
            await this.doGetRoom();
            this.$refs.calendar.checkChange();
            this.title = this.cal.title;
            this.scrollToTime(this.getCurrentTime());
        },
        methods: {
            changeRoomType() {
                this.rooms_list = [];
                this.rooms_list = [...this.rooms.list]
                if (this.selected_room_type != null) {
                    let selected_room_type = this.selected_room_type;
                    this.rooms_list = [...this.rooms.list].filter(function (item) {
                        return item.type === selected_room_type;
                    })
                }
                this.rooms_list = this.rooms_list.map((a) => { return a.name; });
            },
            onClickEvent({ event }) {
                this.$refs.modalDialog.showEvent(event);
            },
            intervalFormat(interval) {
                return interval.time
            },
            doGetRoom() {
                this.rooms.loading = true;
                this.room_type.loading = true;
                let payload = {};
                if (this.building_selected != null)
                    payload = {
                        building: this.building_selected.id,
                        floor: this.building_selected.floor_name
                    };
                roomByBuilding(payload)
                    .then(response => {
                        this.rooms.loading = false;
                        this.room_type.loading = false;
                        let room_type = [];
                        this.rooms_list = [];
                        response.data.map(function (value) {
                            if (room_type.indexOf(value.type) < 0)
                                room_type.push(value.type);
                        });
                        this.room_type.list = room_type;
                        this.rooms.list = response.data;
                        this.rooms_list = [...this.rooms.list].map((a) => {
                            return a.name;
                        });
                    })
                    .catch(error => {
                        this.rooms.loading = false;
                        this.room_type.loading = false;
                        errorMessage(error);
                    })
            },
            doGetEvent() {
                this.events.loading = true;
                let payload = {
                    date: this.focus == '' ? moment().startOf('day').utc().toDate() : moment(this.focus).utc().toDate(),
                    building: null,
                    floor: null
                }
                if (this.building_selected != null)
                    payload = {
                        date: this.focus == '' ? moment().startOf('day').utc().toDate() : moment(this.focus).utc().toDate(),
                        building: this.building_selected.id,
                        floor: this.building_selected.floor_name
                    };
                getEvents(payload)
                    .then(response => {
                        this.events.loading = false
                        this.events.list = response.data.map((a) => {
                            return {
                                name: a.name,
                                start: moment.utc(a.start).local().format('yyyy-MM-DD HH:mm'),
                                end: moment.utc(a.end).local().format('yyyy-MM-DD HH:mm'),
                                created_at: moment.utc(a.created_at).local().format('yyyy-MM-DD HH:mm'),
                                updated_at: moment.utc(a.updated_at).local().format('yyyy-MM-DD HH:mm'),
                                color: a.color,
                                timed: a.timed,
                                category: a.category,
                                is_out_system: a.is_out_system,
                                rooms: a.rooms,
                                location: a.location,
                                description: a.description,
                                organizer: a.organizer,
                                creator: a.creator,
                                attendees: a.attendees,
                                calendar_id: a.calendar_id,
                                id: a.id
                            }
                        });
                    })
                    .catch(error => {
                        this.events.loading = false
                        errorMessage(error);
                    })
            },
            getCurrentTime() {
                return this.cal
                    ? this.cal.times.now.hour * 60 + this.cal.times.now.minute - 120
                    : 0;
            },
            scrollToTime(time) {
                if (this.type !== "category")
                    this.$nextTick(() => this.cal.scrollToTime(this.getCurrentTime()));
                const y = this.cal.timeToY(time);
                if (y === false || !this.cal.$el) {
                    return false;
                }
                this.cal.$el.scrollTop = y;
                return !!this.cal.$el.scrollTop;
            },
            changeBuilding() {
                this.doGetRoom();
                this.events.list = [];
                this.doGetEvent();
            },
            getEventColor(event) {
                return event.color
            },
            setToday() {
                this.focus = ''
                this.title = this.$refs.calendar.title;
            },
            prev() {
                this.$refs.calendar.prev();
                this.title = this.$refs.calendar.title;
            },
            next() {
                this.$refs.calendar.next();
                this.title = this.$refs.calendar.title;
            },
        }
    };
</script>
