<template>
    <div>
        <v-row>
            <v-col cols="12" sm="12">

                <v-card :loading="events.loading">
                    <xa-card-bootcamp-information-qc :source="data_bind" :masterStatus="source_status" ></xa-card-bootcamp-information-qc>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="12">

                <v-card :loading="events.loading">

                   
                    <v-card-text >
                        <v-row>
                            <v-col cols="12" sm="12" class="grey--text font-weight-bold">Students</v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="12" >
                                <template>
                                    <v-simple-table dense class="grey--text" v-if="source_bootcamp.students != undefined">
                                        <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th rowspan="2" style="border-bottom: 1pt solid #96D4D4; border-top: 1pt solid #96D4D4; min-width: 200px !important;">Name</th>
                                                <th class="text-center" colspan="2" style="border-bottom: 1pt solid #96D4D4; border-top: 1pt solid #96D4D4;"> Filtering Test 1 </th>
                                                <th class="text-center" colspan="2" style="border-bottom: 1pt solid #96D4D4; border-top: 1pt solid #96D4D4;"> Mini Project </th>
                                                <th class="text-center" colspan="2" style="border-bottom: 1pt solid #96D4D4; border-top: 1pt solid #96D4D4;"> Extend Mini Project </th>
                                                <th rowspan="2" style="border-bottom: 1pt solid #96D4D4; border-top: 1pt solid #96D4D4; width: 120px; min-width: 120px !important" class="pl-10">Action</th>
                                            </tr>
                                            <tr>
                                                <!-- <th class="text-left">Name</th> -->
                                                <th style="border-bottom: 1pt solid #96D4D4;"> Score<br>(15%) </th>
                                                <th style="border-bottom: 1pt solid #96D4D4;"> Status </th>
                                                <th style="border-bottom: 1pt solid #96D4D4;"> Score<br>(25%)</th>
                                                <th style="border-bottom: 1pt solid #96D4D4;"> Status </th>
                                                <th style="border-bottom: 1pt solid #96D4D4;"> Score<br>(12.5%)</th>
                                                <th style="border-bottom: 1pt solid #96D4D4;"> Status </th>
                                            </tr>
                                        </thead>
                                        <tbody v-for="student in source_bootcamp.students" :key="student.studentId">
                                            <tr v-if="checkStudentToShow(student)" :class="rowStyleStudentFailed(source_bootcamp.bootcampStatus, student)">
                                                <td>{{ student.name }}</td>
                                                <td> <template v-if="student.assessmentSummary != null && student.assessmentSummary.fT1 > 0">{{ student.assessmentSummary.fT1 }}</template> </td>
                                                <td> <template v-if="student.selections != null && student.selections.some(x => x.title == 'FT1')">{{ student.selections.find(x => x.title == 'FT1').status }}</template> </td>
                                                
                                                
                                                <td> <template v-if="student.selections != null && student.selections.some(x => x.title == 'FT2') && student.assessmentSummary != null && student.assessmentSummary.fT2 >= 0">{{ student.assessmentSummary.fT2 }}</template> </td>
                                                <td> <template v-if="student.selections != null && student.selections.some(x => x.title == 'FT2')">{{ student.selections.find(x => x.title == 'FT2').status }}</template></td>
                                                
                                                <td> <template v-if="student.selections != null && student.selections.some(x => x.title == 'Extend') && student.assessmentSummary != null && student.assessmentSummary.extend >= 0">{{ student.assessmentSummary.extend }}</template> </td>
                                                <td> <template v-if="student.selections != null && student.selections.some(x => x.title == 'Extend')">{{ student.selections.find(x => x.title == 'Extend').status }}</template></td>
                                                
                                                <td>
                                                    <template>
                                                        <v-tooltip bottom v-if="actionButtomFT1Show(source_bootcamp.bootcampStatus)">
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn icon v-on="on"
                                                                    :color="actionButtomFT1Color(source_bootcamp.bootcampStatus, student)"
                                                                    @click="openFormFT1(student.studentId)">
                                                                    <v-icon>{{ actionButtomIcon(source_bootcamp.bootcampStatus, 'FT_1') }}</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Assessment Filtering Test 1</span>
                                                        </v-tooltip>
                                                        <!-- <v-tooltip bottom 
                                                                        v-if="(source_bootcamp.bootcampStatus == 'FT_2' && student.selections != undefined && student.selections.some(x => x.title == 'FT1' && x.status != 'Failed'))
                                                                              || (source_bootcamp.bootcampStatus == 'Extend' && student.selections != undefined && student.selections.some(x => x.title == 'FT2' && x.status == 'Extend' ))"
                                                                         > -->
                                                        <v-tooltip bottom v-if="actionButtomMinProShow(source_bootcamp.bootcampStatus, student)">
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn icon v-on="on"
                                                                    :color="actionButtomMinProColor(source_bootcamp.bootcampStatus, student)"
                                                                    @click="openFormFT2(student.studentId)">
                                                                    <v-icon>{{ actionButtomIcon(source_bootcamp.bootcampStatus, 'FT_2') }}</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Edit Assessment Mini Project</span>
                                                        </v-tooltip>
                                                    </template>
                                                </td>
                                            </tr>
                                        </tbody>
                                        </template>
                                    </v-simple-table>
                                    </template>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="doBack()" :disabled="events.loading">
                            Back
                        </v-btn>
                        <v-btn 
                                color="primary" @click="doSave()" 
                                v-if="source_bootcamp.bootcampStatus=='FT_1' || source_bootcamp.bootcampStatus=='FT_2' || source_bootcamp.bootcampStatus=='Extend'"
                                :disabled="isDisabled || (events.loading || events.submit)">
                                <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                                {{!events.loading || !events.submit ? 'Submit' : 'Loading'}}
                        </v-btn>
                    </v-card-actions>
                    
                </v-card>
            </v-col>
        </v-row>    
    </div>
    
