<template>
    <v-card-title class="pt-4 pb-3">
        <v-row>
            <v-col cols="12" md="6">
                <v-btn outlined color="primary" @click="setToday" small :disabled="disabled">
                    Today
                </v-btn>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click="prev" :disabled="disable_prev || disabled">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                    </template>
                    <span>Previous Day</span>
                </v-tooltip>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click="next" :disabled="disabled">
                            <v-icon>mdi-chevron-right</v-icon>
                        </v-btn>
                    </template>
                    <span>Next Day</span>
                </v-tooltip>
                <v-dialog ref="dialog"
                          v-model="modal"
                          :disabled="disabled"
                          width="290px">
                    <template v-slot:activator="{ on }">
                        <v-btn icon :disabled="disabled" class="mr-3" v-on="on">
                            <v-icon>mdi-calendar</v-icon>
                        </v-btn>
                    </template>
                    <v-date-picker v-model="selected_date"
                                   scrollable
                                   :min="minDate"
                                   @input="modal = false">
                        <v-spacer></v-spacer>
                        <v-btn text
                               color="primary"
                               @click="modal = false">
                            Cancel
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
                <label>{{title_label}}</label>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-select v-model="selected_room_type"
                          :items="room_type_list"
                          :disabled="room_type_loading || disabled"
                          hide-details
                          dense
                          clearable
                          label="Select Room Type">
                </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-select v-model="selected_building"
                          :items="building.list"
                          :disabled="building.loading || disabled"
                          hide-details
                          dense
                          clearable
                          item-text="name"
                          item-value="id"
                          label="Select Building">
                    <template v-slot:selection="data">
                        <div class="v-select__selection v-select__selection--comma">{{ data.item.name }} - {{data.item.floor_name}}</div>
                    </template>
                    <template v-slot:item="data">
                        <v-list-item-avatar color="orange">
                            {{ data.item.name.substr(0,1) }}
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-html="data.item.name"></v-list-item-title>
                            <v-list-item-subtitle v-html="data.item.floor_name"></v-list-item-subtitle>
                        </v-list-item-content>
                    </template>
                </v-select>
            </v-col>
        </v-row>
    </v-card-title>
</template>

<script>
    import { allBuilding } from '@/services/buildings';
    import errorMessage from "@/utils/notify-error";
    import moment from 'moment';
    export default {
        name: "VueCalendarTitle",
        props: {
            date: {
                type: String,
                default: null,
            },
            room_type_list: {
                type: Array,
                default: () => [],
            },
            room_type_loading: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            building_selected: {
                type: [String, Object],
                default: null,
            },
        },
        data() {
            return {
                minDate: moment().startOf('day').format('yyyy-MM-DD'),
                selected_building: {},
                modal: false,
                selected_date: '',
                selected_room_type: null,
                building: {
                    loading: false,
                    list: []
                },
            };
        },
        watch: {
            selected_date() {
                this.$emit('update:date_start', this.selected_date)
            },
            selected_building() {
                let selected = {
                    ...this.building.list.find(obj => {
                        return obj.id === this.selected_building;
                    })
                };
                if (Object.keys(selected).length > 0)
                    selected.id = selected.id.split('|')[0];
                this.$emit('update:building_selected', selected);
                this.$emit("changeBuilding");
            },
            selected_room_type() {
                this.$emit('update:selected_room_type', this.selected_room_type);
                this.$emit("changeRoomType");
            }
        },
        computed: {
            title_label() {
                let date_moment = this.date == null || this.date == '' ? moment().startOf('day') : moment(this.date);
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return date_moment.format('DD MMM yyyy')
                    case 'sm': return date_moment.format('DD MMMM yyyy')
                    case 'md': return date_moment.format('dddd, DD MMMM yyyy')
                    case 'lg': return date_moment.format('dddd, DD MMMM yyyy')
                    case 'xl': return date_moment.format('dddd, DD MMMM yyyy')
                    default: return date_moment.format('dddd, DD MMMM yyyy')
                }
            },
            disable_prev() {
                let date_moment = this.date == null || this.date == '' ? moment().startOf('day') : moment(this.date);
                return date_moment.isSameOrBefore(moment().startOf('day'));
            }
        },
        mounted() {
            this.getBuilding();
        },
        methods: {
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
            },
            next() {
                this.$emit("next");
            },
            prev() {
                this.$emit("prev");
            },
            setToday() {
                this.$emit("setToday");
            }
        }
    };
</script>
