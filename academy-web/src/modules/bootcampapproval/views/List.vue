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
                      :items-per-page="5"
                      :sort-by="['is_default']"
                      :sort-desc="['true']"
                      :loading="loading"
                      :footer-props="{'items-per-page-options':[10, 25, 50]}"
                      class="elevation-1">
                        <template v-slot:[`item.bootcampStatus`]="{ item }">
                            <div>{{  source_master_status.find(({ status }) => status === item.bootcampStatus).title  }}</div>
                        </template>
                        <template v-slot:[`item.students`]="{ item }">
                            <div v-if="item.students!= undefined">{{ item.students.filter(x => x.recordStatus == 'Active').length }}</div>
                            <div v-else>0</div>
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon v-on="on" @click="$router.push({ name: 'update-bootcampapproval', params: { id: item.id } })">
                                        <v-icon>mdi mdi-file-document-arrow-right</v-icon>
                                    </v-btn>
                                </template>
                                <span>Bootcamp Approval</span>
                            </v-tooltip>
                        </template>
        </v-data-table>
    </v-card>
</template>

<script>
    // Services
    import { getBootcampApprovalAll } from "@/services/bootcampapproval.js";
    import { getSourceStatusBootcamp } from "@/services/bootcamp";

    //Utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";
    import moment from 'moment';

    export default {
        name: "VueListBootcampApproval",
        data() {
            return {
                search: null,
                loading: true,                
                headers: [
                    { text: 'Batch', value: 'batch', sortable: true},
                    { text: 'Technology', value: 'technology.name', sortable: true},
                    { text: 'Location', value: 'location.name', sortable: true},
                    { text: 'Students', value: 'students', sortable: true, align: "center"},
                    { text: 'Periode', value: 'periode_str', sortable: true},
                    { text: 'Bootcamp Status', value: 'bootcampStatus', sortable: true},
                    { text: 'Status', value: 'recordStatus', sortable: true, align: "center"},
                    { text: 'Action', value: 'action', sortable: false, align: "center"},
                ],
                list_data: {
                    data: [],                    
                },
                source_master_status: [],
            }
        },
        mounted() {
            this.doGetListStatusBootcamp();
            this.doGetData();
        },
        methods: {
            formatDate,
            periodeDateFormat(start, end) {
                return moment.utc(start).local().format('DD MMM YYYY') + " - " + moment.utc(end).local().format('DD MMM YYYY');
            },
            doGetData() {
                this.loading = true
                getBootcampApprovalAll(JSON.parse(localStorage.getItem("user")).id)//userId
                    .then(response => {   
                        this.loading = false
                        this.list_data.data = response.items.filter(x => x.bootcampStatus == 'Approval').map(a => ({
                            ...a,
                            periode_str: this.periodeDateFormat(a.periode.startDate, a.periode.endDate)
                        }));
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
            },
            doRefreshData(){
                this.list_data.data=[];
                this.doGetData();
            },
            backHomeMaster() {
                this.$router.push({
                    name: "master"
                });
            },
            async doGetListStatusBootcamp(){
                getSourceStatusBootcamp()
                    .then(responseMaster => {
                        this.source_master_status = responseMaster;
                        // console.log('Detail => this.source_master_status : ', this.source_master_status);
                    })
                    .catch(error => {
                        errorMessage(error);
                        this.events.loading = false;
                    });
            },  
        },
    };
</script>
@/services/bootcampapproval.js