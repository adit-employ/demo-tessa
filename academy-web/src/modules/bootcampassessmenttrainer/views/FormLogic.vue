<template>
    <div>

        <v-row>
            <v-col cols="12" sm="12">
                <v-card :loading="events.loading">
                    <xa-card-assessment-trainer-student-information :source="source_bootcamp" :form="form"></xa-card-assessment-trainer-student-information>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12" sm="12">
                <v-card :loading="events.loading" >
                    <v-form v-model="form_error" ref="form" lazy-validation>
                        <template v-if="form.assessments !=undefined && form.assessments.length > 0">
                            <template v-if="form.assessments.filter(x => x.type == 'Soft Skill').length > 0">
                                <v-card-text>
                                    <v-row >
                                        <v-col cols="12" sm="12" class="grey--text font-weight-bold mt-5">Soft Skill (5%)</v-col>
                                    </v-row>
                                    <v-row v-for="item in form.assessments.filter(x => x.type == 'Soft Skill')" :key="item.classroomId">
                                        <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">{{ item.title }} ({{ item.percentageWeight }}%)</span><br>{{ item.desc }}</v-col>
                                        <v-col cols="12" sm="1" >:</v-col>
                                        <v-col cols="12" sm="3" >
                                            <v-select v-model="item.range"
                                                prepend-icon=""
                                                :items="list_value"
                                                :rules="rules.value"
                                                item-text="name"
                                                item-value="value"
                                                label="Range *"
                                                :disabled="disabledForm">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </template>

                            <template v-if="form.assessments.filter(x => x.type == 'Technical').length > 0">
                                <v-card-text>
                                    <v-row >
                                        <v-col cols="12" sm="12" class="grey--text font-weight-bold mt-5">Soft Skill (5%)</v-col>
                                    </v-row>
                                    <v-row v-for="item in form.assessments.filter(x => x.type == 'Technical')" :key="item.classroomId">
                                        <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">{{ item.title }} ({{ item.percentageWeight }}%)</span><br>{{ item.desc }}</v-col>
                                        <v-col cols="12" sm="1" >:</v-col>
                                        <v-col cols="12" sm="3" >
                                            <v-select v-model="item.range"
                                                prepend-icon=""
                                                :items="list_value"
                                                :rules="rules.value"
                                                item-text="name"
                                                item-value="value"
                                                label="Range *"
                                                :disabled="disabledForm">
                                            </v-select>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </template>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-textarea v-model="form.note"
                                                    label="Note *"
                                                    prepend-icon="mdi-format-text"
                                                    :rules="rules.note"
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
                        <v-btn color="primary" outlined @click="$router.push({ name: 'detail-bootcampassessmenttrainer', params: { id: $route.params.id }})" :disabled="events.loading">
                            Back
                        </v-btn>
                        <v-btn  color="primary" @click="doSave()" 
                                v-if="source_bootcamp.bootcampStatus=='Phase_1'" 
                                :disabled="events.loading || events.submit">
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

import XaCardAssessmentTrainerStudentInformation from "@/components/xa/cardAssessmentTrainerStudentInformation";

// import { getBootcampDetail } from "@/services/bootcamp";
import { updateAssessmentClassroomLogic } from "@/services/bootcampassessmenttrainer";
import { getDetailBootcampAssessmentByStudent } from "@/services/bootcamp";
import { getAssessmentClassroomAll } from "@/services/assessmentclassroom";

//utils
import errorMessage from "@/utils/notify-error";
import { dateToMoment } from "@/utils/form-parser";
import formatDate from "@/utils/format-date";

