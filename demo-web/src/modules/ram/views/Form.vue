<template>
           <div>
               <v-card :loading="events.loading">
                   <v-col cols="12" md="12">
                       <v-form v-model="form_error" ref="form" lazy-validation>
                           <v-row>
                               <v-col cols="12" md="6">
                                   <v-text-field id="capacity"
                                                 name="capacity"
                                                 v-model="form.capacity"
                                                 label="Capacity Ram *"
                                                 prepend-icon="mdi-format-text"
                                                 :rules="rules.capacity"
                                                 @change="onChange"
                                                 @keypress="keypressIsNumber($event)"
                                                 @focus="onFocus"
                                                 maxlength="3"
                                                 hint="Value in GB,  Example 4 GB"
                                                 >
                                   </v-text-field>
                               </v-col>
                           </v-row>
                       </v-form>
                   </v-col>
                   <v-divider />
                   <v-card-actions>
                       <v-spacer></v-spacer>
                       <v-btn color="primary" outlined @click="$router.push({ name: `ram`})" :disabled="events.loading">
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
           import { createRam, getRamDetail, updateRam } from "@/services/ram.js";
       
           //utils
           import errorMessage from "@/utils/notify-error";
       
           export default {
               name: "VueRamForm",
               data() {
                   return {
                       form: {
                                 capacity: null,
                                 createdBy: null,
                                 updatedBy: null
                       },
                       rules: {
                                 capacity: [ v => !!v || 'Capacity ram is required' ],
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
                       this.doGetRamDetail();
                   }
                   else {
                       this.form_mode = 'create';
                       this.events.loading = false;
                   }
               },
               methods:{
                   doGetRamDetail() {
                       this.events.loading = true;
                       getRamDetail(this.$route.params.id)
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
                       this.form_submit.role_menus = this.form.role_menus;
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
                       await createRam(this.form_submit)
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
                       await updateRam(payload)
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
                       
                       await updateRam(payload)
                           .then(() => {
                                setTimeout(() => {
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
                           content: "Ram already saved!",
                           color: "rgb(0, 200, 83)",
                       });
                       this.$router.push({ name: `ram` });
                   },
                   onChange(){
                    let size = this.form.capacity;
                    console.log('addingGB : ', size.toString().indexOf(' GB'));

                    if(size.toString().indexOf(' GB') > 0 ){
                        size.toString().replace(/ GB| /gi, "");
                    }
                    this.form.capacity = size.concat(' GB');
                   },
                   onFocus(){
                    let size = this.form.capacity;
                    console.log('removeGb : ', size);

                    if(size != null && size.toString().indexOf(' GB') > 0 ){                       
                        this.form.capacity = size.toString().replace(/ GB| /gi, "");
                    }
                    
                   },
                   keypressIsNumber (evt) {
                        const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                        const keyPressed = evt.key;
                        
                        if (!keysAllowed.includes(keyPressed)) {
                            evt.preventDefault()
                        }
                    }
               }
           }
       </script>