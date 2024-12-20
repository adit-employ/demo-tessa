<template>
    <div>
        <v-card>
            <v-card-title>
                <v-text-field v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            class="no-top"
                            hide-details>
                </v-text-field>
                <v-tooltip bottom v-if="module_access != null && module_access.isCreate">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on"
                            depressed
                            color="primary"
                            class="white--text small ml-2"
                            @click="openAddForm"
                            fab>
                                <v-icon dark>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                    <span>Add Bootcamp</span>
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
                                <v-icon dark>mdi-cached</v-icon>
                            </v-btn>
                        </template>
                    <span>Refresh</span>
                </v-tooltip>
                <v-tooltip bottom v-if="module_access != null && module_access.isReport">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on"
                            icon
                            outlined
                            color="primary"
                            class="white--text small ml-2"
                            @click="openModalBootcampOngoing()"
                            fab>
                                <v-icon dark>mdi mdi-email-fast-outline</v-icon>
                            </v-btn>
                        </template>
                    <span>Report</span>
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
                        class="elevation-1"
                        v-model="selected"
                        show-select >
                            <template v-slot:[`item.bootcampStatus`]="{ item }">
                                <div v-if="item.bootcampStatus === 'Created' && (item.approver != null && item.approver.status === 'NeedAdjustment')">Need Adjusment</div>
                                <div v-else>{{  source_master_status.find(({ status }) => status === item.bootcampStatus).title  }}</div>
                            </template>
                            <template v-slot:[`item.periode.startDate`]="{ item }">
                                <div>{{formatDate(item.periode.startDate,'date')}}</div>
                            </template>
                            <template v-slot:[`item.students`]="{ item }">
                                <div v-if="item.students!= undefined">{{ item.students.filter(x => x.recordStatus == 'Active').length }}</div>
                                <div v-else>0</div>
                            </template>
                            <template v-slot:[`item.action`]="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon v-on="on" @click="openDetailForm(item.id)">
                                            <v-icon>mdi mdi-file-document-arrow-right</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Detail Bootcamp</span>
                                </v-tooltip>
                                <template v-if="item.students != undefined && item.students.filter(x => x.recordStatus == 'Active').length > 0 && module_access.isEdit">
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on }">
                                            <v-btn icon v-on="on" @click="openLaptopForm(item.id)">
                                                <v-icon>mdi mdi-laptop-account</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Detail Mapping Laptop Bootcamp</span>
                                    </v-tooltip>
                                </template>
                                
                                
                            </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="modalStatus" max-width="700" persistent >
            <v-card >
                <v-toolbar class="mb-1" color="primary" dark >Ongoing Bootcamp Schedule</v-toolbar>

                <div id="card-bootcamp-report">
                    <div v-for="item in selected" :key="item.id" >
                        <v-card-text class="text-md-body-1" v-if="item.dateDetails != undefined">
                            <v-row>
                                <v-col cols="12" sm="12" >
                                    <v-simple-table dense class="grey--text">
                                        <template v-slot:default>
                                        <thead >
                                            <tr style="background-color:#04AA6D;">
                                                <th colspan="2">{{ item.technology.name }}&emsp;-&emsp;Batch&emsp;{{ item.batch }}&emsp;-&emsp;{{ item.trainer.name }}&emsp;-&emsp;{{ item.location.name }}</th>
                                            </tr>
                                            <tr style="background-color:#96D4D4;">
                                                <th class="text-left">Description</th>
                                                <th class="text-left">Periode</th>
                                            </tr>
                                        </thead> 
                                        <tbody>
                                            <tr v-for="x in item.dateDetails" :key="x.phase">
                                                <td><small> {{ source_master_dates.find(a => a.phase == x.phase).title }} </small></td>
                                                <td><small> {{formatDate(x.startDate,'date')}} - {{formatDate(x.endDate,'date')}} </small></td>
                                            </tr>
                                        </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <br>
                    </div>
                </div>
                
                <v-divider />
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" outlined @click="modalStatus = false">Cancel </v-btn>
                    <v-btn color="primary" @click="sendBootcampUpdateReport()" >Send</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

    </div>
    
</template>

