<template>
    <div>
        <vue-form-find-room :schedule="form"
                            @change="onFormChange()"
                            @findRoom="getRoom()"
                            :useGoBack="use_go_back"
                            :state_form="state_form"
                            @goBack="$router.push({name:'booking-form'})" />
        <vue-room-list :items="room_list"
                       :loading="loading"
                       :schedule="form"
                       :state_form="state_form"
                       :booking="form_booking"
                       :building="building" />
    </div>

</template>

<script>
    import VueRoomList from "./RoomList";
    import VueFormFindRoom from "./FormFindRoom";
    import errorMessage from "@/utils/notify-error";
    import { toFormSubmit } from "@/utils/form-parser";
    import { availableRoom } from "@/services/resources.js";
    import { allBuilding } from '@/services/buildings';
    import moment from 'moment';
    export default {
        name: "VueSelectRoom",
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
                form_booking: null,
                room: null,
                loading: false,
                room_list: [],
                building: {
                    loading: false,
                    list: []
                },
                prev_route: null,
                use_go_back: false,
                state_form: 'CREATE'
            };
        },
        components: {
            VueRoomList,
            VueFormFindRoom
        },
        watch: {
            form: {
                handler() {
                    this.room_list = [];
                },
                deep: true
            }
        },
        mounted() {
            if (!this.$session.exists()) this.$session.start();
            
            this.getBuilding();
            if (this.$session.has('cart')) {
                let cart = this.$session.get('cart');
                cart.schedule.start_date = moment(cart.schedule.start_date);
                cart.schedule.end_of_repetition = moment(cart.schedule.end_of_repetition);
                this.form = cart.schedule;
                this.use_go_back = (cart.room != null);
                this.state_form = cart.state;
                this.form_booking = cart.booking;
                this.getRoom();
            }
        },
        methods: {
            onFormChange() {
                this.room_list = [];
            },
            toFormSubmit,
            getRoom() {
                this.room_list = [];
                this.loading = true;
                let payload = this.toFormSubmit(this.form);
                if (this.state_form == 'RESCHEDULE') {
                    if (this.$session.has('cart')) {
                        let cart = this.$session.get('cart');
                        payload.event_id = cart.booking?.event_id;
                        payload.calendar_id = cart.booking?.calendar_id;
                    }
                }

                availableRoom(payload)
                    .then(response => {
                        this.loading = false;
                        this.room_list = response.data;
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
            },
            getBuilding() {
                this.building.loading = true;
                allBuilding()
                    .then(response => {
                        this.building.loading = false
                        this.building.list = response.data.map((a) => {
                            return {
                                id: a.id + '|' + a.floor_name,
                                name: a.name,
                                address: a.address,
                                floor_name: a.floor_name,
                            }
                        });
                    })
                    .catch(error => {
                        this.building.loading = false
                        errorMessage(error);
                    })
            }
        }
    };
</script>
