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
                                                 label="Name *"
                                                 prepend-icon="mdi-format-text"
                                                 :rules="rules.name">
                                   </v-text-field>
                               </v-col>
                               <v-col cols="12" md="6">
                                   <v-text-field id="email"
                                                 name="email"
                                                 v-model="form.email"
                                                 label="Email *"
                                                 prepend-icon="mdi-format-text"
                                                 :rules="rules.email">
                                   </v-text-field>
                               </v-col>
                           </v-row>
                           <v-row>
                                 <v-col cols="12" sm="6">
                                        <v-select v-model="form.appRole.id"
                                            prepend-icon="mdi-sitemap"
                                            :items="list_app_roles"
                                            item-text="name"
                                            item-value="id"
                                            label="Role *"
                                            clearable
                                            @change="onChangeAppRole()"
                                            :rules="rules.appRole">
                                        </v-select>
                                </v-col>
                           </v-row>
                       </v-form>
                   </v-col>
                   <v-divider />
                   <v-card-actions>
                       <v-spacer></v-spacer>
                       <v-btn color="primary" outlined @click="$router.push({ name: `users`})" :disabled="events.loading">
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
                        <v-btn color="error" @click="doChangeStatus">
                            Submit 2
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
           </div>
       </template>
       
       <script>
           // Services
           import { getUserDetail, createUser , updateUser } from "@/services/app-users.js";
           import { getSelectOptionRole } from "@/services/app-roles.js";
       
           //utils
           import errorMessage from "@/utils/notify-error";
       
           export default {
               name: "VueUserForm",
               data() {
                   return {
                       form: {
                            name: null,
                            email: null,
                            appRole: {},
                            createdBy: null,
                            updatedBy: null,
                       },
                       rules: {
                                 name: [ v => !!v || 'User is required' ],
                                 email: [ v => !!v || 'Email BAST is required',
                                            value => { const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                                        return pattern.test(value) || 'Invalid e-mail.'
                                                    }
                                        ],
                                 appRole: [ v => !!v || 'Role is required' ],
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
                       list_app_roles:[],
                   }
               },
               mounted() {
                   this.events.loading = true;
                   if (this.$route.params.id) {
                       this.form_mode = 'update';
                       this.doGetAppUserDetail();
                       this.doGetRole();
                   }
                   else {
                       this.form_mode = 'create';
                       this.events.loading = false;
                       this.doGetRole();
                   }
               },
                methods:{
                    doGetAppUserDetail(){
                        getUserDetail(this.$route.params.id)
                            .then((response) => {
                                this.events.loading = false;
                                this.form = response;
                        }).catch((error) =>{
                            this.events.loading = false;
                            errorMessage(error);
                        })
                    },
                    doGetRole(){
                    getSelectOptionRole()
                            .then((response) => {
                                this.events.loading = false;
                                this.list_app_roles = response;
                        }).catch((error) =>{
                            this.events.loading = false;
                            errorMessage(error);
                        })
                    },
                    onChangeAppRole(){
                        const source = [...this.list_app_roles].find((item) => {
                            return item.id === this.form.appRole.id;
                        });
                        if (!source || typeof source === undefined) {
                            this.form.appRole.id = null;
                            this.form.appRole.name = null;
                            return;
                        }
                        this.form.appRole.id = source.id;
                        this.form.appRole.name = source.name;
                    },
                    async doSave() {
                        debugger;
                        if (!this.$refs.form.validate()) return false;

                        this.form_submit = { ...this.form };


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
                        await createUser(this.form_submit)
                            .then(() => {
                                setTimeout(() => {
                                    this.events.submit = true;
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
                        await updateUser(payload)
                            .then(() => {
                                setTimeout(() => {
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
                        this.events.loading = true;
                        
                        let newData = this.form;
                        newData.recordStatus = this.form.recordStatus == "Active" ? "Inactive" : "Active";
                        newData.updatedBy = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

                        let payload = {...newData, id : this.$route.params.id}
                        
                        await updateUser(payload)
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
                            content: "User already saved!",
                            color: "rgb(0, 200, 83)",
                        });
                        this.$router.push({ name: `users` });
                    }
               }
           }
       
       
       
       
       </script>