</template>

<script>

import XaCardBootcampInformationQc from "@/components/xa/cardBootcampInformationQc";
import { getBootcampDetail 
         ,getDetailBootcampAssessmentByBootcampId
         ,updateBootcampChangeStatus
 } from "@/services/bootcamp";
 import { getSourceStatusBootcamp } from "@/services/bootcamp";
 import { sendEmail } from "@/services/emailsend";
 import { getSelectOptionUserByRole } from "@/services/app-users";

//utils
import errorMessage from "@/utils/notify-error";
// import students from "@/modules/students";

export default {
    name: "VueBootcampAssessmentQCDetail",
    components: {
        XaCardBootcampInformationQc,
    },
    data(){
        return{
            form: {
                id: this.$route.params.id,
                bootcampStatus: null,  //
                updatedBy: JSON.parse(localStorage.getItem("user")).id,
            },
            form_submit: {},
            loading: false,
            form_error: false,
            isDisabled : true, // true karena disabled = true
            events: {
                    loading: true,
                    submit: false,
                    status: false,
                },
            data_bind: {
                technology: { name: null },
                location: { name: null },
                trainer: { name: null },
                // qc: { name: null },
                periode: { startDate: null, endDate: null },
                graduateNoteNeedAdjustment: [],
            },
            source_bootcamp: {},
            source_bootcamp_detail: {},
            source_status:null,
            bindStatus : 'null',
            // bindBootcampStatus: null,
            dataSendMail: {
                    emailTo: null,
                    subject: 'Approval BOD Bootcamp',
                    body: null
                },
            responseError:{
                status: 403
            },
        }
    },
    mounted() {
        setTimeout(() => {
            this.doGetData();
            this.doGetBootcampDetail();
        }, 2000);
    },
    methods:{
        doGetData() {
            this.events.loading = true
            getBootcampDetail(this.$route.params.id)
            .then(response => {
                this.source_bootcamp = response;
                this.data_bind = response;
                // console.log('==> response ', response);

                this.doGetListStatusBootcamp();
                this.doSetBootcampStatus(response);
                this.doCheckStudentHasAssessmentAll(response);
                this.doGetUserBod();

                this.events.loading = false
            })
            .catch(error => {
                this.events.loading = false
                errorMessage(error);
            });
        },
        doSetBootcampStatus(source){
            if(source.bootcampStatus == 'FT_1'){
                this.form.bootcampStatus = 'Phase_2';
            }
            else if(source.bootcampStatus == 'FT_2'){
                this.form.bootcampStatus = 'ApprovalBOD';
            }
            else if(source.bootcampStatus == 'Extend'){
                this.form.bootcampStatus = 'ApprovalBODExtend';
            }
        },
        doCheckStudentHasAssessmentAll(source){
            // console.log('doCheckStudentHasAssessmentAll ===> 1 - source ', source);
            
            // first set button enabled
            this.isDisabled = false;

            // access all student and find student has not assessment then return with set button = disabled
            if(source != undefined && source.students != undefined && source.students.length > 0){
                
                this.source_bootcamp.students.forEach((student) => {
                    if(student.recordStatus == 'Active'){
                        
                        if(source.bootcampStatus == 'FT_1'){
                            const booleanStudentNotHasSelectionFT1 = (student.selections == null || (student.selections != null && student.selections.some(x => x.title == 'FT1') == false));
                            if(booleanStudentNotHasSelectionFT1) return this.isDisabled = true; 
                        }
                        else if(source.bootcampStatus == 'FT_2'){
                            const studentPassedFT1 = student.selections.some(p => p.title == 'FT1' && p.status == 'Passed');
                            const studentHasSelectionFT2 = (studentPassedFT1 && student.selections.some(o => o.title == 'FT2') == false);
                            if(studentHasSelectionFT2) return this.isDisabled = true;
                        }
                        else if(source.bootcampStatus == 'Extend'){
                            const studentPassedFT1 = student.selections.some(p => p.title == 'FT1' && p.status == 'Passed');
                            const studentExtend = (studentPassedFT1 && student.selections.some(p => p.title == 'FT2' && p.status == 'Extend'));
                            const studentHasSelectionFT2 = (studentPassedFT1 && studentExtend && student.selections.some(o => o.title == 'Extend') == false);
                            // console.log('=======> Has Assessment FT2 ' + student.name, studentHasSelectionFT2, student);
                            if(studentHasSelectionFT2) return this.isDisabled = true;
                        }

                    }

                });


            }
        },
        doGetListStatusBootcamp(){
            getSourceStatusBootcamp()
            .then(responseMaster => {
                this.source_status = responseMaster;
                // this.bindBootcampStatus = responseMaster.find(({ status }) => status === source.bootcampStatus).title;
                // console.log('==> this.source_status', this.source_status);
            })
            .catch(error => {
                errorMessage(error);
                this.events.loading = false;
            });
        }, 
        async doSave() {
            this.events.loading = true;
            this.events.submit = true;
            this.form_submit = this.form;
            
            const bootcampstatusCurrent = this.source_bootcamp_detail.bootcamp.bootcampStatus;
            // const studentsActive = (status bootcamp == extend) ? return student phase extend : return student phase ft2;
            const studentsActive = (bootcampstatusCurrent == 'Extend') ? 
                                    this.source_bootcamp.students.filter(x => x.recordStatus == 'Active' && x.selections.some(y => y.title == 'FT2' && y.status == 'Extend')) : 
                                    this.source_bootcamp.students.filter(x => x.recordStatus == 'Active');
            
            this.dataSendMail.subject = (bootcampstatusCurrent == 'Extend') ?
                                        `Approval of Filtering Test 2 Extension Results – Batch ${this.source_bootcamp_detail.bootcamp.batch}` :
                                        `Approval of Filtering Test 2 Results – Batch ${this.source_bootcamp_detail.bootcamp.batch}`;

            // PRINT VARIABLE
            // console.log('===> ON SUBMIT __Data bootcamp detail', this.source_bootcamp_detail, '__Status Bootcamp', bootcampstatusCurrent);
            // console.log('===> ON SUBMIT __Data form', this.form, '__Data form submit', this.form_submit);
            // console.log('===> ON SUBMIT __Student active', studentsActive);
            // console.log('===> ON SUBMIT __before update');
            
            const responseUpdate =  await updateBootcampChangeStatus(this.form_submit)
            .then((response) => {
                return (response == this.source_bootcamp_detail.bootcamp.id) ? true : false;
            }).catch((error) => {
                errorMessage(error);
                return false;
            })

            // const responseUpdate = true;

            if(responseUpdate){
                await this.doSendEmailBOD(this.source_bootcamp_detail, studentsActive);
                this.saveSuccess();
            }else{
                this.saveFailure();
            }

        },
        saveSuccess() {
            setTimeout(() => {
                this.$notify({
                    title: "Successful",
                    content: "Bootcamp Assessment QC already submitted!",
                    color: "rgb(0, 200, 83)",
                });
                this.events.loading = false;
                this.events.submit = false;
                this.$router.push({ name: 'bootcampassessmentqc'});
            }, 2000);
        },
        saveFailure() {
            this.$notify({
                title: 'Failed',
                content: "You cannot perform this request, please try again later or contact the administrator.",
                color: "rgb(255, 0, 0)",
            });
            this.events.loading = false;
            this.events.submit = false;
        },
        openFormFT1(studentId){
            this.$router.push({ 
                name: 'form-ft1-assessment', 
                params: { id: this.$route.params.id, studentid: studentId } }
            );
        },
        openFormFT2(studentId){
            this.$router.push({
                name: 'form-ft2-assessment',
                params: { id: this.$route.params.id, studentid: studentId }
            }); 
        },
        openFormExtend(studentId){
            this.$router.push({
                name: 'form-extend-assessment',
                params: { id: this.$route.params.id, studentid: studentId }
            }); 
        },
        doBack(){
            this.$router.push({ 
                name: `bootcampassessmentqc`
            })
        },
        bindStatusStudent(selection){
            let count = selection.length -1;
            let data = selection.find((value, index) => index == count);
            // console.log('==> data', data);
            return this.bindStatus = data.status;
        },
        async doSendEmailBOD(source, listStudent){
            const currentBootcampStatus = source.bootcamp.bootcampStatus;
            
            const mailOpeningWords = `
                    Dear All, 
                    <p>This is the result of Filtering Test 2 Bootcamp ${source.bootcamp.technology.name} Batch ${source.bootcamp.batch} (${source.bootcamp.location.name}).</p>
                    <p>Please provide feedback and approval via the <a href="https://alisa.xsis.co.id/">ALISA application</a></p>`;
            const mailClosingWords = `
                    </table>
                    <p>Thank You</p>
                    <p>*This email is sent through the system. Do not reply to this email</p>
                    <br><br><br> `;

            if(currentBootcampStatus == 'FT_2'){
                const mailTableHeader = `<table style="width:100%; border: 1px solid black; border-collapse: collapse; font-size: 12px;">
                <tr style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                    <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; min-width:120px;">Name</th>
                    <th colspan="2" style="border: 1px solid black; border-collapse: collapse;">Classroom</th>
                    <th colspan="2" style="border: 1px solid black; border-collapse: collapse;">Filtering Test 1</th>
                    <th colspan="2" style="border: 1px solid black; border-collapse: collapse;">Filtering Test 2</th>
                    <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; min-width:100px;">Note By Trainer</th>
                    <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; min-width:100px;">Note By QC</th>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                    <th style="border: 1px solid black; border-collapse: collapse;">Non-Technical</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Technical</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Score</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Status</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Score</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Status</th>
                </tr>`;

                let mailListStudent = ``;
                listStudent.forEach(student => { 
                        const ft1Status = (student.selections != undefined && student.selections.some(x => x.title == 'FT1') ) ? student.selections.find(x => x.title == 'FT1').status : '';
                        const ft1Score = (ft1Status == '' ) ? '' : student.assessmentSummary.fT1;
                        
                        const ft2Status = (student.selections != undefined && student.selections.some(x => x.title == 'FT2') ) ? student.selections.find(x => x.title == 'FT2').status : '';
                        const ft2Score = (ft2Status == '' ) ? '' : student.assessmentSummary.fT2;

                        let asst = source.assessments.find(x => x.studentId == student.studentId);
                        const noteTrainer = (asst.classrooms != undefined) ? asst.classrooms.notePhase1 + '. ' + asst.classrooms.notePhase2 : '';
                        const noteQcft1 = (asst.fT1 == undefined  ) ? '' : asst.fT1.notePhase1;
                        const noteQcft2 = (asst.fT2 == undefined  ) ? '' : asst.fT2.notePhase2;

                        mailListStudent += (ft1Status == 'Failed' || ft2Status == 'Failed') ?
                        ` 
                        <tr style="border: 1px solid black; border-collapse: collapse; background-color: #ff3300;">
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.name}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.assessmentSummary.softSkill}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.assessmentSummary.technical}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft1Score}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft1Status}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2Score}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2Status}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${noteTrainer}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;"><p>${noteQcft1}</p> <p>${noteQcft2}</p></td>
                        </tr>` :
                        ` 
                        <tr style="border: 1px solid black; border-collapse: collapse;">
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.name}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.assessmentSummary.softSkill}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.assessmentSummary.technical}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft1Score}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft1Status}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2Score}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2Status}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${noteTrainer}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;"><p>${noteQcft1}</p> <p>${noteQcft2}</p></td>
                        </tr>`;
                    
                });

                this.dataSendMail.body = mailOpeningWords + mailTableHeader + mailListStudent + mailClosingWords;
            
                await sendEmail(this.dataSendMail)
                .then(() => {
                }).catch((error) => {
                    errorMessage('Send email failed : ',error);
                })

            } else if (currentBootcampStatus == 'Extend'){
                const mailTableHeader = `<table style="width:100%; border: 1px solid black; border-collapse: collapse; font-size: 12px;">
                <tr style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                    <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; min-width:120px;">Name</th>
                    <th colspan="2" style="border: 1px solid black; border-collapse: collapse;">Classroom</th>
                    <th colspan="2" style="border: 1px solid black; border-collapse: collapse;">Filtering Test 1</th>
                    <th colspan="2" style="border: 1px solid black; border-collapse: collapse;">Filtering Test 2</th>
                    <th colspan="2" style="border: 1px solid black; border-collapse: collapse;">Filtering Test 2 Extend</th>
                    <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; min-width:100px;">Note By Trainer</th>
                    <th rowspan="2" style="border: 1px solid black; border-collapse: collapse; min-width:100px;">Note By QC</th>
                </tr>
                <tr style="border: 1px solid black; border-collapse: collapse; text-align: center;">
                    <th style="border: 1px solid black; border-collapse: collapse;">Non-Technical</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Technical</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Score</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Status</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Score</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Status</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Score</th>
                    <th style="border: 1px solid black; border-collapse: collapse;">Status</th>
                </tr>`;

                let mailListStudent = ``;
                listStudent.forEach(student => { 
                        const ft1Status = (student.selections != undefined && student.selections.some(x => x.title == 'FT1') ) ? student.selections.find(x => x.title == 'FT1').status : '';
                        const ft1Score = (ft1Status == '' ) ? '' : student.assessmentSummary.fT1;
                        
                        const ft2Status = (student.selections != undefined && student.selections.some(x => x.title == 'FT2') ) ? student.selections.find(x => x.title == 'FT2').status : '';
                        const ft2Score = (ft2Status == '' ) ? '' : student.assessmentSummary.fT2;

                        const ft2ExtendStatus = (student.selections != undefined && student.selections.some(x => x.title == 'Extend') ) ? student.selections.find(x => x.title == 'Extend').status : '';
                        const ft2ExtendScore = (ft2Status == '' ) ? '' : student.assessmentSummary.extend;

                        let asst = source.assessments.find(x => x.studentId == student.studentId);
                        const noteTrainer = (asst.classrooms != undefined) ? asst.classrooms.notePhase1 + '. ' + asst.classrooms.notePhase2 : '';
                        const noteQcft1 = (asst.fT1 == undefined  ) ? '' : asst.fT1.notePhase1;
                        const noteQcft2 = (asst.fT2 == undefined  ) ? '' : asst.fT2.notePhase2;

                        mailListStudent += (ft2ExtendStatus == 'Failed') ?
                        ` 
                        <tr style="border: 1px solid black; border-collapse: collapse; background-color: #ff3300;">
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.name}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.assessmentSummary.softSkill}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.assessmentSummary.technical}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft1Score}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft1Status}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2Score}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2Status}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2ExtendScore}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2ExtendStatus}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${noteTrainer}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;"><p>${noteQcft1}</p> <p>${noteQcft2}</p></td>
                        </tr>` :
                        ` 
                        <tr style="border: 1px solid black; border-collapse: collapse;">
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.name}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.assessmentSummary.softSkill}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${student.assessmentSummary.technical}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft1Score}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft1Status}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2Score}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2Status}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2ExtendScore}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${ft2ExtendStatus}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;">${noteTrainer}</td>
                            <td style="border: 1px solid black; border-collapse: collapse; padding-left: 5px; padding-right: 5px;"><p>${noteQcft1}</p> <p>${noteQcft2}</p></td>
                        </tr>`;
                    
                });

                this.dataSendMail.body = mailOpeningWords + mailTableHeader + mailListStudent + mailClosingWords;

                await sendEmail(this.dataSendMail)
                .then(() => {
                }).catch((error) => {
                    errorMessage('Send email failed : ',error);
                })
            }
            
            // console.log('===> ON SUBMIT __Mail subject : ', this.dataSendMail.subject);
            // console.log('===> ON SUBMIT __Mail to : ', this.dataSendMail.emailTo);
            // console.log('===> ON SUBMIT __mail body : ', this.dataSendMail.body);
            
        },
        doGetUserBod(){
            this.events.loading = true;
            getSelectOptionUserByRole('BOD')
            .then((response) => {
                this.dataSendMail.emailTo = response.filter(x => x.role == "BOD").map(item => { return item.email; });
                this.loading = false;
            }).catch((error) => {
                errorMessage('send email bod failed : ',error);
            })
        },
        async doGetBootcampDetail(){
            this.events.loading = true
            await getDetailBootcampAssessmentByBootcampId(this.$route.params.id)
            .then(response => {
                this.source_bootcamp_detail = response;
                // console.log('_____ GET BOOTCAMP DETAIL _____', response);
                // console.log('===> First Load ---> bootcamp details', this.source_bootcamp_detail);

                this.events.loading = false;
            })
            .catch(error => {
                this.events.loading = false;
                errorMessage(error);
            });
            
        },

        // ++++++ REGION GRIDVIEW ++++++
        checkStudentToShow(student){
            return (student.recordStatus == 'Removed') ? false : true;
        },
        rowStyleStudentFailed(currentStatus, student){
            let rowColorInit = '';
            const studentFailedFT1 = ( student.selections != null && student.selections.some(p => p.title == 'FT1' && p.status == 'Failed') );
            const studentFailedFT2 = ( currentStatus != 'FT_2' && student.selections != null && student.selections.some(p => p.title == 'FT2' && p.status == 'Failed'));
            const studentFailedExtend = ( currentStatus != 'Extend' && student.selections != null && student.selections.some(p => p.title == 'Extend' && p.status == 'Failed'));

            const isPassedFT2 = (student.selections != undefined && student.selections.filter(o => o.title == 'FT2' && o.status == 'Passed').length > 0 && student.approvalBOD != undefined );
            const isPassedExtend = (student.selections != undefined && student.selections.filter(o => o.title == 'Extend' && o.status == 'Passed').length > 0 && student.approvalBOD != undefined );
            // console.log('++++++++', student.name, student)
            if(studentFailedFT1 || studentFailedFT2 || studentFailedExtend) rowColorInit = 'red lighten-5'
            if(isPassedFT2 || isPassedExtend) rowColorInit = 'green lighten-5'
            return rowColorInit;
        },
        actionButtomIcon(currentStatus, targetStatus){
            return (currentStatus == targetStatus) ? 'mdi mdi-clipboard-edit-outline' : 'mdi mdi-clipboard-check-outline';
        },
        actionButtomFT1Show(bootcampStatus){
            return (bootcampStatus == 'Created' || bootcampStatus == 'Approval' || bootcampStatus == 'Approved' || bootcampStatus == 'Phase_1') ? false : true;
        },
        actionButtomFT1Color(bootcampStatus, student){
            const booleanBootcampStatus = (bootcampStatus == 'FT_1') ? true : false;
            const booleanStudentHasAssessment = (student.assessmentSummary != undefined && student.assessmentSummary.fT1 > 0);

            if(booleanBootcampStatus && booleanStudentHasAssessment){ return 'success' }
            else if(booleanBootcampStatus){ return 'primary' }
            else { return 'grey' }
        },
        actionButtomMinProShow(bootcampStatus, student){
            const booleanStudentFailedFT1 = (student.selections != undefined && student.selections.findIndex(p => p.title == 'FT1' && p.status == 'Failed') ) == 0;
            if(booleanStudentFailedFT1) return false;

            return (bootcampStatus == 'FT_2' || bootcampStatus == 'ApprovalBOD' || bootcampStatus == 'Extend' || bootcampStatus == 'ApprovalBODExtend' || bootcampStatus == 'Finished') ? true : false;
        },
        actionButtomMinProColor(bootcampStatus, student){
            const studentFailedFT1 = student.selections.some(p => p.title == 'FT1' && p.status == 'Failed');
            const studentFailedFT2 = student.selections.some(p => p.title == 'FT2' && p.status == 'Failed');
            const studentPassed = student.approvalBOD != null;
            if(studentPassed || studentFailedFT1 ||
                (studentFailedFT2 && bootcampStatus == 'Extend')
            ) { return 'grey'; }

            if(bootcampStatus == 'FT_2'){
                const studentPassedFT1 = student.selections.some(p => p.title == 'FT1' && p.status == 'Passed');
                const studentHasSelectionFT2 = (studentPassedFT1 && student.selections.some(o => o.title == 'FT2'));
                return studentHasSelectionFT2 ? 'success' : 'primary';
            }

            if(bootcampStatus == 'Extend'){
                const studentPassedFT1 = student.selections.some(p => p.title == 'FT1' && p.status == 'Passed');
                const studentExtend = (studentPassedFT1 && student.selections.some(p => p.title == 'FT2' && p.status == 'Extend'));
                const studentHasSelectionFT2 = (studentPassedFT1 && studentExtend && student.selections.some(o => o.title == 'Extend'));
                return studentHasSelectionFT2 ? 'success' : 'primary';
            }

            return 'grey';
        },
        // ++++++ END REGION GRIDVIEW ++++++


    }
}

</script>
