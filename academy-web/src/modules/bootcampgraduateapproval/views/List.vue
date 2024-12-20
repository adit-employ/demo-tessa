<template>
    <div>
        <!-- <v-row>
            <v-col cols="12" sm="12">
                <v-card :loading="loading">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="12" class="grey--text font-weight-bold">
                                Filters
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="4" >
                                <v-text-field   
                                                v-model="filters.batch"
                                                label="Batch"
                                                hint="Example : 300"
                                                @keypress="keypressIsNumber($event)"
                                                dense>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4">
                                <v-text-field   v-model="filters.technology"
                                                label="Technology"
                                                dense>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-dialog ref="dialog"
                                            v-model="modal"
                                            :return-value.sync="dates"
                                            persistent
                                            width="290px" >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                                        v-model="dates"
                                                        label="Picker in dialog"
                                                        prepend-inner-icon="mdi-calendar"
                                                        readonly
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        dense ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="dates" scrollable range no-title dense>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false" dense> Cancel </v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(dates)" dense> OK </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>

                        </v-row>

                        <v-row>
                            <v-col cols="12" sm="4">
                                <vue-date-picker 
                                        v-bind="{placeholder: 'End Date *' }"
                                        :disabled="loading"
                                        dense
                                 />
                            </v-col>

                            <v-col cols="12" sm="4">
                                <vue-date-picker-range 
                                        v-model="filters.periode"
                                        v-bind="{placeholder: 'Periode' }"
                                        :disabled="loading"
                                        dense></vue-date-picker-range>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-divider />
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="doRefreshTable()" :disabled="loading">
                                        <v-icon v-if="loading" class="mdi mdi-spin">mdi-loading</v-icon>
                                        {{!loading ? 'Search' : 'Loading'}}
                                    </v-btn>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                        
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row> -->

        



        <v-row>
            <v-col cols="12" sm="12">
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
                                        <div v-if="item.bootcampStatus === 'Created' && (item.approver != null && item.approver.status === 'NeedAdjustment')">Need Adjusment</div>
                                        <div v-else>{{  source_master_status.find(({ status }) => status === item.bootcampStatus).title  }}</div>
                                    </template>
                                    <template v-slot:[`item.action`]="{ item }">
                                        <v-tooltip bottom v-if="item.bootcampStatus == 'ApprovalBOD' || item.bootcampStatus == 'ApprovalBODExtend'">
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon v-on="on" @click="$router.push({ name: 'detail-bootcampgraduateapproval', params: { id: item.id } })">
                                                    <v-icon>mdi mdi-file-document-arrow-right</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Detail Assessment Trainer</span>
                                        </v-tooltip>
                                    </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
    
</template>

