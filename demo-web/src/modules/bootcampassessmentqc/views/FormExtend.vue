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
                <v-card :loading="events.loading">

                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="12" class="grey--text font-weight-bold mt-5">Filtering Test III (Extend) asdasd asdasd</v-col>
                        </v-row>
                        <v-row class="mb-10">
                            <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Target 1</span></v-col>
                            <v-col cols="12" sm="1" >:</v-col>
                            <v-col cols="12" sm="3" >
                                <!-- <v-text-field v-model="form.target1"
                                    type="number"
                                    label="Target 1"
                                    prepend-icon=""
                                    disabled>
                                </v-text-field> -->
                                <v-label>{{ form.target1 }}</v-label>
                            </v-col>
                        </v-row>
                        <v-row class="mb-10">
                            <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Target 2</span></v-col>
                            <v-col cols="12" sm="1" >:</v-col>
                            <v-col cols="12" sm="3" >
                                <!-- <v-text-field v-model="form.target2"
                                    type="number"
                                    label="Target 2"
                                    prepend-icon=""
                                    disabled>
                                </v-text-field> -->
                                <v-label>{{ form.target2 }}</v-label>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Target 3</span></v-col>
                            <v-col cols="12" sm="1" >:</v-col>
                            <v-col cols="12" sm="3" >
                                <v-text-field v-model="form.target3"
                                    type="number"
                                    label="Target 3 *"
                                    prepend-icon=""
                                    :rules="rules.target3"
                                    @input="calculateValue()">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="mb-10">
                            <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Total</span></v-col>
                            <v-col cols="12" sm="1" >:</v-col>
                            <v-col cols="12" sm="3" >
                                <!-- <v-text-field v-model="form.totaltarget"
                                    type="number"
                                    label="Total"
                                    prepend-icon=""
                                    disabled>
                                </v-text-field> -->
                                <v-label>{{ form.totaltarget }}</v-label>
                            </v-col>
                        </v-row>
                        <v-row class="mb-10">
                            <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Realization 1</span></v-col>
                            <v-col cols="12" sm="1" >:</v-col>
                            <v-col cols="12" sm="3" >
                                <!-- <v-text-field v-model="form.realization1"
                                    type="number"
                                    label="Realization 1"
                                    prepend-icon=""
                                    disabled>
                                </v-text-field> -->
                                <v-label>{{ form.realization1 }}</v-label>
                            </v-col>
                        </v-row>
                        <v-row class="mb-10">
                            <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Realization 2</span></v-col>
                            <v-col cols="12" sm="1" >:</v-col>
                            <v-col cols="12" sm="3" >
                                <!-- <v-text-field v-model="form.realization2"
                                    type="number"
                                    label="Realization 2"
                                    prepend-icon=""
                                    disabled>
                                </v-text-field> -->
                                <v-label>{{ form.realization2 }}</v-label>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Realization 3</span></v-col>
                            <v-col cols="12" sm="1" >:</v-col>
                            <v-col cols="12" sm="3" >
                                <v-text-field v-model="form.realization3"
                                    type="number"
                                    label="Realization 3 *"
                                    prepend-icon=""
                                    :rules="rules.realization3"
                                    @input="calculateValue()">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="mb-8">
                            <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Total</span></v-col>
                            <v-col cols="12" sm="1" >:</v-col>
                            <v-col cols="12" sm="3" >
                                <!-- <v-text-field v-model="form.totalrealization"
                                    type="number"
                                    label="Total"
                                    prepend-icon=""
                                    disabled>
                                </v-text-field> -->
                                <v-label>{{ form.totalrealization }}</v-label>
                            </v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Selection Status</span></v-col>
                            <v-col cols="12" sm="1" >:</v-col>
                            <v-col cols="12" sm="3">
                                <v-select v-model="form.selectionStatus"
                                    prepend-icon=""
                                    :items="list_selectionstatus"
                                    :rules="rules.status"
                                    item-text="status"
                                    item-value="status"
                                    label="Status *"
                                    >
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
                                            :rules="rules.note">
                                </v-textarea>
                            </v-col>
                        </v-row> 
                    </v-card-text>

                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="$router.push({ name: 'detail-bootcampassessmentqc', params: { id: $route.params.id }})" :disabled="events.loading">
                            Back
                        </v-btn>
                        <v-btn color="primary" v-if="source_bootcamp.bootcampStatus=='Extend'" @click="doSave()" :disabled="events.loading || events.submit">
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
import { updateBootcampAssessmentExtend } from "@/services/bootcampassessmentqc";
import { getDetailBootcampAssessmentByStudent } from "@/services/bootcamp";

