<template>
    <div>
        <v-row>
            <v-col cols="12" xs="12">
                <v-card :loading="events.loading">
                    <v-form v-model="form_error" ref="form" lazy-validation>
                        <v-card-text class="grey--text font-weight-bold">
                            <v-row>
                                <v-col cols="12" sm="12">Phase Date Detail Bootcamp</v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-text v-for="(item) in this.form.dateDetails" :key="item.phase">
                            <v-row>
                                <v-col cols="12" sm="6" class="pt-1 pb-0">
                                    <div class="dark--text">{{ item.title }}</div>
                                </v-col>
                            </v-row>

                            <v-row v-if="item.phase == 'Phase8' || item.phase == 'Phase9'">
                                <v-col cols="12" sm="3" class="pt-0 pb-0">
                                    <vue-date-picker v-model="item.startDate"
                                        v-bind="{placeholder: 'Start Date' }"
                                        :disabled="loading"
                                        :rules="[rules.startDateValidate(item.startDate, item.endDate)]"
                                        @change="onChangePhase1(item.phase, 'startDate', $event, item.endDate)" />
                                </v-col>
                                <v-col cols="12" sm="3" class="pt-0 pb-0">
                                    <vue-date-picker v-model="item.endDate"
                                        v-bind="{placeholder: 'End Date' }"
                                        :disabled="loading"
                                        :rules="[rules.endDateValidate(item.endDate, item.startDate)]"
                                        @change="onChangePhase1(item.phase, 'endDate', $event, item.startDate)" />
                                </v-col>
                            </v-row>


                            <v-row v-else>
                                <v-col cols="12" sm="3" class="pt-0 pb-0">
                                    <vue-date-picker v-model="item.startDate"
                                        v-bind="{placeholder: 'Start Date' }"
                                        :disabled="loading"
                                        :rules="[rules.startDateRequired(item.startDate), rules.startDateValidate(item.startDate, item.endDate)]"
                                        @change="onChangePhase1(item.phase, 'startDate', $event, item.endDate)" />
                                </v-col>
                                <v-col cols="12" sm="3" class="pt-0 pb-0">
                                    <vue-date-picker v-model="item.endDate"
                                        v-bind="{placeholder: 'End Date' }"
                                        :disabled="loading"
                                        :rules="[rules.endDateRequired(item.endDate), rules.endDateValidate(item.endDate, item.startDate)]"
                                        @change="onChangePhase1(item.phase, 'endDate', $event, item.startDate)" />
                                </v-col>
                            </v-row>
                        </v-card-text>



                    </v-form>
                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="$router.push({ name: `detail-bootcamp`})" :disabled="events.loading">
                            Back
                        </v-btn>
                        <v-btn color="primary" @click="doSave()" :disabled="events.loading || events.submit">
                            <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                            {{!events.loading || !events.submit ? 'Submit' : 'Loading'}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <br>
    </div>
</template>

<script>
    import VueDatePicker from "@/components/form/Datepicker";
    import { dateToMoment } from "@/utils/form-parser";
    import moment from 'moment';
    
    import { getBootcampDetail, getSourceDateDetails, updateBootcampDateDetails } from "@/services/bootcamp";
    import errorMessage from "@/utils/notify-error";

    export default{
        name: "VueBootcampFormPhaseDate",
        components:{
            VueDatePicker
        },
        data(){
            return{
                form: {
                    dateDetails: [{
                        phase: "",
                        startDate: null,
                        endDate: null,
                        title: ""
                    }],
                    periode: {
                        startDate: null,
                        endDate: null,
                    },
                    updatedBy: null,
                },
                rules: {
                    startDateRequired(v) {
                        return !!v || `Start Date is required`;
                    },
                    startDateValidate(v, w) {
                        return moment(v).format('yyyy-MM-DD') <= moment(w).format('yyyy-MM-DD') || `Start Date must be lesser than End Date`;
                    },
                    endDateRequired(v) {
                        return !!v || `End Date is required`;
                    },
                    endDateValidate(v, w) {
                        return moment(v).format('yyyy-MM-DD') >= moment(w).format('yyyy-MM-DD') || `End Date must be greater than Start Date`;
                    },
                },
                events: {
                    loading: true,
                    submit: false,
                    status: false,
                },
                form_submit: {},
                form_error: false,
                loading: false,
                tmp_phaseDateDetails:[],
                source_master_dates: [],
                data_dateDetails: [],
            }
        },
        mounted(){
            if (this.$route.params.id) {
                this.doGetListMasterDate();
                this.doGetBootcampDetail();
            }
        },
        methods:{
            doGetBootcampDetail() {
                this.events.loading = true;
                
                getBootcampDetail(this.$route.params.id)
                .then((response) => {
                    this.tmp_phaseDateDetails = response;

                    this.source_master_dates = this.source_master_dates.map(item => {
                            const tmp = {};
                            tmp['phase'] = item.phase;
                            tmp['title'] =  item.title;
                            tmp['startDate'] =  item.startDate;
                            tmp['endDate'] =  item.endDate;
                            
                            if(response.dateDetails != undefined){
                                let dt = response.dateDetails.filter(x => x.phase === item.phase);
                                if(dt.length > 0 && dt[0].startDate != undefined){
                                    console.log('dt.startDate - dt.endDate : ', dt[0].startDate, ' - ', dt[0].endDate );
                                    tmp['startDate'] = this.dateToMoment(new Date(dt[0].startDate)).set({"hour": 5, "minute": 32});
                                    tmp['endDate'] = this.dateToMoment(new Date(dt[0].endDate)).set({"hour": 5, "minute": 32});
                                }
                            }
                            return tmp;
                        });
                    
                        this.tmp_phaseDateDetails.dateDetails = this.source_master_dates;
                        this.form = this.tmp_phaseDateDetails;

                    // this.data_dateDetails = response.dateDetails.map(item => {
                    //         const user = {};
                    //         user['phase'] = item.phase;
                    //         user['startDate'] = this.dateToMoment(Date.parse(item.startDate));
                    //         user['endDate'] = this.dateToMoment(Date.parse(item.endDate))
                    //         return user;
                    //     });
                    

                    // console.log('this.data_dateDetails : ', this.form);
                    // console.log('this.tmp_phaseDateDetails : ', this.tmp_phaseDateDetails);
                    // console.log('this.source_master_dates : ', this.source_master_dates);

                    // this.source_master_dates.forEach(function(v){ 
                        // console.log('v : ', v);
                        // console.log( this.tmp_phaseDateDetails.filter(item => item.phase == "Phase1"));
                    // });

                    // this.tmp_phaseDateDetails.forEach(function(v){ 
                    //     console.log('v : ', v);
                    // });

                    // this.source_master_dates.forEach(function(v){ 
                    //     response.dateDetails.forEach(function(z){
                    //         if(v.phase == z.phase){
                    //             console.log(v);

                    //             v.startDate = this.dateToMoment(Date.parse(z.startDate));
                    //             // v.isCreate = z.isCreate;
                    //             // v.isEdit = z.isEdit;
                    //             // v.isReport = z.isReport;
                    //         }
                    //     });
                    // });

                    // console.log('merged - this.source_master_dates : ', this.source_master_dates);
                    // console.log('merged - this.tmp_phaseDateDetails : ', this.tmp_phaseDateDetails);
                    // const merged = Object.assign(this.tmp_phaseDateDetails, this.source_master_dates);
                    // console.log('merged : ', merged);


                    // let ms = this.source_master_dates;
                    // console.log(ms);

                    
                    // let mydate = this.tmp_phaseDateDetails.filter(x => x.phase == "Phase1");
                    // console.log(mydate);
                    
                    
                    // let combined = {};
                    // this.objCombine(this.source_master_dates, combined);
                    // this.objCombine(this.tmp_phaseDateDetails, combined);
                    // console.log('merge : ', combined);
                    // this.form.dateDetails = combined;
                    // console.log('this.form => 2 : ', this.form);

                    // this.form.dateDetails = this.source_master_dates;


                    this.events.loading = false;
                    
                }).catch((error) => {
                    this.events.loading = false;
                    errorMessage(error);
                })
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

            onChangePhase1(phase, type, event, model){
                console.log('phase : ', phase);
                console.log('type : ', type);
                console.log('event : ', event);
                console.log('model : ', model);
                this.form.dateDetails.forEach(function(v){
                    if(v.phase == phase){
                        v[type] = event.set({"hour": 5, "minute": 32});
                    }
                });

                // console.log('Form Phase => onChangePhase1 : ', this.form);
                this.onChangeDatePicker();
            },
            onChangeDatePicker() {
                if (!(this.form.periode.startDate === null || this.form.periode.endDate === null) 
                    && this.form.periode.startDate > this.form.periode.endDate) 
                {
                    this.form.periode.endDate = this.form.periode.startDate;
                    this.$refs.form.resetValidation();
                }
            },
            objCombine(obj, variable) {
                for (let key of Object.keys(obj)) {
                    if (!variable[key]) variable[key] = {};

                    for (let innerKey of Object.keys(obj[key]))
                    variable[key][innerKey] = obj[key][innerKey];
                }
            },


            saveSuccess() {
                this.loading = false;
                this.$notify({
                    title: "Successful",
                    content: "Phase date detail already saved!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: 'detail-bootcamp', params: { id: this.$route.params.id } });
            },
            openFormStudent() {
                this.$router.push({
                    name: 'detail-bootcamp',
                    params: { id: this.$route.params.id }
                });
            },
            dateToMoment,

            async doSave() {
                if (!this.$refs.form.validate()) return false;
                this.form_submit = { ...this.form };
                
                this.form_submit.dateDetails = this.form_submit.dateDetails.filter(v => v.startDate != null);
                this.form_submit.updatedBy = JSON.parse(localStorage.getItem("user")).id;
                console.log('this.form_submit : ', this.form_submit);

                this.doUpdate();
            },
            async doUpdate() {
                this.events.loading = true;
                let payload = {...this.form_submit, id : this.$route.params.id}
                await updateBootcampDateDetails(payload)
                    .then(() => {
                        this.events.submit = true;
                        this.saveSuccess();
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.submit = false;
                        errorMessage(error);
                    })
            },
            

        }
    }

</script>