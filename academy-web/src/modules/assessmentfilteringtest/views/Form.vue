<template>
           <div>
               <v-card :loading="events.loading">
                   <v-col cols="12" md="12">
                       <v-form v-model="form_error" ref="form" lazy-validation>
                           <v-row>
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
                                                 suffix="%"
                                                 label="Bobot *"
                                                 prepend-icon="mdi-format-text"
                                                 :rules="rules.percentageWeight">
                                   </v-text-field>
                               </v-col>
                           </v-row>
                       </v-form>
                   </v-col>
                   <v-divider />
                   <v-card-actions>
                       <v-spacer></v-spacer>
                       <v-btn color="primary" outlined @click="$router.push({ name: `assessmentfilteringtest`})" :disabled="events.loading">
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
           import { createAssessmentFilteringTest, getAssessmentFilteringTestDetail, updateAssessmentFilteringTest } from "@/services/assessmentfilteringtest.js";
       
           //utils
           import errorMessage from "@/utils/notify-error";
       
           export default {
               name: "VueAssessmentFilteringTestForm",
               data() {
                   return {
                       form: {
                                 title: null,
                                 percentageWeight: null,
                                 createdBy: null,
                                 updatedBy: null
                       },
                       rules: {
                            title: [ v => !!v || 'title is required' ],
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
                       //category_list: [ { name: "Theory" }, { name: "SQL" }, { name: "Logic" }, { name: "Soft Skill" }, ],
                   }
               },
               mounted() {
                   if (this.$route.params.id) {
                       this.form_mode = 'update';
                       this.doGetAssessmentFilteringTestDetail();
                   }
                   else {
                       this.form_mode = 'create';
                       this.events.loading = false;
                   }
               },
               methods:{
                   doGetAssessmentFilteringTestDetail() {
                       this.events.loading = true;
                       getAssessmentFilteringTestDetail(this.$route.params.id)
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
                   async doSave() {
                       if (!this.$refs.form.validate()) return false;
                       this.form_submit = { ...this.form };
                       // this.form_submit.role_menus = this.form.role_menus;
                       if (this.form_mode == 'update') {
                           this.form_submit.updatedBy = JSON.parse(localStorage.getItem("user")).id;
                           this.doUpdate();
                       }
                       else {
                           this.form_submit.createdBy = JSON.parse(localStorage.getItem("user")).id;
                           this.doCreate();
                       }
                   },
                   async doCreate() {
                       this.events.loading = true;
                       await createAssessmentFilteringTest(this.form_submit)
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
                       await updateAssessmentFilteringTest(payload)
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
                       
                       await updateAssessmentFilteringTest(payload)
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
                           content: "Assessment Filtering Test already saved!",
                           color: "rgb(0, 200, 83)",
                       });
                       this.$router.push({ name: `assessmentfilteringtest` });
                   }
               }
           }
       </script>