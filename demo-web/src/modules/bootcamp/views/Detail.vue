<template>
    <div>

        <v-row>

            <v-col cols="12" sm="6" md="8">
                <!-- Information -->
                <v-row>
                    <v-col >
                        <v-card :loading="loading">
                            <v-card-text >
                                <v-row>
                                    <v-col class="text-left grey--text font-weight-bold">Information</v-col>
                                    <v-col class="text-right">
                                        <v-tooltip bottom v-if="module_access != null && module_access.isEdit && (data_information.bootcamp.bootcampStatus == 'Created')">
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-on="on"
                                                    color="primary"
                                                    fab x-small dark
                                                    @click="openFormInformation()">
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                                </template>
                                            <span>Edit Information</span>
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                            </v-card-text>

                            <xa-card-bootcamp-information :source="data_information.bootcamp"></xa-card-bootcamp-information>
                        </v-card>
                    </v-col>
                </v-row>

                <!-- Date Detail -->
                <v-row>
                    <v-col>
                        <v-card :loading="loading">
                            <v-card-text >
                                <v-row>
                                    <v-col class="grey--text font-weight-bold">Phase Date Details</v-col>
                                    <v-col class="text-right">
                                        <v-tooltip bottom v-if="module_access != null && module_access.isEdit && data_information.bootcamp.bootcampStatus != 'Finished'">
                                            <template v-slot:activator="{ on }">
                                                <v-btn v-on="on"
                                                    color="primary"
                                                    fab x-small dark
                                                    @click="openFormPhase()">
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                                </template>
                                            <span>Edit Phase Date Details</span>
                                        </v-tooltip>   
                                    </v-col>
                                </v-row>
                            </v-card-text>

                            <v-card-text>
                                <v-list-item v-for="item in source_master_dates" :key="item.phase" >
                                    <v-list-item-content>
                                        <v-list-item-subtitle><small>{{item.title}}</small></v-list-item-subtitle>
                                        <v-list-item-subtitle v-if="item.startDate != undefined">{{formatDate(item.startDate,'date')}} - {{formatDate(item.endDate,'date')}}</v-list-item-subtitle>
                                        <v-list-item-subtitle v-else> - </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card-text>

                        </v-card>
                    </v-col>
                </v-row>
                
            </v-col>

            <!-- Bootcamp Status -->
            <v-col cols="6" md="4">
                <v-card :loading="loading">
                    <v-card-text >
                        <v-row>
                            <v-col class="grey--text font-weight-bold">Status</v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-text >
                        <v-timeline
                            align-top dense >

                            <v-timeline-item  v-for="message in source_master_status" :key="message.status"
                            :color="message.color"
                                small >
                                <div>
                                    <div class="font-weight-normal">
                                        <small><strong>{{ message.status }}</strong></small>
                                    </div>
                                    <div><small>{{ message.title }}</small></div>
                                </div>
                            </v-timeline-item>
                        </v-timeline>
                    </v-card-text>
                </v-card>        
            </v-col>

        </v-row>


        <v-row>

            <!-- Student -->
            <v-col cols="12" sm="12">
                <v-card :loading="loading">
                    <v-card-text >
                        <v-row>
                            <v-col class="grey--text font-weight-bold">Students</v-col>
                            <v-col class="text-right">
                                <v-tooltip bottom v-if="module_access != null && module_access.isEdit && (data_information.bootcamp.bootcampStatus == 'Approved' || data_information.bootcamp.bootcampStatus == 'Phase_1')">
                                    <template v-slot:activator="{ on }">
                                        <v-btn v-on="on"
                                            color="primary"
                                            fab x-small dark
                                            @click="openFormStudent()">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        </template>
                                    <span>Edit Mapping Student</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="12" >
                                <template>asas
                                    <v-data-table
                                        :headers="studentHeaders"
                                        :items="data_information.bootcamp.students"
                                        :single-expand="singleExpand"
                                        :expanded.sync="expanded"
                                        :item-class="getClass"
                                        item-key="name"
                                        dense
                                        show-expand
                                        class="elevation-1" > 
                                        
                                        <template v-slot:[`item.assessmentSummary.softSkill`]="{ item }">
                                            <v-btn color="black" plain @click="goToUiAssessmentDetail(data_information.bootcamp.id, item.studentId, '/bootcampassessmenttrainer/logic/')" > {{ item.assessmentSummary.softSkill }} </v-btn>
                                        </template>
                                        <template v-slot:[`item.assessmentSummary.fT1`]="{ item }">
                                            <v-btn color="black" plain @click="goToUiAssessmentDetail(data_information.bootcamp.id, item.studentId, '/bootcampassessmentqc/ft1/')" > {{ item.assessmentSummary.fT1 }} </v-btn>
                                        </template>
                                        <template v-slot:[`item.assessmentSummary.technical`]="{ item }">
                                            <v-btn color="black" plain @click="goToUiAssessmentDetail(data_information.bootcamp.id, item.studentId, '/bootcampassessmenttrainer/technology/')" > {{ item.assessmentSummary.technical }} </v-btn>
                                        </template>
                                        <template v-slot:[`item.assessmentSummary.fT2`]="{ item }">
                                            <v-btn color="black" plain @click="goToUiAssessmentDetail(data_information.bootcamp.id, item.studentId, '/bootcampassessmentqc/ft2/')" > {{ item.assessmentSummary.fT2 }} </v-btn>
                                        </template>
                                        <template v-slot:[`item.assessmentSummary.extend`]="{ item }">
                                            <v-btn color="black" plain @click="goToUiAssessmentDetail(data_information.bootcamp.id, item.studentId, '/bootcampassessmentqc/ft2/')" > {{ item.assessmentSummary.extend }} </v-btn>
                                        </template>
                                       
                                        <template v-slot:expanded-item="{ headers, item }">
                                            <td :colspan="headers.length">
                                                <p class="font-weight-light grey-darken-2--text mt-2 pt-2 pl-4">Logic notes : <br>{{ bindstudentNotes(item.studentId, "logic") }}</p>
                                                <p class="font-weight-light grey-darken-2--text mt-2 pt-2 pl-4">Technology notes : <br>{{ bindstudentNotes(item.studentId, "tech") }}</p>
                                                <p class="font-weight-light grey-darken-2--text mt-2 pt-2 pl-4">Filtering Test notes : <br>{{ bindstudentNotes(item.studentId, "ft1") }}</p>
                                                <p class="font-weight-light grey-darken-2--text mt-2 pt-2 pl-4">Mini project notes : <br>{{ bindstudentNotes(item.studentId, "minpro") }}</p>
                                            </td>
                                        </template>
                                    </v-data-table>
                                </template>
                                
                            </v-col>
                        </v-row>


                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>



        <v-row>
            <v-col cols="12">
                <v-btn color="primary" outlined @click="$router.push({ name: `bootcamp`})">
                    Back
                </v-btn>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import errorMessage from "@/utils/notify-error";
