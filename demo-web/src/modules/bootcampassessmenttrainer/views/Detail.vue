<template>
    <div>
        <v-row>
            <v-col cols="12" sm="12">

                <v-card :loading="events.loading">
                    <xa-card-bootcamp-information-trainer :source="data_bind"></xa-card-bootcamp-information-trainer>
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
                                    <v-simple-table dense class="grey--text">
                                    <template v-slot:default v-if="source_bootcamp.students != undefined">
                                    <thead>
                                        <tr>
                                            <th class="text-left">Name</th>
                                            <th class="text-left">Non-Technical Assessment (15%)</th>
                                            <th class="text-left">Technical Assessment (45%)</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead> 
                                        <tbody v-for="student in source_bootcamp.students" :key="student.studentId" >
                                            <tr v-if="checkStudentToShow(student)" :class="rowStyleStudentFailed(student)">
                                                <td>{{ student.name }}</td>
                                                <td> <template v-if="student.assessmentSummary != null && student.assessmentSummary.softSkill > 0">{{ student.assessmentSummary.softSkill }}</template> </td>
                                                <td> <template v-if="student.assessmentSummary != null && student.assessmentSummary.technical > 0">{{ student.assessmentSummary.technical }}</template> </td>
                                                
                                                <td>
                                                    <template>
                                                        <v-tooltip bottom v-if="actionButtomSoftSkillShow(source_bootcamp.bootcampStatus)">
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn icon v-on="on"
                                                                    :color="actionButtomSoftSkillColor(source_bootcamp.bootcampStatus, student)"
                                                                    @click="openFormSoftSkill(student.studentId)">
                                                                    <v-icon>{{ actionButtomIcon(source_bootcamp.bootcampStatus, 'Phase_1') }}</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Assessment Classroom Logic</span>
                                                        </v-tooltip>
                                                        <v-tooltip bottom v-if="actionButtomTechSkillShow(source_bootcamp.bootcampStatus, student)">
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn icon v-on="on"
                                                                    :color="actionButtomTechSkillColor(source_bootcamp.bootcampStatus, student)"
                                                                    @click="openFormTeknis(student.studentId)">
                                                                    <v-icon>{{ actionButtomIcon(source_bootcamp.bootcampStatus, 'Phase_2') }}</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Assessment Classroom Technology</span>
                                                        </v-tooltip>
                                                    </template>
                                                    
                                                </td>
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
                        <v-btn color="primary" outlined @click="doBack()" :disabled="events.loading">
                            Back
                        </v-btn>
                        <v-btn color="primary"  @click="doSave()" 
                            v-if="source_bootcamp.bootcampStatus=='Phase_1' || source_bootcamp.bootcampStatus=='Phase_2'"
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

import XaCardBootcampInformationTrainer from "@/components/xa/cardBootcampInformationTrainer";
import { getBootcampDetail, updateBootcampChangeStatus } from "@/services/bootcamp";

//utils
import errorMessage from "@/utils/notify-error";