<script>
    // Services
    import { getBootcampAll, getSourceDateDetails, getSourceStatusBootcamp } from "@/services/bootcamp";
    import { getEmailByType } from "@/services/email.js";
    import { sendEmail } from "@/services/emailsend";

    //Utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";
    import moment from 'moment';

    export default {
        name: "VueListBootcamp",
        data() {
            return {
                search: null,
                loading: true,                
                headers: [
                    { text: 'Batch', value: 'batch', sortable: true},
                    { text: 'Technology', value: 'technology.name', sortable: true},
                    { text: 'Location', value: 'location.name', sortable: true},
                    { text: 'Students', value: "students", sortable: true, align: "center"},
                    { text: 'Periode', value: 'periode_str', sortable: true},
                    { text: 'Bootcamp Status', value: 'bootcampStatus', sortable: true},
                    { text: 'Status', value: 'recordStatus', sortable: true, align: "center"},
                    { text: 'Action', value: 'action', sortable: false, align: "left"},
                ],
                list_data: {
                    data: [],                    
                },
                source_master_dates: [],
                selected: [],
                module_access: JSON.parse(localStorage.getItem("user")).modulsOrigin.find(item => item.title == "Data"),
                modalStatus: false,
                dataSendMail: {
                    emailTo: null,
                    subject: 'Bootcamp Schedule Updates !!',
                    body: null
                },
                source_master_status: [],
            }
        },
        mounted() {
            this.doGetListStatusBootcamp();
            this.doGetData();
            this.doGetListMasterDate();
            localStorage.removeItem("sendnotif");
        },
        methods: {
            formatDate,
            periodeDateFormat(start, end) {
                return moment.utc(start).local().format('DD MMM YYYY') + " - " + moment.utc(end).local().format('DD MMM YYYY');
            },
            doGetData() {
                this.loading = true

                getBootcampAll()
                .then(response => {

                    this.loading = false
                    this.list_data.data = response.items.map(a => ({
                        ...a,
                        periode_str: this.periodeDateFormat(a.periode.startDate, a.periode.endDate)
                    }));

                    console.log('this.list_data.data : ', this.list_data.data);
                })
                .catch(error => {
                    this.loading = false
                    errorMessage(error);
                    console.log("terjadi error = ", error)
                })
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
            doRefreshData(){
                this.list_data.data = [];
                this.doGetData();
            },
            openModalBootcampOngoing(){
                let isHasDate = false;

                // let mailToList = [];
                this.selected.forEach(a => { 
                    if(a.dateDetails != undefined) {isHasDate = true;}
                 });

                if(isHasDate){
                    getEmailByType('Report')
                    .then(response => {        
                        this.dataSendMail.emailTo = response.items.map(item => {
                            return item.email;
                        });
                        console.log('list => this.dataSendMail.emailTo : ', this.dataSendMail.emailTo);
                        console.log('list => selected : ', this.selected);
                        console.log('list => source_master_dates : ', this.source_master_dates);
                        this.modalStatus = true
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
                }
                isHasDate = false;
            },
            async doGetListMasterDate(){
                getSourceDateDetails()
                .then(responseMaster => {
                    this.source_master_dates = responseMaster.map(item => {
                            const user = {};
                            user['phase'] = item.phase;
                            user['title'] =  item.title;
                            user['startDate'] =  item.startDate;
                            user['endDate'] =  item.endDate;
                            return user;
                        });
                    // this.source_master_dates = responseMaster;
                })
                .catch(error => {
                    errorMessage(error);
                    this.events.loading = false;
                });
            },
            
            
            openAddForm() {
                this.$router.push({
                    name: "create-bootcamp"
                });
            },
            openDetailForm(id) {
                this.$router.push({
                    name: "detail-bootcamp",
                    params: { id: id }
                });
            },
            openLaptopForm(id) {
                this.$router.push({
                    name: "detail-laptop-bootcamp",
                    params: { id: id }
                });
            },
            sendBootcampUpdateReport(){
                let mailOpeningGreetings = 'Dear All, <br>Berikut Update Jadwal Bootcamp yang sedang berjalan : <br><br>'
                let mailCloseGreetings = '<br>Thank You<br>* This email is sent through the system. Do not reply to this email.<br>'
                let mailTableBootcamp = document.getElementById("card-bootcamp-report").outerHTML;

                this.dataSendMail.body = mailOpeningGreetings.concat( mailTableBootcamp, mailCloseGreetings);
                console.log('this.dataSendMail.body : ', this.dataSendMail.body);
                
                sendEmail(this.dataSendMail)
                .then(() => {
                    this.modalStatus = false;
                    this.$notify({
                        title: "Successful",
                        content: "Successfully sent the email!",
                        color: "rgb(0, 200, 83)",
                    });
                }).catch((error) => {
                    errorMessage(error);
                })


            }

        },
    };
</script>