import { getSourceStatusBootcamp, getSourceDateDetails, getDetailBootcampAssessmentByBootcampId } from "@/services/bootcamp";//getBootcampDetail
import { dateToMoment } from "@/utils/form-parser";
import formatDate from "@/utils/format-date";
import XaCardBootcampInformation from "@/components/xa/cardBootcampInformation";
import { sendEmail } from "@/services/emailsend";

export default {
    name: "VueBootcampDetail",
    components:{
        XaCardBootcampInformation
    },
    data(){
        return{
            loading: true,
            data_information: {
                bootcamp: {
                    batch: null,
                    technology: { name: null },
                    location: { name: null },
                    type: null,
                    periode: { startDate: null, endDate: null },
                    trainer: { name: null },
                    qc: { name: null },
                    approver: { userId: "", name: null, note: null },
                    notifyRecipients: null,
                },
                assessments: [],
            },
            source_master_dates: [],
            source_master_status: [],
            module_access: JSON.parse(localStorage.getItem("user")).modulsOrigin.find(item => item.title == "Data"),
            dataSendMail: {
                    emailTo: null,
                    subject: 'Submission Bootcamp New !!',
                    body: null
                },

            // DataTable Vue - start
            expanded: [],
            singleExpand: false,
            studentHeaders: [
                { text: 'Name', value: 'name', align: 'start', width: '20%' },
                { text: 'Non-Technical Score (15%)', value: 'assessmentSummary.softSkill' },
                { text: 'FT-1 Score (15%)', value: 'assessmentSummary.fT1' },
                { text: 'FT-1 Result', value: 'selections[0].status' },
                { text: 'Technical Score (45%)', value: 'assessmentSummary.technical' },
                { text: 'Mini Project Score (25%)', value: 'assessmentSummary.fT2' },
                { text: 'Mini Project Result', value: 'selections[1].status' },
                { text: 'Extend Mini Project Score (12.5%)', value: 'assessmentSummary.extend' },
                { text: 'Extend Mini Project Result', value: 'selections[2].status' },
                { text: 'Final Score', value: 'assessmentSummary.finalResult' },
                { text: '', value: 'data-table-expand' },
            ],

            // DataTable Vue - end
        }
    },
    mounted() {
        // console.log('sidebar => user : ', JSON.parse(localStorage.getItem("user")));
        // console.log('list => module_access : ', this.module_access);
        this.doGetListMasterDate();
        this.doGetListMasterStatusBootcamp();
        this.doGetData();

        // testing
        // console.log('====> Student Header <====', this.studentHeaders)
    },
    methods:{
        dateToMoment,
        formatDate,

        doGetData() {
            this.loading = true
            getDetailBootcampAssessmentByBootcampId(this.$route.params.id)
            .then(response => {
                this.data_information = response;
                this.data_information.bootcamp.notifyRecipients.sort((a, b) => b.role.localeCompare(a.role));
                console.log('data_information : ', this.data_information);

                // proses bootcamp status - start 
                let objIndex = this.source_master_status.findIndex(obj => obj.status == response.bootcamp.bootcampStatus);
                // console.log("Before update: ", objIndex);
                
                this.source_master_status.forEach((currentElement, index) => {
                    if(index <= objIndex){
                        this.source_master_status[index].color = "green";
                    }
                 });
                // proses bootcamp status - end


                this.source_master_dates = this.source_master_dates.map(item => {
                    const tmp = {};
                    tmp['phase'] = item.phase;
                    tmp['title'] =  item.title;
                    tmp['startDate'] =  item.startDate;
                    tmp['endDate'] =  item.endDate;
                    
                    if(response.bootcamp.dateDetails != undefined){
                        let dt = response.bootcamp.dateDetails.filter(x => x.phase === item.phase);
                        if(dt.length > 0 && dt[0].startDate != undefined){
                            // console.log('dt.startDate : ', dt[0].startDate);
                            tmp['startDate'] = this.dateToMoment(dt[0].startDate);
                            tmp['endDate'] = this.dateToMoment(dt[0].endDate);
                        }
                    }
                    return tmp;
                });
                

                // send email jika ada
                if(this.$route.params.sendnotif != undefined && this.$route.params.sendnotif == true && localStorage.getItem("sendnotif") !== null){
                    localStorage.removeItem("sendnotif");
                    console.log('this.$route.params.bootcampId : ', this.$route.params.bootcampId);
                    console.log('this.data_information : ', this.data_information);
                    this.doSendEmail(this.data_information.bootcamp);
                }

                // get bootcamp assessment
                // getDetailBootcampAssessmentByBootcampId(this.$route.params.id)
                // .then(response => {
                //     this.source_bootcamp_detail = response;
                //     console.log('_____ GET BOOTCAMP DETAIL _____', response);
                //     // console.log('===> First Load ---> bootcamp details', this.source_bootcamp_detail);
                // })
                // .catch(error => {
                //     this.loading = false;
                //     errorMessage(error);
                // });

                this.loading = false;
            })
            .catch(error => {
                this.loading = false
                errorMessage(error);
            });

            this.loading = true
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
        async doGetListMasterStatusBootcamp(){
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

        openFormInformation() {
            this.$router.push({
                name: 'update-bootcamp',
                params: { id: this.$route.params.id }
            });
        },
        openFormPhase(){
            this.$router.push({
                name: 'form-phase-date-bootcamp',
                params: { id: this.$route.params.id }
            });
        },
        openFormStudent(){
            this.$router.push({
                name: 'form-student-bootcamp',
                params: { id: this.$route.params.id }
            }); 
        },

        doSendEmail(source){
            this.loading = true;

            this.dataSendMail.emailTo = source.notifyRecipients.map(item => { return item.email; });
            this.dataSendMail.body = 
            `Dear All, <br>Submission for new Bootcamp with the following details: : <br><br>

            <table><tr><td style="width:200px">Batch</td><td>: ${ source.batch } </td></tr>
            <tr><td>Technology</td><td>: ${ source.technology.name } </td></tr>
            <tr><td>Location</td><td>: ${ source.location.name } </td></tr>
            <tr><td>Type</td><td>: ${ source.type } </td></tr>
            <tr><td>Start Date</td><td>: ${ formatDate( source.periode.startDate,'date') } </td></tr>
            <tr><td>End Date</td><td>: ${ formatDate( source.periode.endDate,'date') } </td></tr>
            <tr><td>Trainer Officer</td><td>: ${ source.trainer.name } </td></tr>
            <tr><td>QC Officer</td><td>: ${ source.qc.name } </td></tr>
            <tr><td>Approver Officer</td><td>: ${ source.approver.name } </td></tr>
            </table>
            
            <br>Thank You<br>* This email is sent through the system. Do not reply to this email.<br>`;

            console.log('Mail buider => mail to : ', this.dataSendMail.emailTo);
            console.log('Mail buider => mail to : ', this.dataSendMail.body);
            
            
            sendEmail(this.dataSendMail)
            .then(() => {
                this.loading = false;
            }).catch((error) => {
                errorMessage('send email failed : ',error);
            })

        },

        bindNoteTrainer(sourceAssessments, studentId){
            const assessmentStudent = sourceAssessments.filter((x) => x.studentId == studentId);
            console.log('===> sourceAssessments, studentId, assessment student ', sourceAssessments, studentId, assessmentStudent);

            const notes = assessmentStudent.map(item => {
                    if(item.classrooms.notePhase1 != null && item.classrooms.notePhase2 != null){
                        return item.classrooms.notePhase1 + ', ' + item.classrooms.notePhase2;
                    }else if(item.classrooms.notePhase1 != null){
                        return item.classrooms.notePhase1;
                    }else if(item.classrooms.notePhase2 != null){
                        return item.classrooms.notePhase2;
                    }
                })

            return notes.toString();
        },
        bindNoteQC(sourceAssessments, studentId){
            const assessmentStudent = sourceAssessments.filter((x) => x.studentId == studentId);
            console.log('===> assessment student ', assessmentStudent);

            const notes = assessmentStudent.map(item => {
                    if(item.fT1 != null  && item.fT2 != null){
                        return item.fT1.notePhase1 + ', ' + item.fT2.notePhase2;
                    }
                    else if(item.fT1 != null){
                        return item.fT1.notePhase1;
                    }
                    else if(item.fT2 != null){
                        return item.fT2.notePhase2;
                    }
                })

            return notes.toString();
        },

        // DataTable Vue - start
        getClass(item) {
            if(item.selections != null && item.selections.length > 0){
                const isFailed = item.selections.some(x => x.status == "Failed");
                const isPassedExtend = item.selections.some(x => x.title == "Extend" && x.status == "Passed");
                const isPassedFT2 = item.selections.some(x => x.title == "FT2" && x.status == "Passed");
                // console.log('___ call getClass : ', item.name, isFailed, item);

                if(isFailed) return 'red lighten-5';
                if(isPassedFT2 || isPassedExtend) return 'green lighten-5';
                return 'yellow lighten-5'
            }
        },
        bindstudentNotes(paramStudentId, phase) {
            const isStudentExists = (this.data_information != null && this.data_information.assessments != null) ? this.data_information.assessments.some(x => x.studentId == paramStudentId) : false;
            const isNoteByTrainer = (isStudentExists && this.data_information.assessments.find(x => x.studentId == paramStudentId).classrooms != null) ? true : false;
            const isNoteFt1 = (isStudentExists && this.data_information.assessments.find(x => x.studentId == paramStudentId).fT1 != null) ? true : false;
            const isNoteFt2 = (isStudentExists && this.data_information.assessments.find(x => x.studentId == paramStudentId).fT2 != null) ? true : false;
            // console.log('___ call bindstudentNotes : ', paramStudentId, isStudentExists, isNoteByTrainer, ' is note ft1', isNoteFt1, ' is note ft2 ', isNoteFt2, this.data_information);

            if(isStudentExists && isNoteByTrainer && phase == "logic") return this.data_information.assessments.find(x => x.studentId == paramStudentId).classrooms.notePhase1;
            if(isStudentExists && isNoteByTrainer && phase == "tech") return this.data_information.assessments.find(x => x.studentId == paramStudentId).classrooms.notePhase2;
            
            if(isStudentExists && isNoteFt1 && phase == "ft1") return this.data_information.assessments.find(x => x.studentId == paramStudentId).fT1.notePhase1;
            if(isStudentExists && isNoteFt2 && phase == "minpro") return this.data_information.assessments.find(x => x.studentId == paramStudentId).fT2.notePhase2;

            return ''
        },
        goToUiAssessmentDetail(bootcampId, studentId, name) {
            console.log('===>> ', bootcampId, studentId, name);
            // Form non technical ==> 'form-logic-assessment'
            // Form technical ==> 'form-technology-assessment'
            // Form FT-1 ==> 'form-ft1-assessment'
            // Form FT-1 ==> 'form-ft2-assessment'

            // this.$router.push({ 
            //     name: name, 
            //     params: { id: bootcampId, studentid: studentId } }
            // );

            let routeData = this.$router.resolve(
            {
                path: name + bootcampId + '/' + studentId
            });
            window.open(routeData.href, '_blank');

        },
        
        // DataTable Vue - end

    }
}

</script>

