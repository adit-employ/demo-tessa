<template>
    <div>
        <v-card :loading="events.loading">
            <v-col cols="12" md="12">
                <v-form v-model="form_error" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-select v-model="form.phase"
                                prepend-icon="mdi mdi-stairs"
                                :items="source_status_bootcamp"
                                :rules="rules.phase"
                                item-text="title"
                                item-value="status"
                                label="Phase *"
                                >
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select v-model="form.type"
                                prepend-icon="mdi-radio"
                                :items="type_list"
                                item-text="name"
                                item-value="name"
                                label="Type *"
                                clearable
                                @change="selectedType()"
                                :rules="rules.type">
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.title"
                                            label="Title *"
                                            prepend-icon="mdi-format-text"
                                            :rules="rules.title">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="form.percentageWeight"
                                            type="number"
                                            label="Bobot *"
                                            prepend-icon="mdi-format-text"
                                            :rules="rules.percentageWeight"
                                            suffix="%">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-textarea id="desc"
                                            name="desc"
                                            v-model="form.desc"
                                            label="Description *"
                                            prepend-icon="mdi-format-text"
                                            :rules="rules.desc">
                            </v-textarea>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-divider />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="$router.push({ name: `assessmentclassroom`})" :disabled="events.loading">
                    Back
                </v-btn>
                <v-btn color="primary" @click="doSave()" :disabled="events.loading || events.submit">
                    <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                    {{!events.loading || !events.submit ? 'Submit' : 'Loading'}}
                </v-btn>
                <v-btn :color="form.recordStatus == 'Active' ? 'error' : 'success'" v-if="form_mode=='update'" @click="modalStatus = true, events.status = true" :disabled="events.loading || events.status">
                    <v-icon v-if="events.loading || events.status" class="mdi mdi-spin">mdi-loading</v-icon>
                    {{ form.recordStatus == "Active" ? "De-Actived" : "Actived"}}
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="modalStatus" max-width="500" persistent>
        <v-card>
            <v-card-title class="text-h7">
                Warning
            </v-card-title>
            <v-divider />
            <v-card-text class="text-md-body-1">
                {{ form.recordStatus == "Active" ? "Are you sure want to de-actived this item?" : "Are you sure want to actived this item?"}}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="modalStatus = false, events.status = false">
                    Cancel
                </v-btn>
                <v-btn color="error" @click="doChangeStatus">
                    Submit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
</template>

<script>
    // Services
    import { createAssessmentClassroom, getAssessmentClassroomDetail
        , updateAssessmentClassroom } from "@/services/assessmentclassroom.js";
    import { getSourceStatusBootcamp } from "@/services/bootcamp";

    //utils
    import errorMessage from "@/utils/notify-error";

    export default {
        name: "VueAssessmentClassroomForm",
        data() {
            return {
                form: {
                    phase: null,
                    type: null,
                    title: null,
                    desc: null,
                    percentageWeight: null,
                    createdBy: null,
                    updatedBy: null
                },
                rules: {
                    phase: [ v => !!v || 'Type is required' ],
                    type: [ v => !!v || 'Type is required' ],
                    title: [ v => !!v || 'title is required' ],
                    desc: [ v => !!v || 'Description is required' ],
                    percentageWeight: [ 
                        v => !!v || "Bobot is required",
                        v => ( v && v >= 0 ) || "Bobot should be above 0",
                        v => ( v && v <= 100 ) || "Max should not be above 100",
                    ],
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
                source_status_bootcamp : [],
                type_list: [ { name: "Soft Skill" }, { name: "Technical" },  ],
            }
        },
        mounted() {
            this.doGetSourceStatusBootcamp();

            if (this.$route.params.id) {
                this.form_mode = 'update';
                this.doGetAssessmentClassroomDetail();
            }
            else {
                this.form_mode = 'create';
                this.events.loading = false;
            }
        },
        methods:{
            doGetSourceStatusBootcamp(){
                this.events.loading = true;
                getSourceStatusBootcamp()
                .then(responseMaster => {
                    this.source_status_bootcamp = responseMaster.filter(item => {
                        if (item.status == 'Phase_1' || item.status == 'Phase_2')
                        {
                            return item;
                        }
                    });

                    console.log('this.source_status_bootcamp : ', this.source_status_bootcamp);
                    this.events.loading = false;
                })
                .catch(error => {
                    errorMessage(error);
                    this.events.loading = false;
                });
            },
            doGetAssessmentClassroomDetail() {
                this.events.loading = true;
                getAssessmentClassroomDetail(this.$route.params.id)
                    .then((response) => {
                        this.events.loading = false;
                        this.form = response;
                    }).catch((error) => {
                        this.events.loading = false;
                        errorMessage(error);
                    })
            },
            selectedType() {
                const source = [...this.type_list].find((item) => {
                    return item.name === this.form.type;
                });
                if (!source || typeof source === undefined) {
                    this.form.type = null;
                    return;
                }
                this.form.type = source.name;
            },
            selectedStatusBootcamp(){
                const source = [...this.source_status_bootcamp].find((item) => {
                    return item.status === this.form.bootcampStatus;
                });
                if (!source || typeof source === undefined) {
                    this.form.bootcampStatus = null;
                    return;
                }
                this.form.bootcampStatus = source.status;
            },
            async doSave() {
                if (!this.$refs.form.validate()) return false;

                this.form.percentageWeight = Number.parseFloat(this.form.percentageWeight).toFixed(2);
                this.form_submit = { ...this.form };
                
                if (this.form_mode == 'update') {
                    this.form_submit.updatedBy = JSON.parse(localStorage.getItem("user")).id;
                    console.log('doSave => form : ', this.form_submit);
                    this.doUpdate();
                }
                else {
                    this.form_submit.createdBy = JSON.parse(localStorage.getItem("user")).id;
                    console.log('doSave => form : ', this.form_submit);
                    this.doCreate();
                }
            },
            async doCreate() {
                this.events.loading = true;
                await createAssessmentClassroom(this.form_submit)
                    .then(() => {
                        setTimeout(() => {
                            this.events.submit = false;
                            this.saveSuccess();
                        }, 2000);
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.submit = false;
                        errorMessage(error);
                    })
            },
            async doUpdate() {
                this.events.loading = true;
                let payload = {...this.form_submit, id : this.$route.params.id}
                await updateAssessmentClassroom(payload)
                    .then(() => {
                        setTimeout(() => {
                            this.events.submit = false;
                            this.saveSuccess();
                        }, 2000);
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.submit = false;
                        errorMessage(error);
                    })
            },
            async doChangeStatus() {
                this.events.loading = true;
                
                let newData = this.form;
                newData.recordStatus = this.form.recordStatus == "Active" ? "Inactive" : "Active";
                newData.updatedBy = JSON.parse(localStorage.getItem("user")).id;

                let payload = {...newData, id : this.$route.params.id}
                
                await updateAssessmentClassroom(payload)
                    .then(() => {
                        setTimeout(() => {
                            this.events.status = false;
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
                    content: "Assessment Classroom already saved!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: `assessmentclassroom` });
            }
        }
    }
</script>