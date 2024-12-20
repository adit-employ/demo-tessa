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
                    <v-form v-model="form_error" ref="form" lazy-validation>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="12" class="grey--text font-weight-bold mt-5">Filtering Test II (25%)</v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Target 1</span></v-col>
                                <v-col cols="12" sm="1" >:</v-col>
                                <v-col cols="12" sm="3" >
                                    <v-text-field v-model="form.target1"
                                        type="number"
                                        label="Target 1 *"
                                        prepend-icon=""
                                        :rules="[rules.numberIsFloat(form.target1), ...rules.target1]"
                                        @input="calculateValue()"
                                        dense
                                        :disabled="disabledForm">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Target 2</span></v-col>
                                <v-col cols="12" sm="1" >:</v-col>
                                <v-col cols="12" sm="3" >
                                    <v-text-field v-model="form.target2"
                                        type="number"
                                        label="Target 2 *"
                                        prepend-icon=""
                                        :rules="[rules.numberIsFloat(form.target2), ...rules.target2]"
                                        @input="calculateValue()"
                                        dense
                                        :disabled="disabledForm">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mb-10">
                                <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Total</span></v-col>
                                <v-col cols="12" sm="1" >:</v-col>
                                <v-col cols="12" sm="3" >
                                    <v-label>{{ form.totaltarget }}</v-label><br>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Realization 1</span></v-col>
                                <v-col cols="12" sm="1" >:</v-col>
                                <v-col cols="12" sm="3" >
                                    <v-text-field v-model="form.realization1"
                                        type="number"
                                        label="Realization 1 *"
                                        prepend-icon=""
                                        :rules="[rules.numberIsFloat(form.realization1), rules.required(form.realization1), rules.min(form.realization1), rules.max(form.totalrealization, form.totaltarget)]"
                                        @input="calculateValue()"
                                        dense
                                        :disabled="disabledForm">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Realization 2</span></v-col>
                                <v-col cols="12" sm="1" >:</v-col>
                                <v-col cols="12" sm="3" >
                                    <v-text-field v-model="form.realization2"
                                        type="number"
                                        label="Realization 2 *"
                                        prepend-icon=""
                                        :rules="[rules.numberIsFloat(form.realization2), rules.required(form.realization2), rules.min(form.realization2), rules.max(form.totalrealization, form.totaltarget)]"
                                        @input="calculateValue()"
                                        dense
                                        :disabled="disabledForm">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row v-if="source_bootcamp.bootcampStatus == 'Extend'">
                                <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Realization 3</span></v-col>
                                <v-col cols="12" sm="1" >:</v-col>
                                <v-col cols="12" sm="3" >
                                    <v-text-field v-model="form.realization3"
                                        type="number"
                                        label="Realization 3 *"
                                        prepend-icon=""
                                        :rules="[rules.numberIsFloat(form.realization3), rules.required(form.realization3), rules.max(form.totalrealization, form.totaltarget)]"
                                        @input="calculateValue()"
                                        dense
                                        :disabled="disabledForm">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="mb-8">
                                <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Total</span></v-col>
                                <v-col cols="12" sm="1" >:</v-col>
                                <v-col cols="12" sm="3" >
                                    <v-label>{{ form.totalrealization }}</v-label>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="8" ><span class="grey--text font-weight-bold">Selection Status</span></v-col>
                                <v-col cols="12" sm="1" >:</v-col>
                                <v-col cols="12" sm="3">
                                    

                                    <v-select v-if="source_bootcamp.bootcampStatus == 'Extend'"
                                        v-model="form.selection.status"
                                        prepend-icon=""
                                        :items="list_selectionstatusExtend"
                                        :rules="rules.status"
                                        item-text="status"
                                        item-value="status"
                                        label="Status *"
                                        dense
                                        :disabled="disabledForm">
                                    </v-select>
                                    <v-select v-else
                                        v-model="form.selection.status"
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
                    </v-form>
                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="$router.push({ name: 'detail-bootcampassessmentqc', params: { id: $route.params.id }})" :disabled="events.loading">
                            Back
                        </v-btn>
                        <v-btn color="primary" v-if="!disabledForm" @click="doSave()" :disabled="events.loading || events.submit || disabledButtonSave">
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
// updateBootcampAssessmentFT2
import { updateAssessmentFT2 } from "@/services/bootcampassessmentqc";
import { getDetailBootcampAssessmentByStudent } from "@/services/bootcamp";

//utils
import errorMessage from "@/utils/notify-error";
import { dateToMoment } from "@/utils/form-parser";
import formatDate from "@/utils/format-date";

