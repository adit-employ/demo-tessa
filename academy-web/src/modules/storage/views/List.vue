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
                <span>Add Storage</span>
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
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on"
                        icon
                        outlined
                        color="primary"
                        class="white--text small ml-2"
                        @click="backHomeMaster"
                        fab>
                            <v-icon dark>mdi mdi-arrow-left</v-icon>
                        </v-btn>
                    </template>
                <span>Back to home master</span>
            </v-tooltip>
        </v-card-title>
        <v-data-table :headers="headers"
                      :items="list_data.data"
                      :search="search"
                      :items-per-page="5"
                      :sort-by="['is_default']"
                      :sort-desc="['true']"
                      :loading="loading"
                      :footer-props="{'items-per-page-options':[10, 25, 50]}"
                      class="elevation-1">
                        <template v-slot:[`item.is_default`]="{ item }">
                            <v-icon v-if="item.is_default==true" color="green" size="20">
                                mdi-check-circle-outline
                            </v-icon>
                            <v-icon v-if="item.is_default==false" color="red" size="20">
                                mdi-close-circle-outline
                            </v-icon>
                        </template>
                        <template v-slot:[`item.updated_by`]="{ item }">
                            <div>{{item.updated_by}}</div>
                            <!-- <small class="text-muted">{{formatDate(item.updated_at,'fromnow')}}</small> -->
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon v-on="on" @click="$router.push({ name: 'update-storage', params: { id: item.id } })">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Edit Roles</span>
                            </v-tooltip>
                        </template>
        </v-data-table>
    </v-card>
</template>

<script>
    // Services
    import { getStorageAll } from "@/services/storage.js";

    //Utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";

    export default {
        name: "VueListStorage",
        data() {
            return {
                search: null,
                loading: true,                
                headers: [
                    { text: 'Capacity', value: 'capacity', sortable: true},
                    { text: 'Status', value: 'recordStatus', sortable: true, align: "center"},
                    { text: 'Action', value: 'action', sortable: false, align: "center"},
                ],
                list_data: {
                    data: [],                    
                },
            }
        },
        mounted() {
            this.doGetData()
        },
        methods: {
            formatDate,
            doGetData() {
                this.loading = true
                getStorageAll()
                    .then(response => {        
                        this.loading = false
                        this.list_data.data = response.items
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
            },
            openAddForm() {
                this.$router.push({
                    name: "create-storage"
                });
            },
            doRefreshData(){
                this.list_data.data=[];
                this.doGetData();
            },
            backHomeMaster() {
                this.$router.push({
                    name: "master"
                });
            }          
        },
    };
</script>
@/services/storage.js