<template>
    <div>
        <v-row>
            <v-col>
                <v-card :loading="events.loading">
                    <v-col cols="12" xs="12">
                        <v-row class="pa-2 grey--text">
                            <v-col>Profile</v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field disabled id="name"
                                                        name="name"
                                                        v-model="form.name"
                                                        label="Name"
                                                        prepend-icon="mdi-format-text"
                                                        dense>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field disabled id="email"
                                                        name="email"
                                                        v-model="form.email"
                                                        label="Email"
                                                        prepend-icon="mdi-format-text"
                                                        dense>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field disabled id="birth_Place"
                                                        name="birth_Place"
                                                        v-model="form.birth_Place"
                                                        label="Birth Place"
                                                        prepend-icon="mdi-format-text"
                                                        dense>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field disabled id="phone"
                                                        name="phone"
                                                        v-model="form.phone"
                                                        label="Phone"
                                                        prepend-icon="mdi-format-text"
                                                        dense>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="12">
                                <v-row>
                                    <v-col cols="12" sm="6">
                                        <v-text-field disabled id="birth_Date"
                                                        name="birth_Date"
                                                        v-model="form.birth_Date"
                                                        label="Birth Date"
                                                        prepend-icon="mdi-format-text"
                                                        dense>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="$router.push({ name: `students`})" :disabled="events.loading">
                            Back
                        </v-btn>

                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-if="source_bootcamp != undefined">
        <template v-for="item in source_bootcamp">
                <v-col :key="item.id" cols="12" sm="6">
                    <v-card :loading="events.loading">
                            <v-card-text class="grey--text font-weight-bold">
                                <v-row>
                                    <v-col cols="12" sm="12">Bootcamp Batch {{ item.batch }}&emsp;-&emsp;{{ item.technology.name }}</v-col>
                                </v-row>
                            </v-card-text>
                            
                           <v-row>
                                <v-col cols="12" sm="6" class="pb-2">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle class="grey--text ">Periode</v-list-item-subtitle>
                                            <v-list-item-subtitle>{{ formatDate(item.periode.startDate,'date') }} - {{ formatDate(item.periode.endDate,'date') }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" sm="6" class="pb-2">
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-list-item-subtitle class="grey--text ">Phase</v-list-item-subtitle>
                                            <v-list-item-subtitle>{{ item.bootcampStatus }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                           </v-row>
                            

                    </v-card>
                </v-col>
            </template>
        </v-row>
        
        
        
    </div>
</template>

<script>
    // Services
    import { getStudentsDetail, getStudentsBootcamp } from "@/services/students.js";

    //utils
import formatDate from "@/utils/format-date";
import errorMessage from "@/utils/notify-error";

    export default {
        name: "VueStudentsForm",
        data() {
            return {
            form:{
                name: null,
                email: null,
                birth_Place: null,
                birth_Date: null,
                phone: null,
            },
            loading: false,
            events: {
                    loading: true,
            },
            source_bootcamp:[],
            }
        },
        mounted() {
            if (this.$route.params.id) {
                this.doGetStudentsDetail();
            }
        },
        methods:{
            formatDate,
            doGetStudentsDetail() {
                this.events.loading = true;
                getStudentsDetail(this.$route.params.id)
                .then((response) => {
                    this.form = response;
                    this.doGetBootcampList(this.$route.params.id);
                    this.events.loading = false;
                    console.log('detail student : ', response);
                }).catch((error) => {
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            doGetBootcampList(){
            getStudentsBootcamp(this.$route.params.id)
                .then((response) => {
                    this.events.loading = false;
                    this.source_bootcamp = response.items;
                    console.log('this.source_bootcamp : ', this.source_bootcamp);
                }).catch((error) => {
                    this.events.loading = false;
                    errorMessage(error);
                })
            }
        }
    }
</script>