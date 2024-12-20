<template>
    <div>
        <v-card :loading="events.loading">
            <v-col cols="12" md="12">
                <v-form v-model="form_error" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field id="roleName"
                                          name="roleName"
                                          v-model="form.roleName"
                                          label="Role *"
                                          prepend-icon="mdi-format-text"
                                          :rules="rules.roleName">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col  cols="12" md="12">
                            <table >
                                <thead>
                                    <tr>
                                        <th class="text-left" style="width: 45%;">Name</th>
                                        <th class="text-left" style="width: 15%;">Read</th>
                                        <th class="text-left" style="width: 15%;">Create</th>
                                        <th class="text-left" style="width: 15%;">Edit</th>
                                        <th class="text-left" style="width: 15%;">Report</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in form.moduls" :key="item.moduleId">
                                        <td>{{ item.title }}</td>
                                        <td><v-checkbox v-model="item.isRead" ></v-checkbox></td>
                                        <td><v-checkbox v-model="item.isCreate" ></v-checkbox></td>
                                        <td><v-checkbox v-model="item.isEdit" ></v-checkbox></td>
                                        <td><v-checkbox v-model="item.isReport" ></v-checkbox></td>
                                    </tr>
                                </tbody>
                            </table>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-divider />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="$router.push({ name: `roles`})" :disabled="events.loading || events.submit || events.status">
                    Back
                </v-btn>
                <v-btn color="primary" @click="doSave()" :disabled="events.loading || events.submit || events.status">
                    <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                    {{!events.loading || !events.submit ? 'Submit' : 'Loading'}}
                </v-btn>
                <v-btn :color="form.recordStatus == 'Active' ? 'error' : 'success'" 
                    v-if="form_mode=='update'" 
                    @click="modalStatus = true, events.status = true" 
                    :disabled="events.loading || events.status">
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
    import { getRoleDetail, createRole , updateRole, changeStatusRole } from "@/services/app-roles.js";
    import { getModuleActive } from "@/services/app-modules.js";

    //utils
    import errorMessage from "@/utils/notify-error";

    export default {
        name: "VueRoleForm",
        data() {
            return {
                form: {
                     roleName: null,
                     moduls: null,
                     createdBy: null,
                     updatedBy: null,
                },
                rules: {
                          roleName: [ v => !!v || 'Role is required' ],
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
                list_modules:{},
            }
        },
        mounted() {
            this.events.loading = true;
            this.doBuildForm();
        },
        methods:{
            doBuildForm(){
                this.events.loading = true;
                
                getModuleActive('?status=Active')
                .then((response) => {
                    this.list_modules = response.items;
                    this.list_modules.forEach(function(v){ 
                        v['moduleId'] = v.id, v['isCreate'] = false, v['isEdit'] = false, v['isRead'] = false, v['isReport'] = false,
                        delete v.id, delete v.createdBy, delete v.createdAt, delete v.updatedAt, delete v.updatedBy, delete v.deletedBy, delete v.deletedAt, delete v.recordStatus, delete v.position, delete v.version });

                    if (this.$route.params.id) {
                        this.form_mode = 'update';

                        getRoleDetail(this.$route.params.id)
                        .then((response) => {
                            this.form = response;

                            this.list_modules.forEach(function(v){ 
                                response.moduls.forEach(function(z){
                                    if(v.moduleId == z.moduleId){
                                        v.isRead = z.isRead;
                                        v.isCreate = z.isCreate;
                                        v.isEdit = z.isEdit;
                                        v.isReport = z.isReport;
                                    }
                                });
                            });
                            this.form.moduls = this.list_modules;
                        }).catch((error) => {
                            this.events.loading = false;
                            errorMessage(error);
                        });
                    }
                    else {
                        this.form_mode = 'create';
                        this.form.moduls = this.list_modules;
                        this.events.loading = false;
                    }
                }).catch((error) => {
                    this.events.loading = false;
                    errorMessage(error);
                })

                this.events.loading = false;
            },

            async doSave() {
                debugger;
                if (!this.$refs.form.validate()) return false;

                this.form_submit = { ...this.form };
                this.form_submit.moduls = this.form_submit.moduls.filter(v => v.isRead == true || v.isCreate == true || v.isEdit == true || v.isReport == true)

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
                await createRole(this.form_submit)
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
                await updateRole(payload)
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
                newData.updatedBy = JSON.parse(localStorage.getItem("user")).id;

                let payload = {...newData, id : this.$route.params.id}
                
                await changeStatusRole(payload)
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
                    content: "Role already saved!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: `roles` });
            }
        }
    }




</script>