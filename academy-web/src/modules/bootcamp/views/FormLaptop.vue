<template>
    <div>
        <v-row>
            <v-col>
                <v-card :loading="events.loading">
                    <template v-if="source_bootcamp != undefined">

                        <v-card-text class="grey--text font-weight-bold">
                            <v-row>
                                <v-col cols="12" sm="12">Information</v-col>
                            </v-row>
                        </v-card-text>

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
                            <v-row>
                                <v-col cols="4" sm="2">Student</v-col>
                                <v-col cols="auto">:&emsp;<b>{{ form.studentName }}</b></v-col>
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
                            <v-col cols="12" sm="12">Form</v-col>
                        </v-row>
                    </v-card-text>

                   <v-col cols="12" md="12">
                       <v-form v-model="form_error" ref="form" lazy-validation>
                           <v-row>
                               <v-col cols="12" md="6">
                                <v-combobox
                                    v-model="form.laptop"
                                    :items="source_laptops"
                                    item-text="name"
                                    item-value="id"
                                    label="Laptop "
                                    clearable
                                    hide-selected
                                    outlined
                                    dense
                                    :rules="rules.laptop"
                                ></v-combobox>
                               </v-col>
                           </v-row>
                           <v-row>
                                <v-col cols="12">
                                    <v-alert
                                            border="left"
                                            colored-border
                                            type="info"
                                            elevation="2"
                                            dense
                                            >
                                            <small>Laptop returns must be processed via the laptop assets menu !</small>
                                    </v-alert>
                                </v-col>
                           </v-row>
                       </v-form>
                   </v-col>
                   <v-divider />
                   <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" outlined @click="$router.push({ name: 'detail-laptop-bootcamp', params: { id: $route.params.id } })" :disabled="events.loading">
                        Back
                    </v-btn>
                    <v-btn color="primary" @click="doSave()" :disabled="events.loading || events.submit">
                        <v-icon v-if="events.loading || events.submit" class="mdi mdi-spin">mdi-loading</v-icon>
                        {{!events.loading || !events.submit ? 'Submit' : 'Loading'}}
                    </v-btn>

                </v-card-actions>
               </v-card>
            </v-col>
        </v-row>


    </div>

</template>
<script>
    import { getBootcampDetail, updateBootcampMappingStudentLaptop } from "@/services/bootcamp";
    // import { getLaptopAssetsByStatus } from "@/services/laptopassets";
    import { getLaptopAssetsByLocationIdAndStatus } from "@/services/laptopassets";
    import errorMessage from "@/utils/notify-error";

    export default {
        name: "VueBootcampDetailLaptop",
        data() {
            return {
                form: {
                    batch: null,
                    studentId: null,
                    studentName: null,
                    laptop: { id: null, name: null },
                    updatedBy: null,
                },
                rules: {
                    laptop: [ v => !!v || 'Laptop is required' ], 
                },
                events: {
                    loading: true,
                    submit: false,
                    status: false,
                },
                form_submit: {},
                loading: false,
                form_mode: null,
                form_error: false,
                source_laptops: [],
                source_bootcamp:{
                    technology: { id: null, name: null },
                    location: { id: null, name: null }
                },
            }
        },
        mounted() {
            this.loading = true;
            if (this.$route.params.id) {
                this.$refs.form.resetValidation();
                this.doGetBootcampDetail();
                // this.doGetSourcelaptop();
            }
        },
        methods:{
            doGetBootcampDetail() {
                // this.loading = true;
                getBootcampDetail(this.$route.params.id)
                .then((response) => {
                    this.source_bootcamp = response;
                    // console.log('Laptop => this.source_bootcamp : ', this.source_bootcamp);
                    
                    // this.form = response.students.find(x => x.studentId == this.$route.params.studentid);
                    let student = response.students.find(x => x.studentId == this.$route.params.studentid);
                    // console.log('Laptop => current student : ', student);
                    
                    // fill model form
                    if(student != undefined){
                        this.form.batch = response.batch;
                        this.form.studentId = student.studentId;
                        this.form.studentName = student.name;
                        this.form.laptop = student.laptop;
                        this.form.updatedBy = JSON.parse(localStorage.getItem("user")).id;

                        this.source_laptops.push(student.laptop);
                    }

                    console.log('form : ', this.form);
                    // this.loading = false;
                    this.doGetSourcelaptop();

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
                        // this.source_laptops = response.items;
                        this.source_laptops = response.items.map(item => {
                            const laptop = {};
                            laptop['id'] = item.id;
                            laptop['name'] = item.laptopBagNumber;
                            return laptop;
                        });

                        console.log('Laptop => Get Laptop : ', this.source_laptops);
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                })
            },
            async doSave(){
                if (!this.$refs.form.validate()) return false;

                this.events.loading = true;

                this.form_submit = { ...this.form };
                this.form_submit.studentLaptops = [{
                    studentId: this.form.studentId,
                    studentName: this.form.studentName,
                    laptop: { id: this.form.laptop.id, name: this.form.laptop.name }
                }]

                // console.log('this.form_submit : ', this.form_submit);

                this.doUpdate();
            },
            async doUpdate() {
                this.events.loading = true;
                let payload = {...this.form_submit, id : this.$route.params.id}
                await updateBootcampMappingStudentLaptop(payload)
                    .then(() => {
                        setTimeout(() => {
                            this.events.submit = false;
                            this.saveSuccess();
                        }, 2000);
                    }).catch((error) => {
                        this.events.loading = false;
                        this.events.submit = false;
                        errorMessage(error);
                    })
            },
            saveSuccess() {
                this.events.loading = false;
                this.$notify({
                    title: "Successful",
                    content: "Bootcamp mapping laptop saved!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: 'detail-laptop-bootcamp', params: { id: this.$route.params.id } });
            },


        }
    }
</script>