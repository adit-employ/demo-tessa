<template>
    <v-card>
        <v-card-title>
            <v-text-field v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          class="no-top"
                          hide-details>
            </v-text-field>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on"
                        depressed
                        color="primary"
                        class="white--text small ml-2"
                        @click="openAddForm"
                        fab>
                        <v-icon dark>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                </template>
                <span>Add Connecting Room</span>
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
        </v-card-title>
        <v-data-table :headers="headers"
                      :items="list_data.data"
                      :search="search"
                      :loading="loading"
                      :items-per-page="5"
                      :footer-props="{'items-per-page-options':[10, 25, 50]}"
                      class="elevation-1">
                        <template v-slot:[`item.updated_by`]="{ item }">
                            <div>{{item.updated_by}}</div>
                            <small class="text-muted">{{formatDate(item.updated_at,'fromnow')}}</small>
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon v-on="on" @click="$router.push({ name: 'update-connecting-room', params: { id: item.id } })">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Edit Connecting Room</span>
                            </v-tooltip>
                        </template>
        </v-data-table>
    </v-card>
</template>

<script>
    // Services
    import { getConnectingRoomList } from "@/services/connectingroom.js";

    //Utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";

    export default {
        name: "VueListConnectingRoom",
        data() {
            return {
                search: null,
                showModal: false,
                loading: true,                
                headers: [
                    { text: 'Name', value: 'name', sortable: true },
                    { text: 'Updated By', value: 'updated_by', sortable: true },              
                    { text: 'Action', value: 'action', sortable: false },
                ],
                list_data: {
                    data: [],                    
                }
            }
        },
        mounted() {
            this.doGetData()
        },
        methods:{
            formatDate,
            doGetData() {
                this.loading = true
                getConnectingRoomList()
                    .then(response => {        
                        console.log(response.data)                
                        this.loading = false
                        this.list_data.data = response.data
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
            },
            openAddForm() {
                this.$router.push({
                    name: "create-connecting-room"
                });
            },
            doRefreshData() {
                this.list_data.data = [];
                this.doGetData();
            }           
        },
    };
</script>