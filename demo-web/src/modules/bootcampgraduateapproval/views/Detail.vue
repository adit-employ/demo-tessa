<template>
    <div>

        <v-row>
            <v-col cols="12" sm="12">
                <v-card :loading="events.loading">
                    <div>
                        <v-card-text>Information</v-card-text>
                        <v-divider />
                    </div>

                    <xa-card-bootcamp-information4 :source="source_bootcamp"></xa-card-bootcamp-information4>
                       
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="12">
                <v-card :loading="events.loading">
                    <!-- <xa-card-bootcamp-information-bod :source="source_bootcamp"></xa-card-bootcamp-information-bod> -->
                    <div>
                        <v-card-text>Students</v-card-text>
                        <v-divider />
                    </div>

                    <div>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="12" >
                                    <v-simple-table dense>
                                        <template   v-slot:default 
                                                    v-if="source_bootcamp.students != undefined &&  source_bootcamp.students.length > 0">
                                            <thead>
                                                <tr>
                                                    <th class="text-left">Name</th>
                                                    <th class="text-left">Soft Skill (15%)</th>
                                                    <th class="text-left">Technical (45%)</th>
                                                    <th class="text-left">FT 1 (15%)</th>
                                                    <th class="text-left">FT 2 (25%)</th>
                                                    <th class="text-left" v-if="source_bootcamp.students != undefined && source_bootcamp.students.some(x => x.selections != undefined && x.selections.some(o => o.title == 'Extend'))">FT2 Extend (12.5%)</th>
                                                    <th class="text-left">Final Score (100%)</th>
                                                    <th class="text-left">Status</th>
                                                    <th class="text-left">Note Trainer</th>
                                                    <th class="text-left">Note QC</th>
                                                </tr>
                                            </thead> 
                                            <tbody v-for="student in source_bootcamp.students" :key="student.studentId">
                                                <tr v-if="source_bootcamp.bootcampStatus == 'ApprovalBOD' && student.selections != undefined && student.selections.some(o => o.title == 'FT1' || o.title == 'FT2')"
                                                    :class="rowStyleStudentFailed(student)">
                                                    <td>{{ student.name }}</td>
                                                        <td>{{ student.assessmentSummary.softSkill }} %</td>
                                                        <td>{{ student.assessmentSummary.technical }} %</td>
                                                        <td>{{ student.assessmentSummary.fT1 }} %</td>
                                                        <td>{{ student.assessmentSummary.fT2 }} %</td>
                                                        <td>{{ student.assessmentSummary.finalResult }} %</td>
                                                        <td>
                                                            <template v-if="student.selections.some(o => o.title == 'FT2')">
                                                                {{ student.selections.find(x => x.title == 'FT2').status }}
                                                            </template>
                                                            <template v-else-if="student.selections.some(o => o.title == 'FT1')">
                                                                {{ student.selections.find(x => x.title == 'FT1').status }}
                                                            </template>
                                                        </td>
                                                        <td> {{ bindNoteTrainer(source_assessment, student.studentId) }} </td>
                                                        <td> {{ bindNoteQC(source_assessment, student.studentId) }} </td>
                                                </tr>
                                                <tr v-else-if="source_bootcamp.bootcampStatus == 'ApprovalBODExtend' && student.selections != undefined && student.selections.some(o => o.title == 'Extend')"
                                                    :class="rowStyleStudentFailed(student)">
                                                    <td>{{ student.name }}</td>
                                                        <td>{{ student.assessmentSummary.softSkill }}%</td>
                                                        <td>{{ student.assessmentSummary.technical }}%</td>
                                                        <td>{{ student.assessmentSummary.fT1 }}%</td>
                                                        <td>{{ student.assessmentSummary.fT2 }}%</td>
                                                        <td>{{ student.assessmentSummary.extend }}%</td>
                                                        <td>{{ student.assessmentSummary.finalResult }}%</td>
                                                        <td>
                                                            <template v-if="student.selections != undefined && student.selections.some(o => o.title == 'Extend')">
                                                                {{ student.selections.find(x => x.title == 'Extend').status }}
                                                            </template>
                                                        </td>
                                                        <td> {{ bindNoteTrainer(source_assessment, student.studentId) }} </td>
                                                        <td> {{ bindNoteQC(source_assessment, student.studentId) }} </td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        

                        <v-divider />
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" outlined @click="$router.push({ name: `bootcampgraduateapproval`})" :disabled="events.loading">
                                Back
                            </v-btn>
                            <v-btn color="error" v-if="isVisibled" @click="modalStatus = true" :disabled="events.loading || events.submit">
                                <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                                {{!events.loading || !events.submit ? 'Need Adjustment' : 'Loading'}}
                            </v-btn>
                            <v-btn color="primary" v-if="isVisibled"  @click="doSave()" :disabled="events.loading || events.submit">
                                <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                                {{!events.loading || !events.submit ? 'Approved' : 'Loading'}}
                            </v-btn>
                            <!-- // TESS -->
                            <!-- <v-btn color="primary" outlined @click="doTest()" :disabled="events.loading">
                                Test
                            </v-btn> -->
                            <!-- <v-btn color="primary" outlined @click="doTestSendNotif()" :disabled="events.loading">
                                Test Send Notify
                            </v-btn> -->
                        </v-card-actions>
                    </div>

                </v-card>
            </v-col>
        </v-row>    


        <v-dialog v-model="modalStatus" persistent max-width="1000">
            <v-card>
                <v-toolbar dark color="primary" >
                    <v-toolbar-title>Are you sure need adjustment ?</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="modalStatus = false" > Cancel </v-btn>
                    </v-toolbar-items>
                    <v-toolbar-items>
                        <v-btn dark text @click="doSaveNeedAdjustment" > Submit </v-btn>
                    </v-toolbar-items>
                </v-toolbar>

                <v-card-text class="text-md-body-1 pt-3">
                    <v-form v-model="form_error" ref="form" lazy-validation>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-textarea v-model="form.note"
                                            label="Note *"
                                            :rules="rules.note">
                                </v-textarea>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>

