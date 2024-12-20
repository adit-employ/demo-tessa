<template>
    <div>

        <v-row>
            <v-col cols="12" sm="12">

                <v-card :loading="events.loading">

                    <!-- <vue-data-information :data_information="data_information"></vue-data-information> -->
                    <xa-card-bootcamp-information3 :source="data_information"></xa-card-bootcamp-information3>

                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="$router.push({ name: `bootcampapproval`})" :disabled="events.loading">
                            Back
                        </v-btn>
                        <v-btn color="primary" v-if="data_information.bootcampStatus=='Open' || data_information.bootcampStatus=='Approval'" @click="doSave()" :disabled="events.loading || events.submit || events.status">
                            <v-icon v-if="events.loading || events.submit || events.status" class="mdi mdi-spin">mdi-loading</v-icon>
                            {{ !events.loading || !events.submit || !events.status ? 'Approve' : 'Loading'}}
                        </v-btn>
                        <v-btn color="error" v-if="form_mode=='approval'" @click="modalStatus = true, events.status = true" :disabled="events.loading || events.status || events.submit">
                            <v-icon v-if="events.loading || events.status || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                            Need Adjustment
                        </v-btn>
                    </v-card-actions>

                </v-card>

                <v-dialog v-model="modalStatus" persistent max-width="1000">
                    <v-card>
                        <v-toolbar dark color="primary" >
                        <v-toolbar-title>Are you sure need adjustment ?</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn dark text @click="modalStatus = false, events.status = false" > Cancel </v-btn>
                        </v-toolbar-items>
                        <v-toolbar-items>
                            <v-btn dark text @click="doChangeStatus" > Submit </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    
                        <v-card-text class="text-md-body-1 pt-3">
                            <v-form v-model="form_error" ref="form" lazy-validation>
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <v-textarea v-model="form.approverNote"
                                                    label="Note *"
                                                    :rules="rules.approverNote">
                                        </v-textarea>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card-text>
                        
                    </v-card>
                </v-dialog>


            </v-col>


        </v-row>
        

    </div>
    
</template>

<script>

import XaCardBootcampInformation3 from "@/components/xa/cardBootcampInformation3";

import { getBootcampDetail } from "@/services/bootcamp";
import { updateBootcampApproval } from "@/services/bootcampapproval";

//utils
import errorMessage from "@/utils/notify-error";
import { dateToMoment } from "@/utils/form-parser";
import formatDate from "@/utils/format-date";

export default {
    name: "VueBootcampApprovalDetail",
    components: {
        XaCardBootcampInformation3,
    },
    data(){
        return{
            data_information: {
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
            form: {
                approverId: null,
                approverStatus: null,
                approverNote: null
            },
            rules: {
                approverNote: [ v => !!v || 'Note is required' ],
            },
            form_submit: {},
            loading: false,
            form_mode: null,
            form_error: false,
            modalStatus: false,
            events: {
                    loading: true,
                    submit: false,
                    status: false,
                },
        }
    },
    mounted() {
        if (this.$route.params.id) {
            this.form_mode = 'approval';
            this.doGetData();
        }
    },
    methods:{
        dateToMoment,
        formatDate,
        doGetData() {
            this.events.loading = true
            getBootcampDetail(this.$route.params.id)
            .then(response => {
                this.data_information = response;
                this.data_information.notifyRecipients.sort((a, b) => b.role.localeCompare(a.role));
                this.events.loading = false
            })
            .catch(error => {
                this.events.loading = false
                errorMessage(error);
            });
        },
        async doSave() {
            if (this.form_mode == 'approval') {
                this.form_submit.approverId = this.data_information.approver.userId;
                this.form_submit.approverStatus = 'Approved';
                this.form_submit.approverNote = '';
                this.doUpdate();
            }
        },
        async doUpdate() {
            this.events.loading = true;
            let payload = {...this.form_submit, id : this.$route.params.id}
            await updateBootcampApproval(payload)
                .then(() => {
                    setTimeout(() => {
                        this.events.loading = false;
                        this.events.submit = true;
                        this.saveSuccess();
                    }, 2000);
                }).catch((error) => {
                    this.events.loading = false;
                    this.events.submit = false;
                    errorMessage(error);
                })
        },
        async doChangeStatus() {
            if (!this.$refs.form.validate()) return false; 
            this.events.loading = true;

            this.form_submit = { ...this.form, id : this.$route.params.id };
            if (this.form_mode == 'approval') {
                this.form_submit.approverId = this.data_information.approver.userId;
                this.form_submit.approverStatus = 'Open';
            }   

            let payload = this.form_submit;
            await updateBootcampApproval(payload)
                .then(() => {
                    setTimeout(() => {
                        this.events.loading = false;
                        this.events.status = true;
                        this.saveSuccess();
                    }, 2000);
                }).catch((error) => {
                    this.events.loading = false;
                    this.events.status = false;
                    errorMessage(error);
                })
        },
        saveSuccess() {
            this.loading = false;
            this.$notify({
                title: "Successful",
                content: "Bootcamp Approval already saved!",
                color: "rgb(0, 200, 83)",
            });
            this.$router.push({ name: `bootcampapproval` });
        }
    }
}

</script>
