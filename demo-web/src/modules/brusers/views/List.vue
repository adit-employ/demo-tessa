<template>
    <div>
        <div>
            <v-alert v-model="notif.progress"
                     dense
                     text
                     icon="mdi-loading mdi-spin"
                     color="info">
                Sync in progress
            </v-alert>
            <v-alert v-model="notif.success"
                     dense
                     text
                     dismissible
                     border="left"
                     type="success"
                     color="info">
                <div v-if="history_data.message == null">Never Sync with Tessa.</div>
                <div v-else>
                    {{ history_data.message }}
                    <a plain color="primary" @click="details = true" v-if="details==false && history_data.deleted_user.length > 0 || details==false && history_data.new_user.length > 0">
                        <u>Show Details</u>
                    </a>
                    <a plain color="primary" @click="details = false" v-if="details==true && history_data.deleted_user.length > 0 || details==true && history_data.new_user.length > 0">
                        <u>Hide Details</u>
                    </a>
                    <div v-if=" details==true">
                        <div v-if="history_data.deleted_user.length > 0 || history_data.new_user.length > 0">
                        <v-divider class="my-2 info" style="opacity: 0.22"></v-divider>
                        <div v-if="history_data.new_user.length > 0">Created Users :</div>
                            <ul v-if="history_data.new_user.length > 0">
                                <li v-for="item in history_data.new_user" :key="item.email">
                                    {{ item.fullname }} <i>({{ item.email }})</i>
                                </li>
                            </ul>
                            <div v-if="history_data.deleted_user.length > 0">Deleted Users : </div>
                            <ul v-if="history_data.deleted_user.length > 0">
                                <li v-for="item in history_data.deleted_user" :key="item.email">
                                    {{ item.fullname }} <i>({{ item.email }})</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <br/><small>Last sync with Tessa: <strong>{{ formatDate(history_data.created_at,'datetime') }}</strong></small>
                </div>
            </v-alert>
        </div>
        <v-card>
            <v-card-title>
                <v-text-field v-model="search"
                              append-icon="mdi-magnify"
                              label="Search"
                              single-line
                              class="no-top"
                              hide-details>
                </v-text-field>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on"
                            depressed
                            color="primary"
                            class="white--text small ml-2"
                            @click="openAddForm"
                            fab>
                                <v-icon dark>
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </template>
                    <span>Add Users</span>
                </v-tooltip>
                <v-speed-dial v-model="other"
                            :open-on-hover="hover"
                            :direction="direction">
                    <template v-slot:activator>
                        <v-btn v-model="other"
                               icon
                               outlined
                               color="primary"
                               class="white--text small ml-2"
                               fab>
                            <v-icon v-if="other">
                                mdi-close
                            </v-icon>
                            <v-icon v-else>
                                mdi-dots-vertical
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on"
                                small
                                depressed
                                color="#f58220"
                                class="white--text small ml-2"
                                @click="doRefreshData()"
                                fab>
                                    <v-icon dark>
                                        mdi-cached
                                    </v-icon>
                                </v-btn>
                            </template>
                        <span>Refresh</span>
                    </v-tooltip>
                    <v-tooltip left>
                        <template v-slot:activator="{ on }">
                            <v-btn v-on="on"
                                small
                                depressed
                                color="#f58220"
                                class="white--text small ml-2"
                                @click="doSyncTessa()"
                                fab>
                                    <v-icon dark>
                                        mdi-account-sync
                                    </v-icon>
                                </v-btn>
                            </template>
                        <div class="text-center">Sync With Tessa</div>
                        <small>Last Sync : {{formatDate(history_data.created_at,'fromnow')}}</small>
                    </v-tooltip>
                </v-speed-dial>
            </v-card-title>
            <v-data-table :headers="headers"
                          :items="list_data"
                          :search="search"
                          :items-per-page="5"
                          :loading="loading"
                          :footer-props="{'items-per-page-options':[10, 25, 50]}"
                          class="elevation-1">
                            <template v-slot:[`item.updated_by`]="{ item }">
                                <div>{{item.updated_by}}</div>
                                <small class="text-muted">{{formatDate(item.updated_at,'fromnow')}}</small>
                            </template>
                            <template v-slot:[`item.action`]="{ item }">
                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn icon v-on="on" @click="$router.push({ name: 'update-users', params: { id: item.id } })">
                                            <v-icon>
                                                mdi-pencil
                                            </v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Edit Users</span>
                                </v-tooltip>
                            </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    // Services
    import { getUserAll, getSyncStatus, syncUsers } from "@/services/users.js";

    //Utils
    import errorMessage from '@/utils/notify-error';
    import formatDate from "@/utils/format-date";

    export default {
        name: "VueUsersList",
        data() {
            return {
                search: null,
                loading: true,
                headers: [
                    { text: "Email", value: "email", active: false, showFilter: true, sortable: true },
                    { text: "Fullname", value: "fullname", active: false, showFilter: true, sortable: true },
                    { text: "Roles Name", value: "role_name", active: false, showFilter: true, sortable: true },
                    { text: "Phone Number", value: "phone", active: false, showFilter: true, sortable: false },
                    { text: "Updated By", value: "updated_by", active: false, showFilter: true, sortable: true },
                    { text: "Action", value: "action", sortable: false, class: 'action-button', align: "center" },
                ],
                list_data: [],
                history_data: [],
                notif: {
                    success: false,
                    progress: false,
                },
                details: false,
                other: false,
                hover: true,
                direction: 'bottom',
            };
        },
        mounted() {
            this.getData()
        },
        methods: {
            formatDate,
            getData() {
                this.loading = true;
                getUserAll(this.params)
                    .then(response => {
                        this.loading = false
                        this.list_data = response.data
                        this.notif.success = true;
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
                getSyncStatus()
                    .then(response => {
                        this.history_data = response.data
                    })
            },
            openAddForm() {
                this.$router.push({
                    name: "create-users"
                });
            },
            doRefreshData(){
                this.list_data = [];
                this.history_data = [];
                this.getData();
                this.details = false;
                this.notif.success = true;
            },
            doSyncTessa(){
                this.notif.success = false;
                this.notif.progress = true;
                syncUsers()
                    .then(() => {
                        this.notif.progress = false;
                        this.list_data = [],
                        this.history_data = [];
                        this.getData();
                        this.notif.success = true;
                    }).catch((error) => {
                        this.notif.progress = false;
                        errorMessage(error);
                    })
            },
        },
    };
</script>
