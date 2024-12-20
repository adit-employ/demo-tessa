<template>
    <v-dialog v-model="dialog"
              width="500">

        <v-card v-if="event != null">
            <div class="pb-4">
                <v-avatar size="40" class="px-9 py-8">
                    <v-icon color="primary">mdi-circle</v-icon>
                </v-avatar>
                <div class="content-event-detail title-event">
                    <div class="title-event">
                        {{event.name}}
                    </div>
                    <div class="subtitle-event">
                        {{toLabelDate(event.start, event.end)}}
                    </div>
                </div>
            </div>
            <v-divider></v-divider>

            <div>
                <v-avatar size="40" class="px-9 py-6">
                    <v-icon>mdi-map-marker</v-icon>
                </v-avatar>
                <div class="content-event-detail">
                    <div class="title-event">
                        {{event.location}}
                    </div>
                </div>
            </div>

            <div v-for="(item, index) in event.rooms" :key="item.email">
                <v-avatar size="40" class="px-9 py-6">
                    <v-icon v-if="index==0">mdi-door</v-icon>
                </v-avatar>
                <div class="content-event-detail">
                    <div class="title-event">
                        {{item.name}}
                    </div>
                </div>
            </div>

            <div v-if="event.projector != null">
                <v-avatar size="40" class="px-9 py-6">
                    <v-icon>mdi-projector</v-icon>
                </v-avatar>
                <div class="content-event-detail">
                    <div class="title-event">
                        {{event.projector.display_name}}
                    </div>
                </div>
            </div>

            <div v-if="event.organizer != null">
                <v-avatar size="40" class="px-9 py-6">
                    <v-icon>mdi-account-tie</v-icon>
                </v-avatar>
                <div class="content-event-detail">
                    <div class="title-event">
                        {{event.organizer.display_name}}
                    </div>
                    <div class="subtitle-event"
                         color="grey">
                        {{event.organizer.phone}}
                    </div>
                    <div class="subtitle-event"
                         v-if="event.organizer.email != event.organizer.display_name"
                         color="grey">
                        {{event.organizer.email}}
                    </div>
                </div>
            </div>

            <div v-for="(item, index) in event.attendees" :key="item.email">
                <v-avatar :size="index==0 ? 40 : 30" class="px-9">
                    <v-icon v-if="index==0">mdi-account-multiple-outline</v-icon>
                </v-avatar>
                <div class="content-event-detail">
                    <div class="title-event" v-if="item.response_status=='accepted'">
                        <v-icon color="green" size="20">mdi-check-circle-outline</v-icon>
                        {{item.display_name}}
                    </div>
                    <div class="title-event" v-if="item.response_status=='declined'">
                        <v-icon color="red" size="20">mdi-close-circle-outline</v-icon>
                        {{item.display_name}}
                    </div>
                    <div class="title-event" v-if="item.response_status=='tentative'">
                        <v-icon color="grey" size="20">mdi-help-circle-outline</v-icon>
                        {{item.display_name}}
                    </div>
                    <div class="title-event" v-if="item.response_status=='needsAction' || item.response_status==null">
                        <!-- <v-icon size="20">mdi-circle-outline</v-icon> -->
                        {{item.display_name}}
                    </div>
                    <div v-if="item.display_name != item.email"
                         class="subtitle-event"
                         color="grey">
                        {{item.email}}
                    </div>
                </div>
            </div>

            <div v-if="event.description != ''">
                <v-avatar size="40" class="px-9 py-6">
                    <v-icon>mdi-note-text-outline</v-icon>
                </v-avatar>
                <div class="content-event-detail">
                    <div class="title-event" v-html="event.description"></div>
                </div>
            </div>

            <div>
                <v-avatar size="40" class="px-9 py-6">
                    <v-icon>mdi-calendar</v-icon>
                </v-avatar>
                <div class="content-event-detail">
                    <div class="title-event" v-if="event.creator != null && event.created_at + 1 > event.updated_at">
                        Created by: {{event.creator.display_name}}
                    </div>
                    <div class="title-event" v-if="event.creator != null && event.updated_at > event.created_at">
                        Updated by: {{event.creator.display_name}}
                    </div>
                    <div class="subtitle-event">{{updatedAt()}}</div>
                </div>
            </div>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                       outlined
                       @click="closeModal">
                    Close
                </v-btn>
                <v-btn color="primary"
                       v-if="user.is_admin"
                       @click="goToUpdateForm">
                    Reschedule
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import moment from 'moment';
    import { mapState } from "vuex";
    export default {
        name: "VueEventDetail",
        components: {
        },
        data() {
            return {
                event: null,
                dialog: false
            };
        },
        computed: {
            ...mapState("user", {
                user: (state) => state.user,
            }),

        },
        methods: {
            goToUpdateForm() {
                this.$router.push({ name: 'reschedule', params: { event_id: this.event.id, calendar_id: this.event.calendar_id } })
            },
            toLabelDate(start, end) {
                let s = moment(start);
                let e = moment(end);
                return s.format('dddd, DD MMMM yyyy') + ' at ' + s.format('HH:mm') + ' - ' + e.format('HH:mm');
            },
            // createdAt() {
            //     let c = moment(this.event.created_at);
            //     return c.format('dddd, DD MMMM yyyy') + ' at ' + c.format('HH:mm');
            // },
            updatedAt() {
                let c = moment(this.event.updated_at);
                return c.format('dddd, DD MMMM yyyy') + ' at ' + c.format('HH:mm');
            },
            showEvent(event) {
                if (!event.is_out_system) {
                    this.dialog = true;
                    this.event = event;
                }
            },
            closeModal() {
                this.dialog = false;
                this.event = null;
            }
        }
    };
</script>
