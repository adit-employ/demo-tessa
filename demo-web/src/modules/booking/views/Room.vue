<template>
    <v-row>
        <v-col cols="12">
            <v-card v-if="room != null">
                <v-card-title class="subheading font-weight-bold">
                    <v-avatar v-if="room.type.toLowerCase() == 'classroom'" size="40" color="orange mr-5">
                        <v-icon color="white">mdi-google-classroom</v-icon>
                    </v-avatar>
                    <v-avatar v-else size="40" color="green mr-5">
                        <v-icon color="white">mdi-human-male-board</v-icon>
                    </v-avatar>
                    {{ room.name }}
                    <v-spacer></v-spacer>
                    <v-btn icon
                           color="black"
                           @click="onChangeRoom()"
                           v-if="schedule != null">
                        <v-icon>mdi-calendar-edit</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-subtitle v-if="room.type.toLowerCase() == 'classroom'" class="pb-0 pt-2 orange--text font-weight-bold">
                    {{room.type}}
                </v-card-subtitle>
                <v-card-subtitle v-else class="pb-0 pt-2 green--text font-weight-bold">
                    {{room.type}}
                </v-card-subtitle>
                <v-card-text class="text--primary body-1">
                    <div class="text-4-lines-address">
                        <b>{{room.building.name}} {{room.floor_name == 'All' ? '' : room.floor_name}} </b> <br v-if="room.building.address != null" />
                        <small>{{room.building.address}}</small>
                    </div>
                    <div class="light-blue--text body-2">
                        <span v-for="feature in room.features" :key="feature">
                            <v-icon class="icon-small-blue light-blue--text">mdi-checkbox-outline</v-icon>
                            {{feature}}
                        </span>
                        <span>
                            <v-icon class="icon-small-blue light-blue--text">mdi-account-multiple</v-icon>
                            {{room.capacity}} {{room.capacity > 1 ? 'Peoples':'People'}}
                        </span>
                    </div>
                    <div class="body-2" v-if="schedule != null">
                        <span>{{toFullDayName(schedule.start_date)}} at {{schedule.start_time}} - {{schedule.end_time}}</span>
                        <span v-if="schedule.is_repetition">
                            <span>
                                # Repetition {{repetitionType(schedule.type_repetition)}}
                                {{schedule.interval == null || schedule.interval < 2 ? ' ': ('with Interval ' + schedule.interval + ' ') }}
                                {{schedule.type_repetition != 0 ? 'on':''}}
                            </span>
                            <span v-for="(val, i) in schedule.repetition_day" :key="i">{{i > 0 ? (schedule.repetition_day.length == 2 ? ' and ' : ((i+1) == schedule.repetition_day.length ? ', and' : ', ')) : ''}} {{DayName(val)}}</span>
                            <span v-if="schedule.type_repetition == 2">{{weekName(schedule.start_date)}}</span>
                            <span> until {{toFullDayName(schedule.end_of_repetition)}}</span>
                        </span>
                    </div>
                </v-card-text>
                <v-divider v-if="schedule == null" />
                <v-card-actions v-if="schedule == null">
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="onBookRoom()">
                        Book Now
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>

</template>

<script>
    import moment from 'moment';
    export default {
        name: "VueRoom",
        props: {
            room: {
                type: Object,
                default: () => { },
            },
            schedule: {
                type: Object,
                default: () => { },
            },
        },
        components: {
        },
        watch: {
            schedule() {
            }
        },
        mounted() {

        },
        methods: {
            repetitionType(type) {
                if (type == 0) return 'Daily';
                else if (type == 1) return 'Weekly';
                else if (type == 2) return 'Monthly';
                else return type;
            },
            DayName(day) {
                if (day == 'SU') return 'Sunday';
                else if (day == 'MO') return 'Monday';
                else if (day == 'TU') return 'Tuesday';
                else if (day == 'WE') return 'Wednesday';
                else if (day == 'TH') return 'Thrusday';
                else if (day == 'FR') return 'Friday';
                else if (day == 'SA') return 'Saturday';
            },
            toFullDayName(date) {
                return moment.utc(date).format('dddd, DD MMMM YYYY')
            },
            GetDayName(date) {
                return moment.utc(date).format('dddd')
            },
            onChangeRoom() {
                this.$emit("changeRoom", this.form);
            },
            onBookRoom() {
                this.$emit("bookRoom", this.form);
            },
            weekName(date) {
                let weekNumber = 0;
                let dayInMonth = moment.utc(date).daysInMonth();
                let day = parseInt(moment.utc(date).format('D'));
                if (day > 20) weekNumber = Math.ceil((dayInMonth - day) / 7) * -1;
                else weekNumber = Math.ceil(day / 7);
                let day_name = moment.utc(date).format('dddd')
                //result = (int)Math.Ceiling((double)(DateTime.DaysInMonth(date.Year, date.Month) - date.Day) / 7) * -1;
                //else
                //result = (int)Math.Ceiling((double)date.Day / 7);
                if (weekNumber == 1) return 'the first ' + day_name;
                else if (weekNumber == 2) return 'the second ' + day_name;
                else if (weekNumber == 3) return 'the third ' + day_name;
                else if (weekNumber == 4) return 'the fourth ' + day_name;
                else if (weekNumber == 5) return 'the fifth ' + day_name;
                else if (weekNumber == -1) return 'the last ' + day_name;
                else if (weekNumber == -2) return day_name + ', 2 weeks before end of the month,';
                else if (weekNumber == -3) return day_name + ', 3 weeks before end of the month,';
                else if (weekNumber == -4) return day_name + ', 4 weeks before end of the month,';
            }
        }
    };
</script>