export default {
    name: "VueBootcampAssessmentTrainerDetail",
    components: {
        XaCardBootcampInformationTrainer,
    },
    data(){
        return{
            form: {
                id: this.$route.params.id,
                bootcampStatus: null,
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
                qc: { name: null },
                periode: { startDate: null, endDate: null },
            },
            source_bootcamp: {},
        }
    },
    mounted() {
        setTimeout(() => {
            this.doGetData();
        }, 1500);
    },
    methods:{
        doGetData() {
            this.events.loading = true
            getBootcampDetail(this.$route.params.id)
            .then(response => {
                this.source_bootcamp = response;
                this.data_bind = response;
                console.log('source_bootcamp 1 : ', this.source_bootcamp);

                this.doCheckStudentHasAssessmentAll(response);

                this.events.loading = false
            })
            .catch(error => {
                this.events.loading = false
                errorMessage(error);
            });
        },
        doCheckStudentHasAssessmentAll(source){
            // console.log('trace ==> 1', source);
            this.isDisabled = false;

            if(source != undefined && source.students != undefined && source.students.length > 0){
                // console.log('trace ==> 2');

                this.source_bootcamp.students.forEach((student) => {
                    if(student.recordStatus == 'Active'){

                        if(source.bootcampStatus == 'Phase_1'){
                            this.form.bootcampStatus = 'FT_1';
                            const checkAssessmentLogic = (student.assessmentSummary == undefined || student.assessmentSummary.softSkill <= 0 );
                            // console.log('========== ASSESSMENT ========== nama, status', student.name, checkAssessmentLogic, student);
                            if(checkAssessmentLogic) return this.isDisabled = true;
                        }
                        else if(source.bootcampStatus == 'Phase_2'){
                            this.form.bootcampStatus = 'FT_2';
                            const passedFT1 = (student.selections.findIndex(p => p.title == 'FT1' && p.status == 'Passed')) == 0;
                            const checkAssessmentTechnical = (student.assessmentSummary == undefined || ( passedFT1 && student.assessmentSummary.technical <= 0 ) );
                            if(checkAssessmentTechnical) return this.isDisabled = true;
                        }

                    }
                });
            }
        },
        async doSave() {
            this.events.loading = true;
            this.events.submit = true;


            this.form_submit = this.form;
            console.log('form : ', this.form);
            console.log('form submit : ', this.form_submit);

            updateBootcampChangeStatus(this.form_submit)
                .then(() => {
                    setTimeout(() => {
                        this.saveSuccess();
                        this.events.loading = false;
                        this.events.submit = false;
                        this.$router.push({ name: 'bootcampassessmenttrainer'});
                    }, 2000);
                    
                }).catch((error) => {
                    this.events.loading = false;
                    this.events.submit = false;
                    errorMessage(error);
                })
        },
        saveSuccess() {
            this.$notify({
                title: "Successful",
                content: "Bootcamp Assessment Trainer already submitted!",
                color: "rgb(0, 200, 83)",
            });
        },
        openFormSoftSkill(studentId){
            this.$router.push({ 
                name: 'form-logic-assessment', 
                params: { id: this.$route.params.id, studentid: studentId } }
            );
        },
        openFormTeknis(studentId){
            this.$router.push({
                name: 'form-technology-assessment',
                params: { id: this.$route.params.id, studentid: studentId }
            }); 
        },
        doBack(){
            this.$router.push({ 
                name: `bootcampassessmenttrainer`
            })
        },
        checkStudentToShow(student){
            return (student.recordStatus == 'Removed') ? false : true;
        },
        rowStyleStudentFailed(student){
            const isFailed = (student.selections != undefined && student.selections.filter(o => o.status == 'Failed').length > 0 );
            return isFailed ? 'red lighten-5' : ''; 
            // return isFailed ? 'red--text text--lighten-3' : ''; 
        },
        actionButtomIcon(currentStatus, targetStatus){
            return (currentStatus == targetStatus) ? 'mdi mdi-clipboard-edit-outline' : 'mdi mdi-clipboard-check-outline';
        },
        actionButtomSoftSkillShow(bootcampStatus){
            return (bootcampStatus == 'Created' || bootcampStatus == 'Approval' || bootcampStatus == 'Approved') ? false : true;
        },
        actionButtomSoftSkillColor(bootcampStatus, student){
            const booleanBootcampStatus = (bootcampStatus == 'Phase_1') ? true : false;
            const booleanStudentHasAssessment = (student.assessmentSummary != undefined && student.assessmentSummary.softSkill > 0);

            if(booleanBootcampStatus && booleanStudentHasAssessment){ return 'success' }
            else if(booleanBootcampStatus){ return 'primary' }
            else { return 'grey' }
        },
        actionButtomTechSkillShow(bootcampStatus, student){
            const booleanBootcampStatus = (bootcampStatus == 'Created' || bootcampStatus == 'Approval' || bootcampStatus == 'Approved' || bootcampStatus == 'Phase_1' || bootcampStatus == 'FT_1') ? false : true;
            const booleanStudentPassedFT1 = (student.selections != undefined && student.selections.findIndex(p => p.title == 'FT1' && p.status == 'Passed') ) == 0;
            
            return (booleanBootcampStatus && booleanStudentPassedFT1) ? true : false ;
        },
        actionButtomTechSkillColor(bootcampStatus, student){
            const booleanBootcampStatus = (bootcampStatus == 'Phase_2') ? true : false;
            const booleanStudentHasAssessment = (student.assessmentSummary != undefined && student.assessmentSummary.technical > 0);

            if(booleanBootcampStatus && booleanStudentHasAssessment){ return 'success' }
            else if(booleanBootcampStatus){ return 'primary' }
            else{ return 'grey' }
        },

    }
}

</script>
