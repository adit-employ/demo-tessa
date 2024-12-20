<template>
    <v-row>
        <v-col cols="12">
            <v-row v-if="loading">
                <v-col cols="12" md="4" sm="6">
                    <v-card>
                        <v-skeleton-loader type="list-item-avatar, divider, list-item-three-line, divider, actions"></v-skeleton-loader>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" sm="6" class="d-none d-sm-block">
                    <v-card>
                        <v-skeleton-loader type="list-item-avatar, divider, list-item-three-line, divider, actions"></v-skeleton-loader>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" sm="6" class="d-none d-md-block">
                    <v-card>
                        <v-skeleton-loader type="list-item-avatar, divider, list-item-three-line, divider, actions"></v-skeleton-loader>
                    </v-card>
                </v-col>
            </v-row>
            <v-data-iterator :items="rooms"
                             :items-per-page.sync="pageSize"
                             :page.sync="page"
                             :sort-by="sortBy != null ? sortBy.toLowerCase().replace(' ', '.') : null"
                             :sort-desc="sortDesc"
                             hide-default-footer v-if="items.length > 0">
                <template v-slot:header>
                    <v-toolbar color="grey lighten-3"
                               class="mb-3"
                               flat>
                        <v-row class="mr-3">
                            <v-col cols="12" sm="4">
                                <v-text-field v-model="search"
                                              clearable
                                              flat
                                              solo
                                              dense
                                              @input="changeBuilding()"
                                              hide-details
                                              prepend-inner-icon="mdi-magnify"
                                              label="Search"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" class="d-none d-sm-block">
                                <v-select v-model="selected_building"
                                          :items="building.list"
                                          :disabled="building.loading"
                                          v-on:change="changeBuilding"
                                          hide-details
                                          flat
                                          solo
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
                            <v-col cols="12" sm="4" class="d-none d-sm-block">
                                <v-select v-model="sortBy"
                                          flat
                                          solo
                                          dense
                                          clearable
                                          hide-details
                                          :items="sortByArray"
                                          prepend-inner-icon="mdi-sort-alphabetical-variant"
                                          label="Sort by"></v-select>
                            </v-col>
                        </v-row>
                        <template>
                            <v-btn-toggle v-model="sortDesc" dense dark
                                          mandatory>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on"
                                               depressed 
                                               color="primary"
                                               :value="false">
                                            <v-icon>mdi-arrow-up</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Sort Ascending</span>
                                </v-tooltip>
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on"
                                               depressed 
                                               color="primary"
                                               :value="true">
                                            <v-icon>mdi-arrow-down</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Sort Descending</span>
                                </v-tooltip>
                            </v-btn-toggle>
                        </template>
                    </v-toolbar>
                </template>
                <template v-slot:default="props">
                    <v-row>
                        <v-col v-for="(item, index) in props.items"
                               :key="index"
                               cols="12"
                               md="4"
                               sm="6">
                            <vue-room :room="item" @bookRoom="bookRoom(item)" />
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:footer>
                    <v-row class="mt-2 v-data-footer"
                           align="center"
                           justify="center">
                        <v-col cols="12" align="right">
                            <span class="mr-4">
                                {{ ((page - 1) * pageSize) + 1 }} - {{page * pageSize > rooms.length ? rooms.length : page * pageSize}} of {{ rooms.length }}
                            </span>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn v-on="on"
                                           icon
                                           :disabled="page == 1"
                                           color="black"
                                           @click="formerPage">
                                        <v-icon>mdi-chevron-left</v-icon>
                                    </v-btn>
                                </template>
                                <span>Prev Page</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn v-on="on"
                                           icon
                                           :disabled="page == numberOfPages"
                                           class="ml-3"
                                           color="black"
                                           @click="nextPage">
                                        <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </template>
                                <span>Next Page</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-col>
    </v-row>
</template>

<script>
    import VueRoom from "./Room";
    export default {
        name: "VueRoomList",
        data: () => ({
            rooms: [],
            selected_building: '',
            search: '',
            sortDesc: false,
            sortBy: 'name',
            sortByArray: ["Name", "Building Name", "Capacity", "Type"],
            page: 1,
        }),
        components: {
            VueRoom
        },
        watch: {
            items() {
                this.rooms = this.items;
                this.selected_building = "";
                this.search="";
                this.sortBy="";
            }            
        },
        mounted() {
            this.rooms = this.items;            
        },
        computed: {
            pageSize() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return 5
                    case 'sm': return 8
                    case 'md': return 9
                    case 'lg': return 9
                    case 'xl': return 9
                    default: return 9
                }
            },
            numberOfPages() {
                return Math.ceil(this.rooms.length / this.pageSize);
            },
        },
        props: {
            items: {
                type: Array,
                default: () => [],
            },
            schedule: {
                type: Object,
                default: () => { },
            },
            booking: {
                type: Object,
                default: () => { },
            },
            state_form: {
                type: String,
                default: 'CREATE',
            },
            loading: {
                type: Boolean,
                default: false,
            },
            building: {
                type:Object,
                default: () => {},
            }
        },
        methods: {
            nextPage() {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage() {
                if (this.page - 1 >= 1) this.page -= 1
            },
            bookRoom(room) {
                let booking = {
                    room: room,
                    schedule: this.schedule,
                    state: this.state_form,
                    current_projector: null,
                    booking: this.booking,
                }
                this.$session.set('cart', booking);
                this.$router.push({ name: 'booking-form' });
            },
            changeBuilding() {
                this.rooms = this.items;
                console.log(this.selected_building);
                if (this.selected_building != null && this.selected_building != '') {
                    let building_id = this.selected_building.split('|')[0];
                    let floor = this.selected_building.split('|')[1];
                    this.rooms = this.rooms.filter(item => item.building.id === building_id && item.floor_name == floor);
                }
                if (this.search != null && this.search != '')
                    this.rooms = this.rooms.filter(item =>
                        item.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                        item.type.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 ||
                        ((item.capacity - 2) <= this.search && (item.capacity + 2) >= this.search));
            }
        }
    };
</script>
