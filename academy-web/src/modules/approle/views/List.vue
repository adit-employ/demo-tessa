<template>
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
                <span>Add Role</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on"
                        icon
                        outlined
                        color="primary"
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
        </v-card-title>
        <v-data-table :headers="headers"
                      :items="list_data.data"
                      :search="search"
                      :items-per-page="5"
                      :sort-by="['is_default']"
                      :sort-desc="['true']"
                      :loading="loading"
                      :footer-props="{'items-per-page-options':[10, 25, 50]}"
                      class="elevation-1">
                        <template v-slot:[`item.moduls`]="{ item }">
                            <ol>
                                <li v-for="modul in item.moduls" :key="modul.title">
                                    {{ modul.title }}
                                </li>
                            </ol>
                        </template>
                        <template v-slot:[`item.is_default`]="{ item }">
                            <v-icon v-if="item.is_default==true" color="green" size="20">
                                mdi-check-circle-outline
                            </v-icon>
                            <v-icon v-if="item.is_default==false" color="red" size="20">
                                mdi-close-circle-outline
                            </v-icon>
                        </template>
                        <template v-slot:[`item.updated_by`]="{ item }">
                            <div>{{item.updated_by}}</div>
                            <!-- <small class="text-muted">{{formatDate(item.updated_at,'fromnow')}}</small> -->
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon v-on="on" @click="$router.push({ name: 'update-role', params: { id: item.id } })">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span>Edit Role</span>
                            </v-tooltip>
                        </template>
        </v-data-table>
    </v-card>
</template>

<script>
    // Services
    import { getRoleAll } from "@/services/app-roles.js";

    //Utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";

    export default {
        name: "VueListRole",
        data() {
            return {
                search: null,
                loading: true,                
                headers: [
                    { text: 'Name', value: 'roleName', sortable: true},
                    { text: 'Access', value: 'moduls', sortable: true},
                    { text: 'Status', value: 'recordStatus', sortable: true, align: "center"},
                    { text: 'Action', value: 'action', sortable: false, align: "center"},
                ],
                list_data: {
                    data: [],                    
                },
            }
        },
        mounted() {
            this.doGetData()
        },
        methods: {
            formatDate,
            doGetData() {
                this.loading = true
                getRoleAll()
                    .then(response => {        
                        // response.item.moduls.filter(v => v.read === true );
                        this.loading = false
                        this.list_data.data = response.items
                        console.log(') this.list_data.data : ', this.list_data.data);
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
            },
            openAddForm() {
                this.$router.push({
                    name: "create-role"
                });
            },
            doRefreshData(){
                this.list_data.data=[];
                this.doGetData();
            }            
        },
    };
</script>
@/services/role.js