//utils
import errorMessage from "@/utils/notify-error";
import { dateToMoment } from "@/utils/form-parser";
import formatDate from "@/utils/format-date";

export default {
    name: "VueAssessmentExtend",
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
                //ft2: { 
                    target1: null, 
                    target2: null, 
                    target3: null, 
                    realization1: null, 
                    realization2: null, 
                    realization3: null, 
                    notePhase2: null, 
                //},
                selectionStatus: null, //Passed, Failed, Extend
                trainerNote: null,
                updatedBy: null,
            },
            rules: {
                target3: [ 
                            v => !!v || "Target 3 is required",
                            v => ( v && v >= 0 ) || "Target 3 should be above 0",
                            v => ( v && v <= 100 ) || "Max should not be above 100",
                        ],
                realization3: [ 
                            v => !!v || "Realization 3 is required",
                            v => ( v && v >= 0 ) || "Realization 3 should be above 0",
                            v => ( v && v <= 100 ) || "Max should not be above 100",
                        ],
                status: [ v => !!v || 'Status is required' ],
                note: [ v => !!v || 'Note is required' ],
            },
            list_selectionstatus: [
                { status: 'Passed' },
                { status: 'Failed' },
                { status: 'Extend' },
            ],
            loading: false,
            form_error: false,
            events: {
                loading: true,
                submit: false,
                status: false,
            },
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.doGetData();
        }
    },
    methods:{
        dateToMoment,
        formatDate,
        calculateValue() {
            this.form.totaltarget = Number.parseFloat(this.form.target1 ?? 0) + Number.parseFloat(this.form.target2 ?? 0) + Number.parseFloat(this.form.target3 ?? 0);
            this.form.totalrealization = Number.parseFloat(this.form.realization1 ?? 0) + Number.parseFloat(this.form.realization2 ?? 0) + Number.parseFloat(this.form.realization3 ?? 0);
        },
        doGetData() {
            this.events.loading = true
            getDetailBootcampAssessmentByStudent(this.$route.params.id, this.$route.params.studentid)
            // getBootcampDetail(this.$route.params.id)
            .then(response => {
                console.log('Form Extend => get data : ', response);
                this.source_bootcamp = response.bootcamp;
                let student = response.bootcamp.students.find(x => x.studentId == this.$route.params.studentid);
                
                // // fill model form
                if(student != undefined){
                    this.form.batch = response.bootcamp.batch;
                    this.form.studentId = student.studentId;
                    this.form.studentName = student.name;
                    this.form.updatedBy = JSON.parse(localStorage.getItem("user")).id;

                    this.form.trainerNote = (response.assessments != undefined) ? response.assessments.classrooms.notePhase2 : undefined; // untuk informasi note trainer

                    this.form.note = (response.assessments != undefined) ? response.assessments.ft2.notePhase2 : null; //tunggu ada BE
                    this.form.target1 = (response.assessments != undefined) ? response.assessments.ft2.target1 : null;
                    this.form.target2 = (response.assessments != undefined) ? response.assessments.ft2.target2 : null;
                    this.form.target3 = (response.assessments != undefined) ? response.assessments.ft2.target3 : null;
                    this.form.realization1 = (response.assessments != undefined) ? response.assessments.ft2.realization1 : null;
                    this.form.realization2 = (response.assessments != undefined) ? response.assessments.ft2.realization2 : null;
                    this.form.realization3 = (response.assessments != undefined) ? response.assessments.ft2.realization3 : null;
                    this.form.selectionStatus = (response.assessments != undefined) ? response.assessments.ft2.selectionStatus : null; // CEK BE nya ?

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

            // if (!this.$refs.form.validate()) return false; 
            this.events.loading = true;
            
            let payload = {...this.form, id : this.$route.params.id};
            console.log('Save payload : ', payload);

            await updateBootcampAssessmentExtend(payload) // CEK BE nya ?
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
                content: "Assessment Extend already saved!",
                color: "rgb(0, 200, 83)",
            });
            this.$router.push({ name: 'detail-bootcampassessmentqc', params: { id: this.$route.params.id }});
        },
    }
}

</script>
