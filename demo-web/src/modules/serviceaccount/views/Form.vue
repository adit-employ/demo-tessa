<template>
    <div>
        <v-card :loading="events.loading">
            <v-col cols="12" md="12">
                <v-form v-model="form_error" ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field id="company_name"
                                          name="company_name"
                                          v-model="form.company_name"
                                          label="Company Name *"
                                          prepend-icon="mdi-domain"
                                          :rules="rules.company_name">
                            </v-text-field>
                            <v-text-field id="domain_name"
                                          name="domain_name"
                                          v-model="form.domain_name"
                                          label="Domain Name *"
                                          prepend-icon="mdi-format-text"
                                          :rules="rules.domain_name">
                            </v-text-field>
                            <v-text-field id="domain_code"
                                          name="domain_code"
                                          v-model="form.domain_code"
                                          label="Domain Code *"
                                          prepend-icon="mdi-format-text"
                                          :rules="rules.domain_code">
                            </v-text-field>
                            <v-text-field id="access_email"
                                          name="access_email"
                                          v-model="form.access_email"
                                          label="Access Email *"
                                          prepend-icon="mdi-at"
                                          :rules="rules.access_email">
                            </v-text-field>
                            <v-text-field id="customer_code"
                                          name="customer_code"
                                          v-model="form.customer_code"
                                          label="Customer Code *"
                                          prepend-icon="mdi-domain"
                                          :rules="rules.customer_code">
                            </v-text-field>
                            <v-text-field id="type_account"
                                          name="type_account"
                                          v-model="form.type_account"
                                          label="Account Type *"
                                          prepend-icon="mdi-format-text"
                                          :rules="rules.type_account">
                            </v-text-field>
                            <v-text-field id="private_key_id"
                                          name="private_key_id"
                                          v-model="form.private_key_id"
                                          label="Private Key ID *"
                                          prepend-icon="mdi-format-text"
                                          :rules="rules.private_key_id">
                            </v-text-field>
                            <v-textarea id="private_key"
                                        name="private_key"
                                        v-model="form.private_key"
                                        clear-icon="mdi-close-circle"
                                        label="Private Key *"
                                        prepend-icon="mdi-key"
                                        value="This is clearable text."
                                        :rules="rules.private_key"
                                        clearable>
                            </v-textarea>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field id="project_id"
                                          name="project_id"
                                          v-model="form.project_id"
                                          label="Project ID *"
                                          prepend-icon="mdi-format-text"
                                          :rules="rules.project_id">
                            </v-text-field>
                            <v-text-field id="client_email"
                                          name="client_email"
                                          v-model="form.client_email"
                                          label="Client Email *"
                                          prepend-icon="mdi-at"
                                          :rules="rules.client_email">
                            </v-text-field>
                            <v-text-field id="client_id"
                                          name="client_id"
                                          v-model="form.client_id"
                                          label="Client ID *"
                                          prepend-icon="mdi-format-text"
                                          :rules="rules.client_id">
                            </v-text-field>
                            <v-text-field id="auth_uri"
                                          name="auth_uri"
                                          v-model="form.auth_uri"
                                          label="Auth Uri *"
                                          prepend-icon="mdi-format-text"
                                          :rules="rules.auth_uri">
                            </v-text-field>
                            <v-text-field id="token_uri"
                                          name="token_uri"
                                          v-model="form.token_uri"
                                          label="Token Uri *"
                                          prepend-icon="mdi-barcode"
                                          :rules="rules.token_uri">
                            </v-text-field>
                            <v-text-field id="auth_cert"
                                          name="auth_cert"
                                          v-model="form.auth_cert"
                                          label="Auth Provider x509 Cert Url *"
                                          prepend-icon="mdi-certificate"
                                          :rules="rules.auth_cert">
                            </v-text-field>
                            <v-text-field id="client_cert"
                                          name="client_cert"
                                          v-model="form.client_cert"
                                          label="Client x509 Cert Url *"
                                          prepend-icon="mdi-certificate"
                                          :rules="rules.client_cert">
                            </v-text-field>
                            <v-checkbox class="no-top" v-model="form.is_active" label="Is Active?"></v-checkbox>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-col>
                <v-row>
                    <v-card-title class="control-label col-md-3">
                        Google Calendar
                    </v-card-title>
                    <div class="col-md-9 no-padding-top text-right">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn class="btn btn-xs btn-default"
                                       v-on="on"
                                       color="info"
                                       small
                                       icon
                                       @click="form.calendar.push({ calendar_id: null, is_default: false, is_active: false });">
                                    <v-icon>
                                        mdi-plus
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>Add Google Calendar</span>
                        </v-tooltip>
                    </div>
                </v-row>
                <v-divider class="mb-3 mt-2" />
                <v-form v-model="form_error" ref="item" lazy-validation>
                    <v-row v-for="(item, row) in form.calendar" v-bind:key="row">
                        <v-col cols="12" md="6">
                            <v-text-field id="calendar_id"
                                        name="calendar_id"
                                        v-model="item.calendar_id"
                                        label="Calendar ID *"
                                        :rules="rules.calendar_id"
                                        prepend-icon="mdi-calendar">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-checkbox v-model="item.is_default" label="Is Default?"></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-checkbox v-model="item.is_active" label="Is Active?"></v-checkbox>
                        </v-col>
                        <v-col cols="12" md="2" class="text-right">
                            <v-tooltip top>
                                <template v-slot:activator="{ on }">
                                    <v-btn class="text-center mt-5" icon small color="error" v-on="on" @click="form.calendar.splice(form.calendar.indexOf(item), 1)">
                                        <v-icon>
                                            mdi-delete
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Delete Calendar</span>
                            </v-tooltip>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
            <v-divider />
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn outlined color="primary" @click="$router.push({ name: `service-account` })" :disabled="events.loading">
                    Back
                </v-btn>
                <v-btn color="primary" @click="doSave()" :disabled="events.loading || events.submit">
                    <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                    {{!events.loading || events.submit ? 'Submit' : 'Loading'}}
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
    import { getServiceAccountDetail, createServiceAccount, updateServiceAccount, deleteServiceAccount } from "@/services/serviceaccount.js";

    //utils
    import errorMessage from "@/utils/notify-error";

    export default {
        name: "VueServiceAccountForm",
        data() {
            return {
                form: {
                    company_name: null,
                    domain_name: null,
                    domain_code: null,
                    access_email: null,
                    customer_code: null,
                    type_account: null,
                    project_id: null,
                    private_key_id: null,
                    private_key: null,
                    client_email: null,
                    client_id: null,
                    auth_uri: null,
                    token_uri: null,
                    auth_cert: null,
                    client_cert: null,
                    is_active: false,
                    calendar: [],
                },
                rules: {
                    company_name: [v => !!v || 'Company name is required'],
                    domain_name: [v => !!v || 'Domain name is required'],
                    domain_code: [v => !!v || 'Domain code is required'],
                    access_email: [v => !!v || 'Access email is required'],
                    customer_code: [v => !!v || 'Customer code is required'],
                    type_account: [v => !!v || 'Account type is required'],
                    private_key_id: [v => !!v || 'Private key ID is required'],
                    private_key: [v => !!v || 'Private key is required'],
                    project_id: [v => !!v || 'Project ID is required'],
                    client_email: [v => !!v || 'Client email is required'],
                    client_id: [v => !!v || 'Client ID is required'],
                    auth_uri: [v => !!v || 'Authentication Uri is required'],
                    token_uri: [v => !!v || 'Token Uri is required'],
                    auth_cert: [v => !!v || 'Auth Provider x509 Cert Url is required'],
                    client_cert: [v => !!v || 'Client x509 Cert Url is required'],
                    calendar_id: [v => !!v || 'Calendar ID is required'],
                },
                events: {
                    loading: true,
                    submit: false,
                    delete: false,
                },
                form_submit: {},
                form_error: false,
                loading: false,
                form_mode: null,
                modalDelete: false,
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.form_mode = 'update';
                this.doGetServiceAccountDetail();
            }
            else {
                this.events.loading = false;
                this.form_mode = 'create';
            }
        },
        methods: {
            doGetServiceAccountDetail() {
                this.events.loading = true;
                getServiceAccountDetail(this.$route.params.id)
                    .then((response) => {
                        this.events.loading = false;
                        this.form = response.data;
                    }).catch((error) => {
                        this.events.loading = false;
                        errorMessage(error);
                    })
            },
            async doSave() {
                if (!this.$refs.form.validate() || !this.$refs.item.validate()) return false;
                this.form_submit = { ...this.form };
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
                await createServiceAccount(this.form_submit)
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
                this.loading = true;
                await updateServiceAccount(this.$route.params.id, this.form_submit)
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
                await deleteServiceAccount(this.$route.params.id)
                    .then(() => {
                        this.events.delete = true;
                        this.deleteSuccess();
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.delete = false;
                        errorMessage(error);
                    })
            },
            addCalendar() {
                this.card.calendar.push({
                    calendar_id: null,
                    is_default: false,
                    is_active: false
                });
            },
            saveSuccess() {
                this.loading = false;
                this.$notify({
                    title: "Successful",
                    content: "Service Account already saved!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: `service-account` });
            },
            deleteSuccess() {
                this.loading = false;
                this.$notify({
                    title: "Successful",
                    content: "Service Account already deleted!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: `service-account` });
            }
        }
    }
</script>
