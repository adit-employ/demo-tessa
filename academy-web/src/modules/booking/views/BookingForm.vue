<template>
    <v-row>
        <v-col cols="12">
            <vue-room :room="room" :schedule="schedule" @changeRoom="onChangeRoom()" />
        </v-col>
        <v-col cols="12">
            <v-card :loading="loading || loading_detail || loading_delete">
                <v-col cols="12" xs="12">
                    <v-form v-model="form_error" ref="form" lazy-validation>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field v-model="form.title"
                                              label="Title *"
                                              :disabled="loading_detail"
                                              prepend-icon="mdi-format-title"
                                              :rules="rules.title" />
                                <vue-person-combobox v-model="form.organizer"
                                                     :items="person.list"
                                                     v-if="user.is_admin"
                                                     :chips="false"
                                                     :rules="rules.organizer"
                                                     icon="mdi-account-tie"
                                                     @change="onChangeOrganizer()"
                                                     :disabled="person.loading || loading_detail"
                                                     :label="person.loading ? 'Loading...':'Select Organizer *'"
                                                     item-text="display_name"
                                                     item-value="email" />
                            </v-col>
                            <v-col cols="12" md="6">
                                <vue-person-combobox v-model="form.attendees"
                                                     :items="person.list"
                                                     :multiple="true"
                                                     :rules="rules.attendees"
                                                     icon="mdi-account-multiple-outline"
                                                     :disabled="person.loading || loading_detail"
                                                     :label="person.loading ? 'Loading...':'Select Attendees *'"
                                                     item-text="display_name"
                                                     item-value="email" />

                                <v-text-field v-model="form.phone"
                                              label="Phone Number *"
                                              :disabled="loading_detail"
                                              prepend-icon="mdi-phone"
                                              :rules="rules.phone" />
                            </v-col>
                        </v-row>

                        <tiptap-vuetify class="booking-form"
                                        v-model="form.description"
                                        :disabled="loading_detail"
                                        placeholder="Write description here"
                                        :extensions="extensions" />
                        <!--<v-autocomplete v-model="form.additional_projector"
                                        :items="projector.list"
                                        clearable
                                        prepend-icon="mdi-projector"
                                        :disabled="projector.loading"
                                        item-text="name"
                                        item-value="email"
                                        :label="projector.loading ? 'Loading...':'Select Additional Projector'">
                            <template v-slot:item="data">
                                <template v-if="typeof data.item == 'object'">
                                    <v-list-item-content>
                                        <v-list-item-title>{{data.item.name}}</v-list-item-title>
                                        <v-list-item-subtitle>{{data.item.building.name}} {{data.item.floor_name}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </template>
                            </template>
                        </v-autocomplete>-->
                    </v-form>
                </v-col>
                <v-divider />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" outlined @click="onBack()" :disabled="loading || loading_detail || loading_delete">
                        Back
                    </v-btn>
                    <v-btn color="primary" @click="onSubmit()" :disabled="loading || loading_detail || loading_delete">
                        {{loading?'Loading...':'Submit'}}
                    </v-btn>
                    <v-btn color="error"
                           @click="modalDelete = true"
                           :disabled="loading || loading_detail || loading_delete"
                           v-if="state_form=='RESCHEDULE'">
                        {{loading_delete ? 'Loading...':'Delete'}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
        <v-dialog v-model="modalDelete" max-width="500">
            <v-card>
                <v-card-title class="text-h7">
                    Cancellation
                </v-card-title>
                <v-divider />
                <v-card-text class="px-6 py-2">
                    Are you sure want to cancel this event?
                    <v-radio-group v-model="withFollowingEvent"
                                   v-if="form.is_repetition"
                                   column>
                        <v-radio label="This event"
                                 color="primary"
                                 :value="false" />
                        <v-radio label="This event and following event"
                                 color="primary"
                                 :value="true" />
                    </v-radio-group>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" outlined @click="modalDelete = false">
                        Close
                    </v-btn>
                    <v-btn color="error" @click="onDelete(), confirmDel = true">
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalConfirm" max-width="510">
            <v-card>
                <v-card-title class="text-h7">
                    Would you like to send invitation emails to Google Calendar guests?
                </v-card-title>
                <v-divider />
                <v-divider />
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" outlined @click="modalConfirm = false">
                        Close
                    </v-btn>
                    <v-btn color="error" v-if="confirmDel == false" @click="dontSendNotif()">
                        Don't send
                    </v-btn>
                    <v-btn color="error" v-else @click="dontSendDelete()">
                        Don't send
                    </v-btn>
                    <v-btn color="primary" v-if="confirmDel == false" @click="sendNotif()">
                        Send
                    </v-btn>
                    <v-btn color="primary" v-else @click="sendDelete()">
                        Send
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import VueRoom from "./Room";
    import VuePersonCombobox from "@/components/form/PersonCombobox";
    import { getPerson } from "@/services/person";
    import errorMessage from "@/utils/notify-error";
    //import { availableProjector } from "@/services/resources.js";
    import { toFormSubmit } from "@/utils/form-parser";
    import { mapState } from "vuex";
    import { createEvent, updateEvent, eventsDetail, deleteEvent } from "@/services/events";
    import moment from 'moment';
    import { TiptapVuetify, Heading, Bold, HardBreak, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HorizontalRule, History } from 'tiptap-vuetify';

    export default {
        name: "VueBookingForm",
        data() {
            return {
                extensions: [
                    History,
                    Blockquote,
                    Link,
                    Underline,
                    Strike,
                    Italic,
                    ListItem,
                    BulletList,
                    OrderedList,
                    [Heading, {
                        options: {
                            levels: [1, 2, 3]
                        }
                    }],
                    Bold,
                    Code,
                    HardBreak,
                    HorizontalRule,
                    Paragraph
                ],
                form: {
                    title: null,
                    organizer: null,
                    organizer_name: null,
                    description: null,
                    phone: null,
                    attendees: [],
                    additional_projector: null,
                    calendar_id: null,
                    event_id: null,
                    icall_uid: null,
                    is_repetition: null
                },
                withFollowingEvent: false,
                modalDelete: false,
                modalConfirm: false,
                send_update: false,
                confirmDel: false,
                loading_detail: false,
                loading_delete: false,
                state_form: null,
                form_error: false,
                schedule: null,
                room: null,
                rules: {
                    title: [
                        v => !!v || 'Title is required',
                    ],
                    attendees: [
                        v => v == null ? false : v.length > 0 || 'Attendees is required',
                        v => v == null ? false : v.indexOf(this.form.organizer) == -1 || 'Attendees may not be the same as the organizer',
                        v => this.user.is_admin ? true : v == null ? false : v.indexOf(this.user.email) == -1 || 'Attendees may not be the same as the organizer',
                        v => v == null ? false : v.map(function (item) { return /.+@.+\..+/.test(item) }).indexOf(false) == -1 || 'Attendees must be valid email'
                    ],
                    phone: [
                        v => !!v || 'Phone number is required',
                        v => (v || '').indexOf(' ') < 0 || 'Using spaces are not allowed',
                        v => /^[0-9]*$/.test(v) || 'Phone number may only use numbers',
                        v => v == null ? false : v.length >= 10 || 'Phone number must be more than 10 characters',
                        v => v == null ? false : v.length <= 13 || 'Phone number must be less than 13 characters',
                    ],
                    organizer: [],
                },
                projector: {
                    loading: false,
                    list: [],
                },
                current_projector: null,
                loading: false,
                person: {
                    loading: false,
                    list: [],
                },
            };
        },
        components: {
            VueRoom,
            VuePersonCombobox,
            TiptapVuetify
        },
        watch: {
            user: {
                handler() {
                    if (!this.user.is_admin) {
                        this.rules.organizer = [];
                        this.form.organizer = null;
                        this.form.phone = this.user.phone;
                    }
                    else this.rules.organizer = [
                        v => !!v || 'Organizer is required',
                        v => /.+@.+\..+/.test(v) || 'Organizer must be valid email'
                    ]
                },
                deep: true
            }
        },
        async mounted() {
            this.$refs.form.resetValidation();
            if (!this.user.is_admin) {
                this.rules.organizer = [];
                this.form.organizer = null;
                this.form.phone = this.user.phone;
            }
            else this.rules.organizer = [
                v => !!v || 'Organizer is required',
                v => /.+@.+\..+/.test(v) || 'Organizer must be valid email'
            ];
            if (!this.$session.exists()) this.$session.start();
            if (this.$route.params.event_id && this.$route.params.calendar_id) {
                await this.doGetEvent();
                this.doGetPerson();
                //this.doGetPojector();
            }
            else if (this.$session.has('cart')) {
                let cart = this.$session.get('cart');
                this.schedule = cart.schedule;
                this.room = cart.room;
                this.state_form = cart.state;
                this.current_projector = cart.current_projector;
                if (cart.booking != null)
                    this.form = cart.booking;
                this.doGetPerson();
                //this.doGetPojector();
            }
            else this.$router.push({ name: 'select-room' });
        },
        computed: {
            ...mapState("user", {
                user: (state) => state.user,
            }),
        },
        methods: {
            addBreakLine() {
                this.form.description = this.form.description + '<br>'
            },
            onDelete(){
                if (!this.$refs.form.validate()) return false;
                if(this.state_form == 'RESCHEDULE')
                    this.modalConfirm = true;
                else
                    this.doDelete();
            },
            sendDelete(){
                this.modalConfirm = false;
                this.send_update = true;
                this.doDelete();
            },
            dontSendDelete(){
                this.modalConfirm = false;
                this.send_update = false;
                this.doDelete();
            },
            async doDelete() {
                this.loading_delete = true;
                this.modalDelete = false;
                let payload = {
                    withFollowingEvent: this.withFollowingEvent,
                    callUID: this.form.icall_uid
                }
                if(this.send_update == true)
                    payload = {
                        ...payload,
                        sendUpdate : true
                    };
                await deleteEvent(this.form.calendar_id, this.form.event_id, payload)
                    .then(() => {
                        this.loading_delete = false;
                        this.$notify({
                            title: "Successful",
                            content: "Event already canceled!",
                            color: "rgb(0, 200, 83)",
                        });
                        this.$router.push({ name: `booking` });
                    }).catch((error) => {
                        this.loading_delete = false;
                        errorMessage(error);
                    })
            },
            async doGetEvent() {
                this.loading_detail = true;
                await eventsDetail(this.$route.params.event_id, this.$route.params.calendar_id)
                    .then(response => {
                        this.loading_detail = false;
                        let detail = { ...response.data };
                        let room = detail.rooms;
                        let schedule = {
                            start_date: moment(detail.start).format("YYYY-MM-DD") + "T00:00:00.000Z",
                            start_time: moment(detail.start).format("HH:mm"),
                            end_time: moment(detail.end).format("HH:mm"),
                            is_repetition: false,
                            type_repetition: null,
                            end_of_repetition: null,
                            full_day: (moment(detail.start).format("HH:mm") == '08:00' && moment(detail.end).format("HH:mm") == '17:00'),
                            repetition_day: []
                        };
                        this.schedule = schedule;
                        this.room = room;
                        this.state_form = 'RESCHEDULE';
                        this.form = {
                            title: detail.title,
                            organizer: detail.organizer.email,
                            organizer_name: detail.organizer.display_name,
                            phone: detail.organizer.phone,
                            description: detail.description,
                            attendees: detail.attendees.map(a => a.email),
                            additional_projector: detail.additional_projector?.email,
                            calendar_id: detail.calendar_id,
                            event_id: detail.id,
                            icall_uid: detail.icall_uid,
                            is_repetition: detail.is_repetition
                        };
                        this.current_projector = detail.additional_projector;

                    })
                    .catch(error => {
                        this.loading_detail = false
                        errorMessage(error);
                    })
            },
            doGetPerson() {
                this.person.loading = true;
                getPerson()
                    .then(response => {
                        this.person.loading = false;
                        this.person.list = response.data;
                    })
                    .catch(error => {
                        this.person.loading = false
                        errorMessage(error);
                    })
            },
            onChangeOrganizer() {
                let result = this.person.list.find(obj => {
                    return obj.email === this.form.organizer;
                });
                this.form.organizer_name = typeof result == 'undefined' ? this.form.organizer : result.display_name;
                this.form.phone = typeof result == 'undefined' ? null : result.phone;
            },
            toFormSubmit,
            //doGetPojector() {
            //    let payload = this.toFormSubmit(this.schedule);
            //    this.projector.loading = true;
            //    availableProjector(payload)
            //        .then(response => {
            //            this.projector.loading = false;
            //            this.projector.list = response.data;
            //            if (this.state_form == 'RESCHEDULE' && this.current_projector != null)
            //                this.projector.list.push(this.current_projector);
            //        })
            //        .catch(error => {
            //            this.projector.loading = false
            //            errorMessage(error);
            //        })
            //},
            onChangeRoom() {
                this.$session.set('cart', {
                    room: this.room,
                    schedule: this.schedule,
                    state: this.state_form,
                    current_projector: this.current_projector,
                    booking: this.form
                });
                this.$router.push({ name: 'select-room' });
            },
            onSubmit(){
                if (!this.$refs.form.validate()) return false;
                if(this.state_form == 'RESCHEDULE')
                    this.modalConfirm = true;
                else
                    this.doSubmit();
            },
            sendNotif(){
                this.modalConfirm = false;
                this.send_update = true;
                this.doSubmit();
            },
            dontSendNotif(){
                this.modalConfirm = false;
                this.send_update = false;
                this.doSubmit();
            },
            doSubmit() {
                this.loading = true;
                let payload = this.toFormSubmit(this.schedule);
                let person_list = this.person.list;
                let attendees = this.form.attendees.map(function (item) {
                    let person = person_list.find(obj => {
                        return obj.email == item;
                    });
                    return { email: item, display_name: typeof person == 'undefined' ? item : person.display_name };
                })
                let rooms = [...this.room.email];
                payload = {
                    ...payload,
                    service_id: this.room.service_id,
                    title: this.form.title,
                    description: this.form.description == null ? null : this.form.description.replace(/<p><\/p>/g, '<br/>'),
                    phone: this.form.phone,
                    location: this.room.building.name + (this.room.floor_name == 'All' ? '' : (' ' + this.room.floor_name)) + ' ' + this.room.building.address,
                    organizer_email: this.form.organizer,
                    organizer_name: this.form.organizer_name,
                    attendees: attendees,
                    rooms: rooms,
                    additional_projector: this.form.additional_projector
                };
                if (this.state_form == 'RESCHEDULE') {
                    if(this.send_update == true)
                        payload = {
                            ...payload,
                            send_update : true
                        };
                    this.onUpdate(payload);
                }
                else this.onCreate(payload);
            },
            onUpdate(payload) {
                payload = {
                    ...payload,
                    event_id: this.form.event_id,
                    calendar_id: this.form.calendar_id
                };
                updateEvent(payload)
                    .then(() => {
                        this.onSucceed();
                    })
                    .catch(error => {
                        this.loading = false;
                        errorMessage(error);
                    })
            },
            onCreate(payload) {
                createEvent(payload)
                    .then(() => {
                        this.onSucceed();
                    })
                    .catch(error => {
                        this.loading = false;
                        errorMessage(error);
                    })
            },
            onSucceed() {
                this.loading = false;
                this.$notify({
                    title: "Success",
                    content: "Data has been saved successfully",
                    color: "rgb(0, 200, 83)",
                });
                this.$session.remove("chart");
                this.$session.destroy();
                this.$router.push({ name: `booking` });
            },
            onBack() {
                this.$router.push({ name: `booking` });
            }
        }
    };
</script>
