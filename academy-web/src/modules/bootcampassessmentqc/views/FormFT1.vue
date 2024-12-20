<template>
    <div>

        <v-row>
            <v-col cols="12" sm="12">
                <v-card :loading="events.loading">
                    <xa-card-assessment-qc-student-information :source="source_bootcamp" :form="form"></xa-card-assessment-qc-student-information>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="12">
                <v-card :loading="events.loading" >

                    <v-form v-model="form_error" ref="form" lazy-validation>
                        <template v-if="form.assessments != undefined && form.assessments.length > 0">
                            <template v-if="form.assessments.length > 0">
                                <v-card-text>
                                    <v-row >
                                        <v-col cols="12" sm="12" class="grey--text font-weight-bold mt-5">Filtering Test I (15%)</v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Soft Skill (5%)</span></v-col>
                                        <v-col cols="12" sm="1" >:</v-col>
                                        <v-col cols="12" sm="3" >
                                            <v-text-field v-model="percentageSoftSkill"
                                                type="number"
                                                label="Percentage Value *"
                                                prepend-icon=""
                                                suffix="%"
                                                dense :disabled="true">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row v-for="item in form.assessments" :key="item.ftId">
                                        <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">{{ item.title }} ({{ item.percentageWeight }}%)</span></v-col>
                                        <v-col cols="12" sm="1" >:</v-col>
                                        <v-col cols="12" sm="3" >
                                            <v-text-field v-model="item.percentageValue"
                                                type="number"
                                                label="Percentage Value *"
                                                prepend-icon=""
                                                :rules="[rules.required(item.percentageValue), rules.min(item.percentageValue), rules.max(item.percentageValue, item.percentageWeight)]"
                                                suffix="%"
                                                dense
                                                :disabled="disabledForm">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </template>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Selection Status</span></v-col>
                                    <v-col cols="12" sm="1" >:</v-col>
                                    <v-col cols="12" sm="3">
                                        <v-select v-model="form.selection.status"
                                            prepend-icon=""
                                            :items="list_selectionstatus"
                                            :rules="rules.status"
                                            item-text="status"
                                            item-value="status"
                                            label="Status *"
                                            dense
                                            :disabled="disabledForm">
                                        </v-select>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-textarea v-model="form.note"
                                                    label="Note *"
                                                    prepend-icon="mdi-format-text"
                                                    :rules="rules.note"
                                                    dense
                                                    :disabled="disabledForm">
                                        </v-textarea>
                                    </v-col>
                                </v-row> 
                            </v-card-text>
                        </template>
                    </v-form>


                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="$router.push({ name: 'detail-bootcampassessmentqc', params: { id: $route.params.id }})" :disabled="events.loading">
                            Back
                        </v-btn>
                        <v-btn color="primary" v-if="source_bootcamp.bootcampStatus=='FT_1'" @click="doSave()" :disabled="events.loading || events.submit">
                            <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                            {{!events.loading || !events.submit ? 'Save' : 'Loading'}}
                        </v-btn>
                    </v-card-actions>
                    
                </v-card>
            </v-col>
        </v-row>    
        
    </div>
    
</template>

<script>

import XaCardAssessmentQcStudentInformation from "@/components/xa/cardAssessmentQcStudentInformation";

// import { getBootcampDetail } from "@/services/bootcamp";
//updateBootcampAssessmentFT1
import { updateBootcampAssessmentFT1 } from "@/services/bootcampassessmentqc";
import { getDetailBootcampAssessmentByStudent } from "@/services/bootcamp";
import { getAssessmentFilteringTestAll } from "@/services/assessmentfilteringtest";

//utils
import errorMessage from "@/utils/notify-error";
import { dateToMoment } from "@/utils/form-parser";
import formatDate from "@/utils/format-date";

