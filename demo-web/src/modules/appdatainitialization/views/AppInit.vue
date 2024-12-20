<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col cols="12" ms="3">
                    <v-btn :disabled="hasModule"
                        color="primary"
                        @click="doCreateModule()" 
                        >
                        <v-icon 
                            v-if="loading" 
                            class="mdi mdi-spin">
                            mdi-loading
                        </v-icon>
                        {{!loading ? 'Step 1 - Initial Module' : 'Loading'}}
                    </v-btn> 
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" ms="3">
                    <v-btn :disabled="hasRole"
                        color="primary"
                        @click="doCreateRole()" 
                        >
                        <v-icon 
                            v-if="loading" 
                            class="mdi mdi-spin">
                            mdi-loading
                        </v-icon>
                        {{!loading ? 'Step 2 - Initial Role' : 'Loading'}}
                    </v-btn>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" ms="3">
                    <v-btn :disabled="hasUser"
                        color="primary"
                        @click="doCreateUser()" 
                        >
                        <v-icon 
                            v-if="loading" 
                            class="mdi mdi-spin">
                            mdi-loading
                        </v-icon>
                        {{!loading ? 'Step 3 - Initial User' : 'Loading'}}
                    </v-btn>
                </v-col>
                <v-col cols="12" ms="3">
                    <v-form v-model="formUser_error" ref="formUser" lazy-validation>
                        <v-text-field   :disabled="hasUser"
                                        v-model="formUser.email"
                                        label="email *"
                                        prepend-icon="mdi-format-text"
                                        :rules="formUser_rules.email">
                        </v-text-field>
                    </v-form>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" ms="6">
                    <v-btn 
                        color="primary"
                        @click="doCreateOrUpdateBatchNumber()" 
                        >
                        <v-icon 
                            v-if="loading" 
                            class="mdi mdi-spin">
                            mdi-loading
                        </v-icon>
                        {{!loading ? 'Step 4 - Initial Batch Number' : 'Loading'}}
                    </v-btn>
                </v-col>
                <v-col cols="12" ms="6">
                    <v-form v-model="formBatch_error" ref="formBatch" lazy-validation>
                        <v-text-field   v-model="formBatch.batchNumber"
                                        label="Nomor Batch Awal *"
                                        prepend-icon="mdi mdi-numeric"
                                        type="number"
                                        :rules="formBatch_rules.batchNumber">
                        </v-text-field>
                    </v-form>
                </v-col>
            </v-row>

        </v-card-text>
    </v-card>
</template>

<script>
    // Services
    import { initAppModule, initAppRoleAdmin
        , initBatch
     } from "@/services/app-datainitialization.js";
    import { getModuleAll } from "@/services/app-modules.js"
    import { getRoleAll } from "@/services/app-roles.js"
    import { getUserAll, createUser } from "@/services/app-users.js"


    export default {
        name: "VueAppInit",
        data() {
            return {
                loading: false,
                hasModule: true,   
                hasRole: true,
                hasUser: true,
                // user:{
                //     name : 'Ade Aditya Yahdjan',
                //     email : 'ade.yahdjan@xsis.co.id',
                //     appRole: {
                //         id: '3fa85f64-5717-4562-b3fc-2c963fbbbbb1',
                //         name: 'Admin'
                //     },
                //     createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                // },
                formUser: {
                    name : 'Ade Aditya Yahdjan',
                    email : null,
                    appRole: {
                        id: '3fa85f64-5717-4562-b3fc-2c963fbbbbb1',
                        name: 'Admin'
                    },
                    createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                },
                formUser_error: false,
                formUser_rules: {
                    email: [ v => !!v || 'Email is required' ],
                },
                form_submit_User: {},



                formBatch: {
                    batchNumber: null
                },
                formBatch_error: false,
                formBatch_rules: {
                    batchNumber: [ v => !!v || 'Batch number is required' ],
                },
                form_submit_batch: {},
            }
        },
        mounted() {
            this.checkHasModules();
            this.checkHasRoles();
            this.checkHasUsers();
        },
        methods: {
            checkHasModules(){
                getModuleAll()
                .then((response) => {
                    this.hasModule = (response.items.length > 0) ? true : false;
                    console.log('check modules : ', response);
                    console.log('this.hasModule : ', this.hasModule);
                }).catch(() =>{
                    this.hasModule = false;
                })
            },
            checkHasRoles(){
                getRoleAll('')
                .then((response) => {
                    console.log('check roles : ', response);
                    this.hasRole = (response.items.length > 0) ? true : false;
                    console.log('this.hasRole : ', this.hasRole);
                }).catch(() =>{
                    this.hasRole = false;
                })
            },
            checkHasUsers(){
                getUserAll()
                .then((response) => {
                    console.log('check users : ', response);
                    this.hasUser = (response.items.length > 0) ? true : false;
                    console.log('this.hasUser : ', this.hasUser);
                }).catch(() =>{
                    this.hasUser = false;
                })
            },
            async doCreateModule() {
                this.loading = true;
                this.checkHasModules();
                if(!this.hasModule){
                    await initAppModule()
                    .then(() => {
                        
                        setTimeout(() => {
                            alert('Successfully initialized the module !');
                            this.checkHasModules();
                            this.loading = false;
                        }, 2000);
                        
                    }).catch((error) => {
                        alert(error);
                        this.checkHasModules();
                    })
                }
            },
            async doCreateRole() {
                this.loading = true;
                this.checkHasRoles();
                if(!this.hasRole){
                    await initAppRoleAdmin()
                    .then(() => {
                        
                        setTimeout(() => {
                            alert('Successfully initialized the role !');
                            this.checkHasRoles();
                            this.loading = false;
                        }, 2000);

                    }).catch((error) => {
                        alert(error);
                        this.checkHasRoles();
                    })                    
                }
            },
            async doCreateUser() {
                this.loading = true;
                this.checkHasRoles();
                console.log('this.hasUser ', this.hasUser);
                if(!this.hasUser){
                    this.form_submit_user = {...this.formUser}
                    console.log('==> Form User Payload ', this.form_submit_user);

                    await createUser(this.form_submit_user)
                    .then(() => {

                        setTimeout(() => {
                            alert('Successfully initialized the user admin !');
                            this.checkHasUsers();
                            this.loading = false;
                            this.$router.push({ name: `home` });
                        }, 2000);
                        
                    }).catch((error) => {
                        alert(error);
                        this.checkHasUsers();
                    })                    
                }
            },

            async doCreateOrUpdateBatchNumber(){
                if (!this.$refs.formBatch.validate()) return false;

                this.loading = true;
                console.log('==> Form Batch ', this.formBatch);
                this.form_submit_batch = {...this.formBatch}
                console.log('==> Form Batch Payload ', this.form_submit_batch);

                await initBatch(this.form_submit_batch)
                .then(() => {
                    setTimeout(() => {
                        alert('Successfully initialized the Batch number bootcamp !');
                        this.loading = false;
                    }, 2000);
                }).catch((error) => {
                    alert(error);
                }) 

            }

        },
    };
</script>
@/services/role.js