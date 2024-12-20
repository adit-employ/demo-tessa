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
                <span>Add Service Account</span>
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
                      :items="list_data"
                      :search="search"
                      :items-per-page="5"
                      :loading="loading"
                      :footer-props="{'items-per-page-options':[10, 25, 50]}"
                      class="elevation-1">
                        <template v-slot:[`item.updated_by`]="{ item }">
                            <div>{{item.updated_by}}</div>
                            <small class="text-muted">{{formatDate(item.updated_at,'fromnow')}}</small>
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon v-on="on" @click="$router.push({ name: 'update-service-account', params: { id: item.id } })">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Edit Service Account</span>
                            </v-tooltip>
                        </template>
        </v-data-table>
    </v-card>
</template>

<script>
    // Services
    import { getServiceAccountList } from "@/services/serviceaccount.js";
    
    //Utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";
    
    export default {
        name: "VueListServiceAccount",
        data() {
            return {
                search: null,
                loading: true,             
                headers: [
                    { text: 'Domain Code', value: 'domain_code', width: "130px", sortable: true },
                    { text: 'Access Email', value: 'access_email', sortable: true },
                    { text: 'Customer Code', value: 'customer_code', width: "140px" },
                    { text: 'Client Email', value: 'client_email', sortable: true },
                    { text: 'Updated By', value: 'updated_by', sortable: true},
                    { text: 'Action', value: 'action', sortable: false },
                ],
                list_data: [],
            }
        },
        mounted() {
            this.doGetData()
        },
        methods: {
            formatDate,
            doGetData() {
                this.loading = true
                getServiceAccountList()
                    .then(response => {           
                        this.loading = false
                        this.list_data = response.data
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
            },
            openAddForm() {
                this.$router.push({
                    name: "create-service-account"
                });
            },
            doRefreshData(){
                this.list_data.data=[];
                this.doGetData();
            }            
        },
    };
</script>