export default {
    name: "VueAssessmentFT1",
    components: {
        XaCardAssessmentQcStudentInformation,
    },
    data(){
        return{
            source_bootcamp: {
                batch: null,
                technology: { name: null },
                location: { name: null },
                trainer: { name: null },
                students: [],
            },
            form: {
                batch: null,
                studentId: null,
                studentName: null,
                note: null, 
                assessments: [],
                // ft1: { 
                //     notePhase1: null, 
                //     details: [],
                // },
                selection: {
                    title: null,
                    status: null, //Passed, Failed, Extend
                },
                trainerNote: null,
                updatedBy: null,
                bootcampAssessmentId: null,
                // percentageSoftSkill: 0,
            },
            rules: {
                required(v) {
                    return !!v || `Percentage Value is required`;
                },
                min(v) {
                    return (v && v >= 0) || `Percentage Value should be above 0`;
                },
                max(v, max) {
                    return (v || "") <= max || `Max should not be above ${max}`;
                },
                status: [ v => !!v || 'Status is required' ],
                note: [ v => !!v || 'Note is required' ],
            },
            list_selectionstatus: [
                { status: 'Passed' },
                { status: 'Failed' },
            ],
            loading: false,
            form_error: false,
            source_ft1Details: [],
            events: {
                loading: true,
                submit: false,
                status: false,
            },
            disabledForm: true,
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.doGetSourceFilteringTest();
            setTimeout(() => {
                this.doGetData();
            }, 2000);
        }
    },
    methods:{
        dateToMoment,
        formatDate,
        doGetSourceFilteringTest() {
                this.events.loading = true;
                getAssessmentFilteringTestAll()
                    .then((response) => {
                        // console.log('==> master FT1: ', response);
                        response.items.forEach((item) => {
                            if(item.recordStatus == 'Active'){
                                const ft1 = {};
                                ft1['ftId'] = item.id;
                                ft1['title'] = item.title;
                                ft1['percentageWeight'] = item.percentageWeight;
                                ft1['percentageValue'] = null; //
                                this.source_ft1Details.push(ft1);
                            }
                        });

                        // console.log('==> Source FT1 : ', this.source_ft1Details);
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage('error master', error);
                })
            },
        doGetData() {
            this.events.loading = true
            getDetailBootcampAssessmentByStudent(this.$route.params.id, this.$route.params.studentid)
            // getBootcampDetail(this.$route.params.id)
            .then(response => {
                // console.log('==> Data DB : ', response);
                
                this.source_bootcamp = response.bootcamp;
                let bootcampAssessment = response.assessment;
                let student = response.bootcamp.students.find(x => x.studentId == this.$route.params.studentid);
                // console.log('==> student : ', student);
                // console.log('==> Assessment : ', bootcampAssessment);
                
                this.disabledForm = (this.source_bootcamp.bootcampStatus == 'FT_1') ? false : true;

                // // fill model form
                if(student != undefined){
                    this.form.batch = response.bootcamp.batch;
                    this.form.studentId = student.studentId;
                    this.form.studentName = student.name;
                    this.form.updatedBy = JSON.parse(localStorage.getItem("user")).id;
                    this.form.trainerNote = bootcampAssessment.classrooms.notePhase1; // untuk informasi note trainer
                    this.percentageSoftSkill = (student.assessmentSummary.softSkill != undefined) ? student.assessmentSummary.softSkill : 0;

                    this.form.bootcampAssessmentId = (bootcampAssessment != undefined ) ? bootcampAssessment.id : null; //tunggu ada BE
                    
                    //this.form.selection  = (student.selections.some(x => x.title == 'FT1'))? student.selections.find(x => x.title == 'FT1') : { title: 'FT1', status: null } ;
                    this.form.selection  = (student.selections != undefined && student.selections.some(x => x.title == 'FT1'))? student.selections.find(x => x.title == 'FT1') : { title: 'FT1', status: null } ;
                    
                    //this.form.note = (bootcampAssessment.fT1.notePhase1 != undefined)? bootcampAssessment.fT1.notePhase1 : ''; //tunggu ada BE
                    this.form.note = (bootcampAssessment.fT1 != undefined && bootcampAssessment.fT1.notePhase1 != undefined)? bootcampAssessment.fT1.notePhase1 : ''; //tunggu ada BE
                
                    let getDetails = (response.assessment != undefined && response.assessment.fT1 != undefined) ? response.assessment.fT1.detailAssessments : undefined; //tunggu ada BE

                    // console.log('==> form : ', this.form);
                    // console.log('==> detail assessment : ', getDetails);
                //     // console.log('Page FT1 => get assessment db : ', getDetails);
                    this.source_ft1Details.forEach(item => {
                        // console.log('Page FT1 => loop master assessment : ', item);

                        if(getDetails == undefined){
                            // console.log('id  "', item.ftId, '" tidak ada');  
                            const detail = {};
                            detail['ftId'] = item.ftId;
                            detail['title'] = item.title;
                            detail['percentageWeight'] = item.percentageWeight;
                            detail['percentageValue'] = null; //
                            // console.log('masuk if : ', detail);

                            this.form.assessments.push(detail);      
                        }
                        else{
                            let a = getDetails.find((x) => x.ftId === item.ftId)
                            // console.log('a => ', a);
                            if(getDetails != undefined && a != undefined){
                                // console.log('id  "', a.ftId, '" ada'); 
                                const detail = {};
                                detail['ftId'] = a.ftId;
                                detail['title'] = a.title;
                                detail['percentageWeight'] = a.percentageWeight;
                                detail['percentageValue'] = a.percentageValue; //
                                // console.log('masuk if : ', detail);

                                this.form.assessments.push(detail);  
                            }else{
                                // console.log('id  "', item.ftId, '" tidak ada');  
                                const detail = {};
                                detail['ftId'] = item.ftId;
                                detail['title'] = item.title;
                                detail['percentageWeight'] = item.percentageWeight;
                                detail['percentageValue'] = item.percentageValue; //
                                // console.log('masuk if : ', detail);

                                this.form.assessments.push(detail);  
                            }
                        }
                        
                    });

                    // console.log('==> form 2 : ', this.form);

                }

                this.events.loading = false;
            })
            .catch(error => {
                this.events.loading = false;
                errorMessage('error getting data', error);
            });
        },
        async doSave() {
            this.doUpdate();
        },
        async doUpdate() {
            // console.log('Page FT1 => submit form : ', this.form);
            // console.log('Save validate : ', this.$refs.form.validate());

            if (!this.$refs.form.validate()) return false; 
            this.events.loading = true;
            
            let payload = {...this.form, id : this.$route.params.id};
            // console.log('Save payload : ', payload);

            await updateBootcampAssessmentFT1(payload)
                .then(() => {
                    this.events.loading = false;
                    this.events.submit = true;
                    this.saveSuccess();
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
                content: "Assessment Filtering Test I already saved!",
                color: "rgb(0, 200, 83)",
            });
            this.$router.push({ name: 'detail-bootcampassessmentqc', params: { id: this.$route.params.id }});
        },
    }
}

</script>
