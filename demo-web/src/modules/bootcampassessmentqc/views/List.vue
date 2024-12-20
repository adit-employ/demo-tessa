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
                        <template v-slot:[`item.is_default`]="{ item }">
                            <v-icon v-if="item.is_default==true" color="green" size="20">
                                mdi-check-circle-outline
                            </v-icon>
                            <v-icon v-if="item.is_default==false" color="red" size="20">
                                mdi-close-circle-outline
                            </v-icon>
                        </template>
                        <template v-slot:[`item.bootcampStatus`]="{ item }">
                            <div>{{  source_master_status.find(({ status }) => status === item.bootcampStatus).title  }}</div>
                        </template>
                        <template v-slot:[`item.students`]="{ item }">
                            <div v-if="item.students!= undefined">{{ item.students.filter(x => x.recordStatus == 'Active').length }}</div>
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon v-on="on" @click="$router.push({ name: 'detail-bootcampassessmentqc', params: { id: item.id } })">
                                        <v-icon>mdi mdi-file-document-arrow-right</v-icon>
                                    </v-btn>
                                </template>
                                <span>Detail Assessment QC</span>
                            </v-tooltip>
                        </template>
        </v-data-table>
    </v-card>
</template>

<script>
    // Services
    import { getBootcampAssessmentQCAll } from "@/services/bootcampassessmentqc.js";
    import { getSourceStatusBootcamp } from "@/services/bootcamp";

    //Utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";
    import moment from 'moment';

    export default {
        name: "VueListBootcampAssessmentQC",
        data() {
            return {
                search: null,
                loading: true,                
                headers: [
                    { text: 'Batch', value: 'batch', sortable: true},
                    { text: 'Technology', value: 'technology.name', sortable: true},
                    { text: 'Location', value: 'location.name', sortable: true},
                    { text: 'Students', value: `students`, sortable: true, align: "center"},
                    { text: 'Periode', value: 'periode_str', sortable: true},
                    { text: 'Bootcamp Status', value: 'bootcampStatus', sortable: true},
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
            this.doGetData()
        },
        methods: {
            formatDate,
            periodeDateFormat(start, end) {
                return moment.utc(start).local().format('DD MMM YYYY') + " - " + moment.utc(end).local().format('DD MMM YYYY');
            },
            doGetData() {
                this.loading = true
                getBootcampAssessmentQCAll(JSON.parse(localStorage.getItem("user")).id)//userId
                    .then(response => {   
                        
                        // console.log('list qc : ', response);
                        // let filteredUsers = response.items[2].students.filter(item => item.recordStatus == 'Active').length;
                        // console.log('list qc filter : ',filteredUsers);


                        this.loading = false
                        this.list_data.data = response.items.map(a => ({
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
                })
                .catch(error => {
                    errorMessage(error);
                    this.events.loading = false;
                });
            }, 
        },
    };
</script>