export default {
    name: "VueAssessmentFT2",
    components: {
        XaCardAssessmentQcStudentInformation,
    },
    data(){
        return{
            numberLength: 2,
            counter: 0,
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
                target1: '0', 
                target2: '0', 
                realization1: '0', 
                realization2: '0', 
                realization3: '0', 
                totaltarget: null,
                totalrealization: null,
                selection: {
                    title: null,
                    status: null, //Passed, Failed, Extend
                },
                trainerNote: '',
                updatedBy: null,
            },
            rules: {
                target1: [ 
                            v => !!v || "Target 1 is required",
                            v => ( v && v >= 0 ) || "Target 1 should be above 0",
                            v => ( v && v <= 25 ) || "Max should not be above 25",
                            // v => {
                            //     const position = v.search(/[.,]/);
                            //     const decimalValue = v.substring(position+1).length;
                            //     const isNotDecimal = position < 0
                            //     //const isDecimalLimit = !isNotDecimal && decimalValue > 0  && decimalValue <= 3

                            //     //console.log('===> ', position, decimalValue, 'isNotDecimal : ',isNotDecimal, ' isDecimalLimit : ', isDecimalLimit )

                            //     if( isNotDecimal && v.length < 3 ) return true
                            //     if ( !isNotDecimal &&  decimalValue <= 3 ) return true
                            //     // if(position != -1 && decimalValue > 0  && decimalValue <= 3  ) return true

                            //     return 'Max length should not be above 3'
                            // },
                        ],
                target2: [ 
                            v => !!v || "Target 2 is required",
                            v => ( v && v >= 0 ) || "Target 2 should be above 0",
                            v => ( v && v <= 25 ) || "Max should not be above 25",
                        ],
                required(v) {
                    return !!v || `Realization is required`;
                },
                min(v) {
                    return (v && v >= 0) || `Realization should be above 0`;
                },
                max(v, max) {
                    return (v || "") <= max || `Total Realization should not be above Total Target ${max}`;
                },
                numberIsFloat(v){
                    const position = v.search(/[.,]/);
                    const decimalValue = v.substring(position+1).length
                    const isNotDecimal = position < 0

                    if( isNotDecimal && v.length < 3 ) return true
                    if ( !isNotDecimal &&  decimalValue <= 3 ) return true
                    return "Max length should not be above 3"
                },
                status: [ v => !!v || 'Status is required' ],
                note: [ v => !!v || 'Note is required' ],
            },
            list_selectionstatus: [
                { status: 'Passed' },
                { status: 'Failed' },
                { status: 'Extend' },
            ],
            list_selectionstatusExtend: [
                { status: 'Passed' },
                { status: 'Failed' },
            ],
            loading: false,
            form_error: false,
            events: {
                loading: true,
                submit: false,
                status: false,
            },
            disabledButtonSave: true,
            disabledForm: true,
        }
    },
    mounted() {
        if (this.$route.params.id) {
            setTimeout(() => {
                this.doGetData();
                this.calculateValue();
            }, 1500);
        }
    },
    methods:{
        dateToMoment,
        formatDate,
        calculateValue() {
            this.form.totalrealization = Number.parseFloat(this.form.realization1 ?? 0) + Number.parseFloat(this.form.realization2 ?? 0) + Number.parseFloat(this.form.realization3 ?? 0);
            this.form.totaltarget = Number.parseFloat(this.form.target1 ?? 0) + Number.parseFloat(this.form.target2 ?? 0) + Number.parseFloat(this.form.target3 ?? 0);

            var checkDisable = (this.form.totalrealization > this.form.totaltarget);
            this.disabledButtonSave = (checkDisable) ? true : false;
        },
        doGetData() {
            this.events.loading = true
            getDetailBootcampAssessmentByStudent(this.$route.params.id, this.$route.params.studentid)
            .then(response => {
                // console.log('=====> Data DB : ', response);
                
                this.source_bootcamp = response.bootcamp;
                let bootcampAssessment = response.assessment;
                let student = response.bootcamp.students.find(x => x.studentId == this.$route.params.studentid);
                // this.disabledForm = (this.source_bootcamp.bootcampStatus == 'FT_2' || this.source_bootcamp.bootcampStatus == 'Extend') ? false : true;
                // console.log('==> student : ', student);
                // console.log('==> Assessment : ', bootcampAssessment);
                // console.log('==> Bootcamp status', response.bootcamp.bootcampStatus);
                
                // // fill model form
                if(student != undefined){
                    //// REGION INFORMATION
                    this.form.batch = response.bootcamp.batch;
                    this.form.studentId = student.studentId;
                    this.form.studentName = student.name;
                    this.form.updatedBy = JSON.parse(localStorage.getItem("user")).id;
                    
                    if (bootcampAssessment.classrooms.notePhase1 != undefined) this.form.trainerNote += bootcampAssessment.classrooms.notePhase1;
                    if (bootcampAssessment.classrooms.notePhase2 != undefined) this.form.trainerNote += ', ' + bootcampAssessment.classrooms.notePhase2;
                    if (bootcampAssessment.fT1 != undefined) this.form.trainerNote += ', ' + bootcampAssessment.fT1.notePhase1;
                    //// END REGION INFORMATION

                    //// REGION FORM FT 2
                    this.form.target1 = (bootcampAssessment.fT2 != undefined && bootcampAssessment.fT2.target1 != undefined) ? bootcampAssessment.fT2.target1.toString() : "0";
                    this.form.target2 = (bootcampAssessment.fT2 != undefined && bootcampAssessment.fT2.target2 != undefined) ? bootcampAssessment.fT2.target2.toString() : "0";
                    this.form.target3 = (bootcampAssessment.fT2 != undefined && bootcampAssessment.fT2.target3 != undefined) ? bootcampAssessment.fT2.target3.toString() : "0";
                    this.form.totaltarget = (bootcampAssessment.fT2 != undefined && bootcampAssessment.fT2.target1 != undefined) ? (bootcampAssessment.fT2.target1 + bootcampAssessment.fT2.target2 + bootcampAssessment.fT2.target3).toString()  : "0";

                    this.form.realization1 = (bootcampAssessment.fT2 != undefined && bootcampAssessment.fT2.realization1 != undefined) ? bootcampAssessment.fT2.realization1.toString() : "0";
                    this.form.realization2 = (bootcampAssessment.fT2 != undefined && bootcampAssessment.fT2.realization2 != undefined) ? bootcampAssessment.fT2.realization2.toString() : "0";
                    this.form.realization3 = (bootcampAssessment.fT2 != undefined && bootcampAssessment.fT2.realization3 != undefined) ? bootcampAssessment.fT2.realization3.toString() : "0";
                    this.form.totalrealization = (bootcampAssessment.fT2 != undefined && bootcampAssessment.fT2.realization1 != undefined) ? (bootcampAssessment.fT2.realization1 + bootcampAssessment.fT2.realization2 + bootcampAssessment.fT2.realization3).toString()  : "0";

                    this.form.note = (bootcampAssessment.fT2 != undefined && bootcampAssessment.fT2.notePhase2 != undefined) ? bootcampAssessment.fT2.notePhase2 : null;
                    
                    //// REGION SELECTION
                    const currentBootcampStatus = this.source_bootcamp.bootcampStatus;
                    const booleanStudentSelectionFT2 = (student.selections != undefined && student.selections.some(p => p.title == 'FT2'));
                    const booleanStudentSelectionExtend = (student.selections != undefined && student.selections.some(p => p.title == 'Extend'));
                    // console.log('____ Tahapan bootcamp ' + currentBootcampStatus + ' - ada Selection FT2 : ' + booleanStudentSelectionFT2 + ' - ada Selection FT2 Extend : ' + booleanStudentSelectionExtend );

                    if(currentBootcampStatus == 'Extend'){
                        this.form.selection.title = 'Extend';
                        if(booleanStudentSelectionExtend) this.form.selection.status = student.selections.find(x => x.title == 'Extend').status;
                        if(!booleanStudentSelectionExtend) this.form.selection.status = student.selections.find(x => x.title == 'FT2').status;
                    } else if(currentBootcampStatus == 'FT_2'){
                        this.form.selection.title = 'FT2';
                        if(booleanStudentSelectionFT2) this.form.selection.status = student.selections.find(x => x.title == 'FT2').status;
                    } else {
                        if(booleanStudentSelectionExtend){
                            this.form.selection = student.selections.find(x => x.title == 'Extend');  
                        } else if(booleanStudentSelectionFT2){
                            this.form.selection = student.selections.find(x => x.title == 'FT2');
                        }
                    }
                    //// END REGION SELECTION
                    //// END REGION FORM FT 2
                    
                    this.formDisabled(student);
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
            // console.log('___ Isi data form submit', this.form);
            // console.log('Save validate : ', this.$refs.form.validate());

            if (!this.$refs.form.validate()) return false; 
            this.events.loading = true;
            
            let payload = {...this.form, id : this.$route.params.id};
            // console.log('___ Payload submit', payload);

            await updateAssessmentFT2(payload) // CEK BE nya ?
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
                content: "Assessment Filtering Test II already saved!",
                color: "rgb(0, 200, 83)",
            });
            this.$router.push({ name: 'detail-bootcampassessmentqc', params: { id: this.$route.params.id }});
        },
        formDisabled(student){
            const isPhaseMinPro = this.source_bootcamp.bootcampStatus == 'FT_2';
            const isPhaseMinProExtend = this.source_bootcamp.bootcampStatus == 'Extend';
            const isStudentExtend = (student.selections != undefined && student.selections.filter(o => o.title == 'FT2' && o.status == 'Extend').length > 0 );
            // console.log('_____ Check Form disabled - tahapan minpro : ' + isPhaseMinPro + ' - tahapan minpro extend : ' + isPhaseMinProExtend + ' - is student extend : ' + isStudentExtend);
            
            // kondisi jika benar maka akan membuat form disable = false
            // 1. jika tahapan bootcamp adalah minpro
            if(isPhaseMinPro) return this.disabledForm = false;
            // 2. jika tahapan bootcamp adalah extend, dan studentnya extend jg
            if(isPhaseMinProExtend && isStudentExtend) return this.disabledForm = false;
            
            return  this.disabledForm = true; 
        },
    }
}

</script>