// import XaCardBootcampInformationBod from "@/components/xa/cardBootcampInformationBod";
import XaCardBootcampInformation4 from "@/components/xa/cardBootcampInformation4";

import { getBootcampDetail, getDetailBootcampAssessmentByBootcampId } from "@/services/bootcamp";
import { updateBootcampGraduateApproval, updateBootcampGraduateApprovalNeedAdjustment } from "@/services/bootcampgraduateapproval";
//

//utils
import errorMessage from "@/utils/notify-error";
import { dateToMoment } from "@/utils/form-parser";
import formatDate from "@/utils/format-date";

export default {
    name: "VueBootcampGraduateApprovalDetail",
    components: {
        // XaCardBootcampInformationBod,
        XaCardBootcampInformation4,
    },
    data(){
        return{
            source_bootcamp: {
                batch: null,
                technology: { name: null },
                trainer: { name: null },
                qc: { name: null },
                approver: { name: null },
                location: { name: null },
                periode: { startDate: null, endDate: null },
                students: [],
            },
            source_assessment:{

            },
            form: {
                userId: JSON.parse(localStorage.getItem("user")).id,
                nameOfBod: JSON.parse(localStorage.getItem("user")).name, 
                name: JSON.parse(localStorage.getItem("user")).name, 
                updatedBy: JSON.parse(localStorage.getItem("user")).id,
                note: null,
                bootcampStatus:null,
            },
            rules: {
                note: [ v => !!v || 'Adjusment Note is required' ],
            },
            loading: false,
            form_error: false,
            events: {
                    loading: true,
                    submit: false,
                },
            isVisibled: false,
            mycount:0,
            modalStatus: false,
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.doBindPage();
        }
    },
    methods:{
        dateToMoment,
        formatDate,
        doBindPage() {
            this.doGetBootcamp();
        },
        doGetBootcamp(){
            this.events.loading = true;

            getDetailBootcampAssessmentByBootcampId(this.$route.params.id)
            .then(response => {
                // console.log('----- GET BOOTCAMP & ASSESSMENT', response);
                this.source_assessment = response.assessments;
            })
            .catch(error => {
                this.events.loading = false;
                errorMessage(error);
            });


            getBootcampDetail(this.$route.params.id)
            .then(response => {

                setTimeout(() => {
                    this.source_bootcamp = response;
                    // console.log('----- GET BOOTCAMP DETAIL ', this.source_bootcamp);

                    // var newStudents = response.students.filter(x => 
                    //                                 ( x.approvalBOD == null && x.selections.some(o => o.title == 'FT1' && o.status == 'Failed') ) || 
                    //                                 ( x.approvalBOD == null && x.selections.some(o => o.title == 'FT2') ) || 
                    //                                 ( x.isBast == false  && x.selections.some(o => o.title == 'Extend' ) )
                    //                             );
                    // console.log('new student : ', newStudents);

                    // if(newStudents != undefined && newStudents.length > 0){
                    //     this.source_bootcamp.students = newStudents;
                    //     // newStudents.forEach(student => { this.form.listStudentId.push(student.studentId); });
                    //     this.isVisibled = true;
                    // }

                    // console.log('==> list student need approved', this.form.listStudentId);
                    if(response.bootcampStatus == 'ApprovalBOD' || response.bootcampStatus == 'ApprovalBODExtend'){
                        this.form.bootcampStatus = response.bootcampStatus;
                        this.isVisibled = true;
                    }

                    this.events.loading = false;
                }, 2000);
                
            })
            .catch(error => {
                this.events.loading = false;
                errorMessage(error);
            });
        },
        async doSave() {
                this.doUpdate();
        },
        async doUpdate() {
            //if (!this.$refs.form.validate()) return false; 
            this.events.loading = true;
            let payload = {...this.form, id : this.$route.params.id}
            console.log('==> payload', payload);
            await updateBootcampGraduateApproval(payload)
            .then(() => {
                localStorage.setItem("sendnotif", true);
                localStorage.setItem("sendnotifBootcampId", this.$route.params.id);
                setTimeout(() => {
                    this.events.loading = false;
                    this.events.submit = false;
                    this.saveSuccess();
                }, 2000);
            }).catch((error) => {
                this.events.loading = false;
                this.events.submit = false;
                errorMessage(error);
            })
        },
        async doSaveNeedAdjustment(){
            if (!this.$refs.form.validate()) return false;

            this.events.loading = true;
            this.events.submit = true;
            let payload = {...this.form, id : this.$route.params.id}
            console.log('==> Need Adjusment - payload', payload);
            setTimeout(() => {
                this.events.loading = false;
                this.events.submit = false;
                this.doNeedAdjustment();
            }, 2000);
        },
        async doNeedAdjustment(){
            this.events.loading = true;
            let payload = {...this.form, id : this.$route.params.id}
            console.log('==> payload', payload);
            await updateBootcampGraduateApprovalNeedAdjustment(payload)
            .then(() => {
                // localStorage.setItem("sendnotif", true);
                setTimeout(() => {
                    this.events.loading = false;
                    this.events.submit = false;
                    this.modalStatus = false;
                    this.saveSuccessAdjustment();
                }, 2000);
            }).catch((error) => {
                this.events.loading = false;
                this.events.submit = false;
                errorMessage(error);
            })
        },
        saveSuccess() {
            this.loading = false;
            this.$notify({
                title: "Successful",
                content: "Graduate Approval already saved!",
                color: "rgb(0, 200, 83)",
            });
            this.$router.push({ name: `bootcampgraduateapproval-send-notif`, params: { id: this.$route.params.id, sendnotif: true } });
        },
        saveSuccessAdjustment() {
            this.loading = false;
            this.$notify({
                title: "Successful",
                content: "Need Adjustment already saved!",
                color: "rgb(0, 200, 83)",
            });
            this.$router.push({ name: `bootcampgraduateapproval` });
        },
        bindNoteTrainer(sourceAssessments, studentId){
            const assessmentStudent = sourceAssessments.filter((x) => x.studentId == studentId);
            // console.log('===> sourceAssessments, studentId, assessment student ', sourceAssessments, studentId, assessmentStudent);

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
            // console.log('===> assessment student ', assessmentStudent);

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

        // ++++++ REGION GRIDVIEW ++++++
        rowStyleStudentFailed(student){
            var rowColorInit = '';
            const isFailed = (student.selections != undefined && student.selections.filter(o => o.status == 'Failed').length > 0 );
            const isPassedFT2 = (student.selections != undefined && student.selections.filter(o => o.title == 'FT2' && o.status == 'Passed').length > 0 );
            const isPassedExtend = (student.selections != undefined && student.selections.filter(o => o.title == 'Extend' && o.status == 'Passed').length > 0 );
            
            if(isPassedFT2) rowColorInit = 'green lighten-5';
            if(isFailed) rowColorInit = 'red lighten-5';
            if(isPassedExtend) rowColorInit = 'green lighten-5';
            // console.log('++++++++ nama - row init - is failed', student.name, rowColorInit, isFailed)
            return rowColorInit; 
        },
        // ++++++ END REGION GRIDVIEW ++++++

        // test
        // doTest(){
        //     localStorage.setItem("sendnotif", true);
        //     this.$router.push({ name: `bootcampgraduateapproval-send-notif`, params: { id: '002a1a6f-eb23-47c6-8d18-0382d12e73d3', sendnotif: true } });
        // },
        // doTestSendNotif(){
        //     localStorage.setItem("sendnotif", true);
        //     localStorage.setItem("sendnotifBootcampId", this.$route.params.id);
        //     this.$router.push({ name: `bootcampgraduateapproval` });
        // }
    }
}

</script>
