<template>
    <div>
        <v-card :loading="events.loading">
            <v-col cols="12" xs="12">
                <v-form v-model="form_error" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="form.email"
                                                  prepend-icon="mdi-email"
                                                  label="Email *"
                                                  :rules="rules.email">
                                    </v-text-field>
                                    <v-text-field v-model="form.fullname"
                                                  prepend-icon="mdi-account"
                                                  label="Fullname *"
                                                  :rules="rules.fullname">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field v-model="form.phone"
                                                  prepend-icon="mdi-phone"
                                                  label="Phone Number *"
                                                  :rules="rules.phone">
                                    </v-text-field>
                                    <v-select v-model="form.role_id"
                                              prepend-icon="mdi-sitemap"
                                              :items="roles_list"
                                              item-text="name"
                                              item-value="id"
                                              label="Roles Name *"
                                              clearable
                                              @change="selectedRole()"
                                              :rules="rules.roles">
                                    </v-select>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-divider/>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" outlined @click="$router.push({ name: 'users' });" :disabled="events.loading">
                    Back
                </v-btn>
                <v-btn color="primary" @click="doSave()" :disabled="events.loading || events.submit">
                    <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                    {{!events.loading || !events.submit ? 'Submit' : 'Loading'}}
                </v-btn>
                <v-btn color="error" v-if="form_mode=='update'" @click="modalDelete = true, events.delete = true" :disabled="events.loading || events.delete">
                    <v-icon v-if="events.loading || events.delete" class="mdi mdi-spin">mdi-loading</v-icon>
                    {{ !events.delete ? 'Delete' : 'Deleting'}}
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="modalDelete" max-width="500" persistent>
            <v-card>
                <v-card-title class="text-h7">
                    Delete
                </v-card-title>
                <v-divider />
                <v-card-text class="text-md-body-1">
                    Are you sure want to delete this item?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" outlined @click="modalDelete = false, events.delete = false">
                        Cancel
                    </v-btn>
                    <v-btn color="error" @click="doDelete">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    // Services
    import { getUserDetail, createUser, updateUser, deleteUser } from '@/services/users';
    import { getRoleAll } from '@/services/br-roles';

    //Utils
    import errorMessage from '@/utils/notify-error';

    export default {
        name: "VueUsersUpdate",
        data() {
            return {
                form: {
                    email: null,
                    fullname: null,
                    role_id: null,
                    phone: null,
                },
                rules: {
                    email: [ 
                        v => !!v || 'Email is required',
                        v => (v || '').indexOf(' ') < 0 || 'Using spaces are not allowed',
                        v => /.+@.+\..+/.test(v) || 'Email is not valid',
                    ],
                    fullname: [ 
                        v => !!v || 'Fullname is required',
                        v => /^[A-Za-z- ]+$/.test(v) || 'Fullname may only use alphabet',
                    ],
                    roles: [ v => !!v || 'Roles is required' ],
                    phone: [ 
                        v => !!v || 'Phone number is required',
                        v => (v || '').indexOf(' ') < 0 || 'Using spaces are not allowed',
                        v => /^[0-9]*$/.test(v) || 'Phone number may only use numbers',
                        v => v == null ? false : v.length >= 10 || 'Phone number must be more than 10 numbers',
                        v => v == null ? false : v.length <= 13 || 'Phone number must be less than 13 numbers',
                    ],
                },
                events: {
                    loading: true,
                    submit: false,
                    delete: false,
                },
                form_submit: {},
                form_error: null,
                form_mode: null,
                modalDelete: false,
                roles_list: []
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.form_mode = 'update'
                this.doGetUserDetail();
                this.doGetRoles();
            }
            else {
                this.events.loading = false;
                this.form_mode = 'create';
                this.doGetRoles();
            }
        },
        methods: {
            doGetUserDetail() {
                this.events.loading = true;
                getUserDetail(this.$route.params.id)
                    .then((response) => {
                        this.events.loading = false;
                        this.form = response.data;
                    }).catch((error) => {
                        this.events.loading = false;
                        errorMessage(error);
                    })
            },
            doGetRoles() {
                this.events.loading = true;
                getRoleAll()
                    .then((response) => {
                        this.events.loading = false;
                        this.roles_list = response.data;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            selectedRole() {
                const source = [...this.roles_list].find((item) => {
                    return item.id === this.form.role_id;
                });
                if (!source || typeof source === undefined) {
                    this.form.role_id = null;
                    return;
                }
                this.role_id = source.name;
            },
            async doSave() {
                if (!this.$refs.form.validate()) return false;
                let payload = this.form;
                
                this.form_submit = {
                    email: payload.email.trim(),
                    fullname: payload.fullname.trim(),
                    role_id: payload.role_id,
                    phone: payload.phone.trim(),
                };
                console.log(this.form_submit);
                if (this.form_mode == 'update') {
                    this.doUpdate();
                }
                else {
                    this.doCreate();
                }
            },
            async doCreate() {
                this.events.loading = true;
                await createUser(this.form_submit)
                    .then(() => {
                        this.events.submit = true;
                        this.saveSuccess();
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
                        this.events.submit = true;
                        this.saveSuccess();
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.submit = false;
                        errorMessage(error);
                })
            },
            async doDelete() {
                this.events.loading = true;
                await deleteUser(this.$route.params.id)
                    .then(() => {
                        this.events.delete = true;
                        this.deleteSuccess();
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.delete = false;
                        errorMessage(error);
                })
            },
            saveSuccess() {
                this.$notify({
                    title: "Successful",
                    content: "Users Data already saved!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: `users` });
            },
            deleteSuccess() {
                this.loading = false;
                this.$notify({
                    title: "Successful",
                    content: "Users Data already deleted!",
                    color: "rgb(0, 200, 83)",
                    });
                this.$router.push({ name: 'users' });
            }
        }
    };
</script>