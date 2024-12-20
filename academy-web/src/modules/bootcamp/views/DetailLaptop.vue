<template>
    <div>
        <v-row>
            <v-col>
                <v-card :loading="events.loading">
                    <v-card-text class="grey--text font-weight-bold">
                        <v-row>
                            <v-col cols="12" sm="12">Information</v-col>
                        </v-row>
                    </v-card-text>

                    <template v-if="source_bootcamp != undefined">
                        <v-card-text>
                            <v-row>
                                <v-col cols="4" sm="2">Batch</v-col>
                                <v-col cols="auto">:&emsp;{{ source_bootcamp.batch}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" sm="2">Technology</v-col>
                                <v-col cols="auto">:&emsp;{{ source_bootcamp.technology.name}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" sm="2">Location</v-col>
                                <v-col cols="auto">:&emsp;{{ source_bootcamp.location.name}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4" sm="2">Type</v-col>
                                <v-col cols="auto">:&emsp;{{ source_bootcamp.type}}</v-col>
                            </v-row>
                        </v-card-text>
                    </template>
                    
                </v-card>
            </v-col>
        </v-row>

        <v-row  >
            <v-col>
                <v-card :loading="events.loading">
                    <v-card-text class="grey--text font-weight-bold">
                        <v-row>
                            <v-col cols="12" sm="12">Students</v-col>
                        </v-row>
                    </v-card-text>

                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="8" :align-self="'center'">
                                <v-simple-table dense class="grey--text">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Nama</th>
                                                <th class="text-left" style="width:35%">Laptop</th>
                                                <th class="text-right" style="width:10%">Action</th>
                                            </tr>
                                        </thead> 
                                        <tbody >
                                            <template v-for="student in source_bootcamp.students"  >
                                                <tr v-if="student.recordStatus != 'Removed'" :key="student.studentId">
                                                    <td>{{ student.name }}</td>
                                                    <td v-if="student.laptop != undefined">{{ student.laptop.name }}</td>
                                                    <td v-else></td>
                                                    <td class="text-right">
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn icon v-on="on" @click="$router.push({ name: 'form-laptop-bootcamp', params: { id: $route.params.id, studentid: student.studentId } })">
                                                                    <v-icon>mdi mdi-laptop-account</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Form Mapping Laptop Bootcamp</span>
                                                        </v-tooltip>
                                                    </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                        
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        
        <v-row>
            <v-col cols="12">
                <v-btn color="primary" outlined @click="$router.push({ name: `bootcamp`})" :disabled="events.loading">
                    Back
                </v-btn>
            </v-col>
        </v-row>

    </div>
</template>


<script>
    // Services
    import { getBootcampDetail } from "@/services/bootcamp";
    // import { getLaptopAssetsByStatus } from "@/services/laptopassets";
    import { getLaptopAssetsByLocationIdAndStatus } from "@/services/laptopassets";

    // Util / Lib
    import errorMessage from "@/utils/notify-error";

    export default {
        name: "VueBootcampDetailLaptop",
        data() {
            return {
                events: {
                    loading: true,
                    submit: false,
                    status: false,
                },
                loading: false,
                form_mode: null,
                form_error: false,
                source_bootcamp: {
                    technology: { id: null, name: null },
                    location: { id: null, name: null },
                    students: {
                        laptop: { id: null, name: null }
                    }
                },
                source_laptops: [],
            }
        },
        mounted() {
            this.loading = true;
            if (this.$route.params.id) {
                this.doGetBootcampDetail();
                // this.doGetSourcelaptop();
            }
        },
        methods:{
            doGetBootcampDetail() {
                this.loading = true;
                getBootcampDetail(this.$route.params.id)
                .then((response) => {
                    this.source_bootcamp = response;
                    console.log('Laptop => this.source_bootcamp : ', this.source_bootcamp);
                    this.doGetSourcelaptop();
                    this.loading = false;
                }).catch((error) => {
                    this.events.loading = false;
                    errorMessage(error);
                })
            },

            doGetSourcelaptop() {
                this.events.loading = true;
                // getLaptopAssetsByStatus('Available')
                getLaptopAssetsByLocationIdAndStatus(this.source_bootcamp.location.id, 'Available')
                    .then((response) => {
                        this.events.loading = false;
                        this.source_laptops = response.items;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },


        }
    }
</script>