<script>
    // Services
    import { getBootcampGraduateApprovalAll } from "@/services/bootcampgraduateapproval.js";
    import { getDetailBootcampAssessmentByBootcampId, getSourceStatusBootcamp } from "@/services/bootcamp";

    //Utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";
    import moment from 'moment';
    import { sendEmailBootcampBastStudent } from "@/services/emailsend";
    import { getEmailByType } from "@/services/email.js";
    // import VueDatePicker from "@/components/form/Datepicker";
    // import VueDatePickerRange from "@/components/form/DatepickerRange.vue";

    export default {
        name: "VueListBootcampGraduateApproval",
        components: {
            // VueDatePicker,
            // VueDatePickerRange,
        },
        data() {
            return {
                search: null,
                loading: true,                
                headers: [
                    { text: 'Batch', value: 'batch'},
                    { text: 'Technology', value: 'technology.name', sortable: true},
                    { text: 'Location', value: 'location.name'},
                    { text: 'Students', value: 'students.length', align: "center"},
                    { text: 'Periode', value: 'periode_str', sortable: true},
                    { text: 'Bootcamp Status', value: 'bootcampStatus'},
                    // { text: 'Status', value: 'recordStatus', sortable: true, align: "center"},
                    { text: 'Action', value: 'action', sortable: false, align: "center"},
                ],
                list_data: {
                    data: [],                    
                },
                dataSendMail: {
                    id: localStorage.getItem("sendnotifBootcampId"),
                    emailTo: null,
                    subject: 'Submission Bootcamp New !!',
                    body: null,
                    updatedBy: JSON.parse(localStorage.getItem("user")).id,
                },
                countStudentGrade: 0,
                filters:{
                    batch: null,
                    technology: null,
                    periode: null,
                },

                // date picker range
                menu: false,
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                dates: ['2019-09-10', '2019-09-20'],
                modal: false,
                // for send mail
                sourceBootcampDetail : {
                },
                source_master_status: [],
            }
        },
        mounted() {
            this.doGetListStatusBootcamp();
            this.doMounted()
        },
        methods: {
            formatDate,
            periodeDateFormat(start, end) {
                return moment.utc(start).local().format('DD MMM YYYY') + " - " + moment.utc(end).local().format('DD MMM YYYY');
            },
            doMounted() {
                this.loading = true
                //getBootcampGraduateApprovalAll(JSON.parse(localStorage.getItem("user")).id) // userId
                this.doGetDataListGraduate();
                this.doGetEmailTo();
                setTimeout(() => {
                    this.doBuilderSendBAST();
                    this.loading = false;
                }, 2000);
            },
            doGetDataListGraduate(){
                getBootcampGraduateApprovalAll() // di BE sdh tdk pakai userId
                .then(response => {  
                    this.list_data.data = response.items.map(a => ({ // TESS
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
                this.doMounted();
            },
            doGetEmailTo(){
                getEmailByType('BAST')
                .then(response => {        
                    this.dataSendMail.emailTo = response.items.map(item => {
                        return item.email;
                    });
                    // console.log('list => this.dataSendMail.emailTo : ', this.dataSendMail.emailTo);
                })
                .catch(error => {
                    this.loading = false
                    errorMessage(error);
                })
            },
            async doGetBootcampDetail(){
                await getDetailBootcampAssessmentByBootcampId(localStorage.getItem("sendnotifBootcampId"))
                .then(response => {
                    this.sourceBootcampDetail = response;
                    console.log('------- 02. GETTING DATA BOOTCAMP SUCCESS', this.sourceBootcampDetail);
                })
                .catch(error => {
                    this.loading = false;
                    errorMessage(error);
                });
            },
            async doSendBAST(){
                await sendEmailBootcampBastStudent(this.dataSendMail)
                .then(() => {
                    this.loading = false;
                }).catch((error) => {
                    errorMessage('send email failed : ',error);
                })
            },
            async doBuilderSendBAST(){
                // console.log('------- BUILDER SEND BAST -------');
                this.loading = true;

                if(("sendnotif", "sendnotifBootcampId" in localStorage) &&
                    localStorage.getItem("sendnotif") === 'true' &&
                    localStorage.getItem("sendnotifBootcampId").length > 0 ){
                    // console.log('------- 01. PASSING LOCAL STORAGE SUCCESS', localStorage.getItem("sendnotif"), localStorage.getItem("sendnotifBootcampId"));
                    
                    // get data bootcamp
                    await this.doGetBootcampDetail();

                    if(this.sourceBootcampDetail != null){
                        // get data student bast
                        const techName = this.sourceBootcampDetail.bootcamp.technology.name;
                        const batch = this.sourceBootcampDetail.bootcamp.batch;
                        const type = this.sourceBootcampDetail.bootcamp.type;
                        const datestart = formatDate( this.sourceBootcampDetail.bootcamp.periode.startDate, 'date' );
                        const dateend = formatDate( this.sourceBootcampDetail.bootcamp.periode.endDate, 'date' );

                        this.dataSendMail.subject = `BAST Bootcamp ${ techName } Batch ${ batch } - ${ type }`
                        this.dataSendMail.body =  `Dear All, <br><br>The following are students who have been approved : 
                                                    <br><br><table  style="border: 1px solid #ddd; border-collapse: collapse; width: 100%;">
                                                    <tr style="background-color: #04AA6D; color: white;">
                                                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Name</th>
                                                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Periode</th>
                                                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Final Score</th>
                                                        <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Grade</th>
                                                    </tr>`;

                        const listStudent = this.sourceBootcampDetail.bootcamp.students.filter( 
                            x => 
                                ( x.isBast == false && x.selections != null && x.selections.some(o => o.title == 'FT2' && o.status == 'Passed' ) ) || 
                                ( x.isBast == false && x.selections != null && x.selections.some(o => o.title == 'Extend' && o.status == 'Passed' ) )
                            );
                        // console.log('------- 03. LIST STUDENT', listStudent);

                        if(listStudent.length > 0 && this.dataSendMail.emailTo.length > 0){

                            listStudent.forEach(student => { 
                                // build mail subject & body
                                this.dataSendMail.body += `<tr>
                                    <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">${ student.name }</td>
                                    <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">${ datestart } s/d ${ dateend }</td>
                                    <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">${ student.assessmentSummary.finalResult}</td>
                                    <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">${ student.grade}</td></tr>`;
                            });

                            this.dataSendMail.body += `</table><br>Thank You<br>* This email is sent through the system. Do not reply to this email.<br> <br><br><br>`;
                            // console.log('Mail buider => mail to : ', this.dataSendMail.emailTo);
                            // console.log('Mail buider => mail body : ', this.dataSendMail.body);
                            // console.log('Mail buider => mail body : ', this.countStudentGrade);
                            
                            await this.doSendBAST();
                        } else if(this.dataSendMail.emailTo.length < 1){
                            errorMessage('send BAST email failed because the email recipient is empty !');
                        }
                    }

                    localStorage.removeItem("sendnotif");
                    localStorage.removeItem("sendnotifBootcampId");
                }

                
            },
            keypressIsNumber (evt) {
                const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                const keyPressed = evt.key;
                
                if (!keysAllowed.includes(keyPressed)) {
                    evt.preventDefault()
                }
            },
            doRefreshTable(){
                console.log('filter', this.filters);
            },
            async doGetListStatusBootcamp(){
                await getSourceStatusBootcamp()
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