export default {
    name: "VueAssessmentLogic",
    components: {
        XaCardAssessmentTrainerStudentInformation,
    },
    data(){
        return{
            source_bootcamp: {
                batch: null,
                technology: { name: null },
                location: { name: null },
                students: [],
            },
            assessment: {}, //tunggu ada BE
            form: {
                batch: null,
                studentId: null,
                studentName: null,
                note: null, 
                assessments: [],
                classroom: { 
                    notePhase1: null, 
                    details: [],
                },
                updatedBy: null,
            },
            rules: {
                value: [ v => !!v || 'Range is required' ],
                note: [ v => !!v || 'Note is required' ],
            },
            list_value: [
                { name: 'Kurang Sekali', value: 1 },
                { name: 'Kurang', value: 2 },
                { name: 'Baik', value: 3 },
                { name: 'Baik Sekali', value: 4 },
            ],
            loading: false,
            form_error: false,
            source_classroomDetails: [],
            events: {
                loading: true,
                submit: false,
                status: false,
            },
            disabledForm: true,
        }
    },
    mounted() {
        this.doGetSourceClassroom();
        if (this.$route.params.id) {
            setTimeout(() => {
                this.doGetData();
            }, 2000);
        }
    },
    methods:{
        dateToMoment,
        formatDate,
        doGetSourceClassroom() {
            this.events.loading = true;
            getAssessmentClassroomAll()
                .then((response) => {
                    // Phase_1
                    // console.log('Page form logic => master assessment: ', response);
                    response.items.filter(x => x.phase == 'Phase_1' && (x.type == 'Soft Skill' || x.type == 'Technical')).forEach((item) => {
                        const classroom = {};
                        classroom['classroomId'] = item.id;
                        classroom['phase'] = item.phase; // ini knp phase, bkn phase ?
                        classroom['type'] = item.type;
                        classroom['title'] = item.title;
                        classroom['desc'] = item.desc;
                        classroom['percentageWeight'] = item.percentageWeight;
                        classroom['range'] = null; //
                        this.source_classroomDetails.push(classroom);
                    });

                    // console.log('master classroom : ', this.source_classroomDetails);
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
                console.log('___ Ambil data dari DB (Bootcamp & Assessment)', response);
                this.source_bootcamp = response.bootcamp;
                let student = response.bootcamp.students.find(x => x.studentId == this.$route.params.studentid);
                this.disabledForm = (this.source_bootcamp.bootcampStatus == 'Phase_1') ? false : true;

                // // fill model form
                if(student != undefined){
                    this.form.batch = response.bootcamp.batch;
                    this.form.studentId = student.studentId;
                    this.form.studentName = student.name;
                    this.form.updatedBy = JSON.parse(localStorage.getItem("user")).id;

                    let getDetails = (response.assessment != undefined) ? response.assessment.classrooms.detailAssessments : undefined; //tunggu ada BE
                    this.form.note = (response.assessment != undefined) ? response.assessment.classrooms.notePhase1 : null; //tunggu ada BE


                    console.log('before form : ', this.form);
                    console.log('getDetails : ', getDetails);
                    this.source_classroomDetails.forEach(item => {

                        if(getDetails == undefined){
                            console.log('id  "', item.classroomId, '" tidak ada');  
                            const detail = {};
                            detail['classroomId'] = item.classroomId;
                            detail['phase'] = item.phase;
                            detail['type'] = item.type;
                            detail['title'] = item.title;
                            detail['desc'] = item.desc;
                            detail['percentageWeight'] = item.percentageWeight;
                            detail['range'] = null; //range ngg perlu ada di master
                            // console.log('masuk if : ', detail);

                            this.form.assessments.push(detail);      
                        }
                        else{
                            let a = getDetails.find((x) => x.classroomId === item.classroomId)
                            console.log('a => ', a);
                            if(getDetails != undefined && a != undefined){
                                console.log('id  "', a.classroomId, '" ada'); 
                                const detail = {};
                                detail['classroomId'] = a.classroomId;
                                detail['phase'] = a.phase;
                                detail['type'] = a.type;
                                detail['title'] = a.title;
                                detail['desc'] = a.desc;
                                detail['percentageWeight'] = a.percentageWeight;
                                detail['range'] = a.range; //range ngg perlu ada di master
                                // console.log('masuk if : ', detail);

                                this.form.assessments.push(detail);  
                            }else{
                                console.log('id  "', item.classroomId, '" tidak ada');  
                                const detail = {};
                                detail['classroomId'] = item.classroomId;
                                detail['phase'] = item.phase;
                                detail['type'] = item.type;
                                detail['title'] = item.title;
                                detail['desc'] = item.desc;
                                detail['percentageWeight'] = item.percentageWeight;
                                detail['range'] = null; //range ngg perlu ada di master
                                // console.log('masuk if : ', detail);

                                this.form.assessments.push(detail);  
                            }
                        }

                        
                        
                    });

                    console.log('form : ', this.form);
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
            console.log('Save : ', this.form);
            // console.log('Save validate : ', this.$refs.form.validate());

            if (!this.$refs.form.validate()) return false; 
            this.events.loading = true;
            
            let payload = {...this.form, id : this.$route.params.id};
            console.log('Save payload : ', payload);

            await updateAssessmentClassroomLogic(payload)
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
                content: "Assessment Logic already saved!",
                color: "rgb(0, 200, 83)",
            });
            this.$router.push({ name: 'detail-bootcampassessmenttrainer', params: { id: this.$route.params.id }});
        },
    }
}

</script>
