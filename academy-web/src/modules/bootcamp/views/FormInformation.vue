<template>
    <div>
        <v-row>
            <v-col cols="12" xs="12">
                <v-card :loading="events.loading">
                    <v-card-text>
                    <v-form v-model="form_error" ref="form" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="12" class="grey--text font-weight-bold">Information</v-col>
                            </v-row>
                            
                            <v-row>
                                <v-col cols="12" sm="4" >
                                    <v-text-field disabled id="batch"
                                                    name="batch"
                                                    v-model="form.batch"
                                                    label="Batch [Auto-Generated]"
                                                    prepend-icon="mdi-format-text"
                                                    :rules="rules.batch"
                                                    dense>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="4" >
                                    <v-select v-model="form.technology.id"
                                            prepend-icon="mdi mdi-code-tags"
                                            :items="source_technology"
                                            item-text="name"
                                            item-value="id"
                                            label="Technology *"
                                            clearable
                                            @change="onChangeTechnology()"
                                            :rules="rules.technology"
                                            dense>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" sm="4" >
                                    <v-select v-model="form.location.id"
                                        prepend-icon="mdi mdi-map-marker"
                                        :items="source_location"
                                        item-text="name"
                                        item-value="id"
                                        label="Location *"
                                        clearable
                                        @change="onChangeLocation()"
                                        :rules="rules.location"
                                        dense>
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="4" >
                                    <v-select v-model="form.type"
                                        prepend-icon="mdi-radio"
                                        :items="source_type"
                                        label="Type *"
                                        clearable
                                        :rules="rules.type"
                                        dense>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" sm="4" >
                                    <vue-date-picker v-model="form.periode.startDate"
                                        v-bind="{placeholder: 'Periode Start Date *' }"
                                        :disabled="loading"
                                        :rules="rules.startDate"
                                        @change="onChangeDatePicker()"
                                        dense />
                                </v-col>
                                <v-col cols="12" sm="4" >
                                    <vue-date-picker v-model="form.periode.endDate"
                                        v-bind="{placeholder: 'End Date *' }"
                                        :disabled="loading"
                                        :rules="rules.endDate"
                                        dense />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="4" >
                                    <v-select v-model="form.trainer.id"
                                            prepend-icon="mdi mdi-account"
                                            :items="source_trainer"
                                            item-text="name"
                                            item-value="id"
                                            label="Trainer Officer *"
                                            clearable
                                            @change="OnChangeTrainer()"
                                            :rules="rules.trainer"
                                            dense>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" sm="4" >
                                    <v-select v-model="form.qc.id"
                                            prepend-icon="mdi mdi-account"
                                            :items="source_qc"
                                            item-text="name"
                                            item-value="id"
                                            label="Quality Control Officer *"
                                            clearable
                                            @change="onChangeQC()"
                                            :rules="rules.qc"
                                            dense>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" sm="4" >
                                    <v-select v-model="form.approver.userId"
                                        prepend-icon="mdi mdi-account"
                                        :items="source_approver"
                                        item-text="name"
                                        item-value="userId"
                                        label="Approver Officer *"
                                        clearable
                                        @change="onChangeApprover()"
                                        :rules="rules.approver"
                                        dense>
                                    </v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="4" >
                                    <v-select v-model="form.notifyRecipients"
                                        item-text="nameDisplay"
                                        item-value="userId" 
                                        :items="source_notifyRecipients"
                                        :rules="rules.notifyRecipients"
                                        @change="onChangeNotificationRecipients()"
                                        chips multiple clearable
                                        label="Notify Recipient"
                                        prepend-icon="mdi mdi-account-multiple"
                                        dense>
                                    </v-select>   
                                </v-col>
                            </v-row>
                        

                    </v-form>   
                </v-card-text>
                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="$router.push({ name: `bootcamp`})" :disabled="events.loading">
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
    //import moment from 'moment';

    // Services
    import { getBootcampDetail, createBootcamp, updateBootcampHeader } from "@/services/bootcamp";
    import { getLocationAll } from '@/services/location';
    import { getTechnologyAll } from '@/services/technology';
    import { getSelectOptionUserByRole } from '@/services/app-users';

    // utils or Component
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";

    export default {
        name: "VueBootcampFormInformation",
        components: {
            VueDatePicker,
            // VueRecipientCombobox,
        },
        data() {
            return {
                form: {
                    periode: {
                    startDate: null,
                    endDate: null,
                    },
                    type: null,
                    location: {},
                    technology: {},
                    trainer: {},
                    qc: {},
                    approver: {},
                    notifyRecipients: [],
                    createdBy: null,
                    updatedBy: null,
                },
                //minStartDate: moment().startOf('day').format('yyyy-MM-DD'),
                rules: {
                            type: [ v => !!v || 'Type is required' ],
                            startDate: [
                                v => !!v || 'Start Date is required',
                                //() => this.dateToMoment(this.form.periode.endDate).add(1, 'day').isAfter(this.dateToMoment(this.form.periode.startDate)) || 'Start Date must be lesser than End Date.'
                            ],
                            endDate: [
                                v => !!v || 'End Date is required',
                                () => this.dateToMoment(this.form.periode.startDate).add(-1, 'day').isBefore(this.dateToMoment(this.form.periode.endDate)) || 'End Date must be greater than Start Date.'
                            ],
                            location: [ v => !!v || 'Location is required' ],
                            technology: [ v => !!v || 'Technology is required' ],
                            trainer: [ v => !!v || 'Trainer is required' ],
                            qc: [ v => !!v || 'QC is required' ],
                            approver: [ v => !!v || 'Approver is required' ],
                            notifyRecipients: [
                                v => v == null ? false : v.length > 0 || 'Notification Recipient is required',
                            ],
                },
                events: {
                    loading: true,
                    submit: false,
                    status: false,
                },
                form_submit: {},
                loading: false,
                form_mode: null,
                form_error: false,
                source_location: [],
                source_technology: [],
                source_trainer: [],
                source_qc: [],
                source_approver: [],
                source_notifyRecipients: [],
                source_type: ['Unggulan', 'Regular', 'Custom'],
                old_notifyRecipients: [],
            }
        },
        mounted() {
            this.$refs.form.resetValidation();
            if (this.$route.params.id) {
                this.form_mode = 'update';
                this.doGetBootcampDetail();
                this.doGetLocation();
                this.doGetTechnology();
                this.doGetUsers();
            }
            else {
                this.form_mode = 'create';
                this.events.loading = false;
                this.doGetLocation();
                this.doGetTechnology();
                this.doGetUsers();
            }
        },
        methods:{
            doGetBootcampDetail() {
                this.events.loading = true;
                getBootcampDetail(this.$route.params.id)
                .then((response) => {
                    // console.log('form => getBootcampDetail startDate 1 : ', response.periode.startDate );
                    
                    response.periode.startDate = this.dateToMoment(response.periode.startDate);
                    response.periode.endDate = this.dateToMoment(response.periode.endDate);

                    // console.log('form => getBootcampDetail startDate 2 : ', response.periode.startDate );


                    this.old_notifyRecipients = response.notifyRecipients.map(item => {
                        const user = {};
                        user['userId'] = item.userId;
                        user['name'] = item.name;
                        user['nameDisplay'] = item.name.concat(' - ', item.role);
                        user['role'] = item.role;
                        user['recordStatus'] = item.recordStatus;
                        user['email'] = item.email;
                        return user;
                    });

                    response.notifyRecipients = this.old_notifyRecipients.filter(user => user.recordStatus == 'Active');
                    this.form = response;
                    this.events.loading = false;
                    
                    // console.log('response.notifyRecipients  : ', response.notifyRecipients );

                }).catch((error) => {
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            doGetLocation() {
                this.events.loading = true;
                getLocationAll()
                    .then((response) => {
                        this.events.loading = false;
                        this.source_location = response.items;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            doGetTechnology() {
                this.events.loading = true;
                getTechnologyAll()
                    .then((response) => {
                        this.events.loading = false;
                        this.source_technology = response.items;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            doGetUsers() {
                this.events.loading = true;

                getSelectOptionUserByRole('')
                .then((response) => {
                    // select option qc
                    this.source_trainer = response.filter(user => user.role.toLowerCase().includes("trainer"));

                    // select option notify recipient
                    this.source_qc = response.filter(user => user.role.toLowerCase().includes("qc"));

                    // select option approver
                    this.source_approver = response.filter(user => user.role.toLowerCase().includes("gm")).map(item => {
                        const user = {};
                        user['userId'] = item.id;
                        user['name'] = item.name;
                        user['role'] = item.role;
                        user['recordStatus'] = 'Active';
                        return user;
                    });

                    // // select option trainerx
                    this.source_notifyRecipients = response.map(item => {
                        const user = {};
                        user['userId'] = item.id;
                        user['name'] = item.name;
                        user['nameDisplay'] = item.name.concat(' - ', item.role);
                        user['role'] = item.role;
                        user['recordStatus'] = 'Active';
                        user['email'] = item.email;
                        return user;
                    });

                    this.events.loading = false;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                });
            },


            onChangeDatePicker() {
                if (!(this.form.periode.startDate === null || this.form.periode.endDate === null) 
                    && this.form.periode.startDate > this.form.periode.endDate) 
                {
                    this.form.periode.endDate = this.form.periode.startDate;
                    this.$refs.form.resetValidation();
                }
            },
            onChangeNotificationRecipients() {
                let listNotifyRecipient = [];

                this.form.notifyRecipients.forEach(userId => {
                    const source = [...this.source_notifyRecipients].find((obj) => {
                        return obj.userId === userId;
                    });

                    if (source != null && typeof source != undefined) {
                        listNotifyRecipient.push(source);
                    }
                });
                
                this.form.notifyRecipients = listNotifyRecipient;
            },
            onChangeTechnology() {
                const source = [...this.source_technology].find((item) => {
                    return item.id === this.form.technology.id;
                });
                if (!source || typeof source === undefined) {
                    this.form.technology.id = null;
                    this.form.technology.name = null;
                    return;
                }
                this.form.technology.id = source.id;
                this.form.technology.name = source.name;
            },
            onChangeLocation() {
                const source = [...this.source_location].find((item) => {
                    return item.id === this.form.location.id;
                });
                if (!source || typeof source === undefined) {
                    this.form.location.id = null;
                    this.form.location.name = null;
                    return;
                }
                this.form.location.id = source.id;
                this.form.location.name = source.name;
            },
            OnChangeTrainer() {
                const source = [...this.source_trainer].find((item) => {
                    return item.id === this.form.trainer.id;
                });
                if (!source || typeof source === undefined) {
                    this.form.trainer.id = null;
                    this.form.trainer.name = null;
                    return;
                }
                this.form.trainer.id = source.id;
                this.form.trainer.name = source.name;
            },
            onChangeQC() {
                const source = [...this.source_qc].find((item) => {
                    return item.id === this.form.qc.id;
                });
                if (!source || typeof source === undefined) {
                    this.form.qc.id = null;
                    this.form.qc.name = null;
                    return;
                }
                this.form.qc.id = source.id;
                this.form.qc.name = source.name;
            },
            onChangeApprover(){
                const source = [...this.source_approver].find((item) => {
                    return item.userId === this.form.approver.userId;
                });

                if (!source || typeof source === undefined) {
                    this.form.approver.userId = null;
                    this.form.approver.name = null;
                    this.form.approver.role = null;
                    this.form.approver.recordStatus = null;
                    return;
                }

                this.form.approver.userId = source.userId;
                this.form.approver.name = source.name;
                this.form.approver.role = source.role;
                this.form.approver.recordStatus = source.recordStatus;
            },


            async doSave() {
                if (!this.$refs.form.validate()) return false;

                this.events.submit = true;
                this.form_submit = { ...this.form };

                this.form_submit.updatedBy = JSON.parse(localStorage.getItem("user")).id;
                this.form_submit.createdBy = JSON.parse(localStorage.getItem("user")).id;

                if (this.form_mode == 'update') {

                    this.old_notifyRecipients.forEach(userOld => {
                        if(!this.form_submit.notifyRecipients.some(user => user.userId === userOld.userId)){
                            userOld.recordStatus = 'Removed';
                            this.form_submit.notifyRecipients.push(userOld);                                
                        }
                    });

                    this.doUpdate();
                }
                else {
                    this.doCreate();
                }
            },
            async doCreate() {
                this.events.loading = true;

                console.log('this.form_submit : ', this.form_submit);
                
                createBootcamp(this.form_submit)
                .then((response) => {
                    
                    console.log('reponse id : ', response);


                    setTimeout(() => {
                        localStorage.setItem("sendnotif", true);

                        this.events.submit = false;
                        this.events.loading = false;
                        this.saveSuccess();
                        this.$router.push({ name: `detail-bootcamp-send-notif`, params: { id: response, sendnotif: true } });
                    }, 2000);

                    
                    
                }).catch((error) => {
                    this.events.loading = false;
                    this.events.submit = false;
                    errorMessage(error);
                })
            },
            async doUpdate() {
                this.events.loading = true;
                this.events.submit = true;
                let payload = {...this.form_submit, id : this.$route.params.id}
                await updateBootcampHeader(payload)
                    .then(() => {
                        setTimeout(() => {
                            this.events.loading = false;
                            this.events.submit = false;
                            this.saveSuccess();
                            this.$router.push({ name: 'detail-bootcamp', params: { id: this.$route.params.id } });
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
                    content: "Bootcamp already saved!",
                    color: "rgb(0, 200, 83)",
                });
            },
            dateToMoment,
            formatDate

        }
    }
</script>