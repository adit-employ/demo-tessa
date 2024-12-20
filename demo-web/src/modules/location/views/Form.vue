<template>
           <div>
               <v-card :loading="events.loading">
                   <v-col cols="12" md="12">
                       <v-form v-model="form_error" ref="form" lazy-validation>
                           <v-row>
                               <v-col cols="12" md="6">
                                   <v-text-field id="name"
                                                 name="name"
                                                 v-model="form.name"
                                                 label="Name Location *"
                                                 prepend-icon="mdi-format-text"
                                                 :rules="rules.name">
                                   </v-text-field>
                               </v-col>
                           </v-row>
                       </v-form>
                   </v-col>
                   <v-divider />
                   <v-card-actions>
                       <v-spacer></v-spacer>
                       <v-btn color="primary" outlined @click="$router.push({ name: `location`})" :disabled="events.loading">
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
           import { createLocation, getLocationDetail, updateLocation } from "@/services/location.js";
       
           //utils
           import errorMessage from "@/utils/notify-error";
       
           export default {
               name: "VueLocationForm",
               data() {
                   return {
                       form: {
                                 name: null,
                                 createdBy: null,
                                 updatedBy: null
                       },
                       rules: {
                                 name: [ v => !!v || 'Name Location is required' ],
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
                       this.form_mode = 'update';
                       this.doGetLocationDetail();
                   }
                   else {
                       this.form_mode = 'create';
                       this.events.loading = false;
                   }
               },
               methods:{
                   doGetLocationDetail() {
                       this.events.loading = true;
                       getLocationDetail(this.$route.params.id)
                           .then((response) => {
                               this.events.loading = false;
                               this.form = response;
                           }).catch((error) => {
                               this.events.loading = false;
                               errorMessage(error);
                           })
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
                       await createLocation(this.form_submit)
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
                       await updateLocation(payload)
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
                       newData.updatedBy = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

                       let payload = {...newData, id : this.$route.params.id}
                       
                       await updateLocation(payload)
                           .then(() => {
                                setTimeout(() => {
                                    this.events.submit = false;
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
                           content: "Location already saved!",
                           color: "rgb(0, 200, 83)",
                       });
                       this.$router.push({ name: `location` });
                   }
               }
           }
       </script>