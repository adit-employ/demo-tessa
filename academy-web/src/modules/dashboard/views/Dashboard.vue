<template>
    <div>
        <v-row>
            <v-col cols="12" sm="3">
                <template v-if="approval_by == 'BOD'">
                    <v-card class="mx-auto" max-width="500">
                        <v-toolbar color="teal" dark>

                            <v-toolbar-title>Need Approval BOD</v-toolbar-title>

                            <v-spacer></v-spacer>
                            
                        </v-toolbar>

                        <template>
                            <v-list-item style="cursor: pointer;" @click="$router.push({ name: `bootcampgraduateapproval`})">
                                <v-list-item-content>
                                    <v-list-item-title>All Data Approval</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        
                        <v-list>       
                            <v-list-group no-action>
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title>Select Approval</v-list-item-title>
                                    </v-list-item-content>
                                </template>
                                <v-list-item style="cursor: pointer;" @click="$router.push({ name: 'detail-bootcampgraduateapproval', params: { id: item.id } })"
                                    v-for="item in list_data.data"
                                    :key="item.id"
                                    >
                                    <v-list-item-content>
                                        <v-list-item-title>Batch {{ item.batch }} - {{ item.technology.name }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </template>
            </v-col>
        </v-row>


        <v-row class="ml-5">
            <v-col cols="12" sm="3">
                <xa-card2    title=".Net Core" picture="xa-dotnet-core-6.png"
                            desc="ASP.NET Core is a cross-platform, high-performance, open source framework for building modern, cloud-powered, Internet-connected applications."
                ></xa-card2>
            </v-col>
            <v-col cols="12" sm="3">
                <xa-card2    title="Docker" picture="xa-docker.png"
                            desc="Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called containers"
                ></xa-card2>
            </v-col>
            <v-col cols="12" sm="3">
                <xa-card2    title="Python" picture="xa-python.png"
                            desc="Python is an interpreted, high-level, general-purpose programming language. Created by Guido van Rossum and first released in 1991."
                ></xa-card2>
            </v-col>
            <v-col cols="12" sm="3">
                <xa-card2    title="Django" picture="xa-django.png"
                            desc="Django is a free and open-source, Python-based web framework that runs on a web server. It follows the model–template–views (MTV) architectural pattern"
                ></xa-card2>
            </v-col>
        </v-row>
        
        <v-row class="ml-5">
            <v-col cols="12" sm="3">
                <xa-card2    title="Vue" picture="xa-vue.png"
                            desc="The Progressive JavaScript Framework · Approachable. Builds on top of standard HTML, CSS and JavaScript with intuitive API and world-class documentation."
                ></xa-card2>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { getBootcampGraduateApprovalAll } from "@/services/bootcampgraduateapproval.js";
    import errorMessage from "@/utils/notify-error";

    import moment from 'moment';
    import XaCard2 from "@/components/xa/card2";

    export default {
        name: "VueDashboard",
        components: {
            XaCard2
        },
        data() {
            return {
                items: [
                    {
                        action: 'mdi-ticket',
                        // action: '',
                        items: [{ title: 'List Approval' }],
                        title: 'All List Data',
                    },
                    {
                        action: 'mdi-silverware-fork-knife',
                        // action: '',
                        active: true,
                        items: [
                            { title: 'Breakfast & brunch' },
                            { title: 'New American' },
                            { title: 'Sushi' },
                        ],
                        title: 'Dining',
                    },
                    
                ],
                loading: true, 
                form: {
                    todoid: null,
                },
                list_data: {
                    data: [],                    
                },
                approval_by: null,
            };
        },
        mounted() {
            if(JSON.parse(localStorage.getItem("user")).appRole.name == 'BOD'){
                this.doGetDataListGraduate();
            }
            // else{
            //     console.log('bukan BOD');
            // }
        },
        methods: {
            periodeDateFormat(start, end) {
                return moment.utc(start).local().format('DD MMM YYYY') + " - " + moment.utc(end).local().format('DD MMM YYYY');
            },
            onChangeTodoList(){
                this.$router.push({ name: 'detail-bootcampgraduateapproval', params: { id: this.form.todoid } })
            },
            doGetDataListGraduate(){
                this.loading = true;
                getBootcampGraduateApprovalAll()
                .then(response => {  
                        this.approval_by = JSON.parse(localStorage.getItem("user")).appRole.name;
                        this.list_data.data = response.items.map(a => ({
                            ...a,
                            periode_str: this.periodeDateFormat(a.periode.startDate, a.periode.endDate)
                        }));
                        console.log('listdata: ', this.list_data.data);
                        console.log('user: ', JSON.parse(localStorage.getItem("user")));
                        console.log('approval_by: ', this.approval_by);
                })
                .catch(error => {
                    this.loading = false;
                    errorMessage(error);
                })
            },
        }
    };
</script>
