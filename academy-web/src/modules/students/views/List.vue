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
                        <template v-slot:[`item.is_default`]="{ item }">
                            <v-icon v-if="item.is_default==true" color="green" size="20">
                                mdi-check-circle-outline
                            </v-icon>
                            <v-icon v-if="item.is_default==false" color="red" size="20">
                                mdi-close-circle-outline
                            </v-icon>
                        </template>
                        <template v-slot:[`item.birth_Date`]="{ item }">
                            <div>{{formatDate(item.birth_Date, 'date')}}</div>
                        </template>
                        <template v-slot:[`item.action`]="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on }">
                                    <v-btn icon v-on="on" @click="$router.push({ name: 'detail-students', params: { id: item.id } })">
                                        <v-icon>mdi mdi-file-document-arrow-right</v-icon>
                                    </v-btn>
                                </template>
                                <span>Detail Student</span>
                            </v-tooltip>
                        </template>
        </v-data-table>
    </v-card>
</template>

<script>
    // Services
    import { getStudentsAll } from "@/services/students.js";

    //Utils
    import errorMessage from "@/utils/notify-error";
    import formatDate from "@/utils/format-date";

    export default {
        name: "VueListStudents",
        data() {
            return {
                search: null,
                loading: true,                
                headers: [
                    { text: 'Name', value: 'name', sortable: true},
                    { text: 'Birth Date', value: 'birth_Date', sortable: true },
                    { text: 'Email', value: 'email', sortable: true},
                    { text: 'Phone', value: 'phone', sortable: true},
                    { text: 'Status', value: 'status', sortable: true, align: "center"},
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
                getStudentsAll()
                    .then(response => {        
                        this.loading = false
                        this.list_data.data = response.items
                    })
                    .catch(error => {
                        this.loading = false
                        errorMessage(error);
                    })
            },
            doRefreshData(){
                this.list_data.data=[];
                this.doGetData();
            }            
        },
    };
</script>
@/services/students.js