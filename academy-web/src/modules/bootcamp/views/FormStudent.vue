<template>
    <div>
        <v-row>
            <v-col cols="12" xs="12">
                <v-card :loading="events.loading">
                    <v-form v-model="form_error" ref="form" lazy-validation>
                        <v-card-text class="grey--text font-weight-bold">
                            <v-row>
                                <v-col cols="12" sm="12">Information</v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="12" class="pt-0 pb-0">
                                    <v-autocomplete v-model="form.students"
                                        item-text="nameDisplay"
                                        item-value="studentId" 
                                        :items="source_students"
                                        :rules="rules.students"
                                        @change="onChangeStudent()"
                                        chips multiple clearable 
                                        label="Student"
                                        prepend-icon="mdi mdi-account-multiple">
                                    </v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-card-text>

                    </v-form>
                    <v-divider />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" outlined @click="$router.push({ name: `detail-bootcamp`})" :disabled="events.loading">
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
        <br>
    </div>
</template>
       
<script>
    // Services
    import { getBootcampDetail, updateBootcampMappingStudent } from "@/services/bootcamp";
    import { getStudentsAll } from '@/services/students';

    import errorMessage from "@/utils/notify-error";

    export default {
        name: "VueBootcampFormInformation",
        data() {
            return {
                form: {
                    students: null,
                    updatedBy: JSON.parse(localStorage.getItem("user")).id,
                },
                rules: {
                        students: [
                            v => v == null ? false : v.length > 0 || 'Notification Recipient is required',
                        ],
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
                source_students: [],
                old_students: [],
            }
        },
        mounted() {
            
            if (this.$route.params.id) {
                this.$refs.form.resetValidation();
                this.form_mode = 'update';
                this.doGetBootcampDetail();
                this.doGetStudents();
            }
        },
        methods:{
            doGetBootcampDetail() {
                this.events.loading = true;
                getBootcampDetail(this.$route.params.id)
                    .then((response) => {
                        if(response.students != undefined && response.students.length > 0){
                            this.old_students = response.students.map(item => {
                                const user = {};
                                user['studentId'] = item.studentId;
                                user['name'] = item.name;
                                user['email'] = item.email;
                                user['nameDisplay'] = item.name.concat(' - ', item.email);
                                user['recordStatus'] = item.recordStatus;
                                return user;
                            });
                            // this.source_students.push(this.old_students.filter(user => user.recordStatus == 'Active'));
                            // console.log('this.old_students : ', this.old_students);
                            
                            response.students = this.old_students.filter(user => user.recordStatus == 'Active');
                        }
                        
                        this.form = response;
                        this.events.loading = false;
                    
                        console.log('mapping => get bootcamp detail  : ', this.form );
                    }).catch((error) => {
                        this.events.loading = false;
                        errorMessage(error);
                    })
            },
            doGetStudents() {
                this.events.loading = true;

                getStudentsAll("Available")
                .then((response) => {
                    console.log('mapping => getStudentsAll available : ', response);
                    this.source_students = response.items.map(item => {
                        const user = {};
                        user['studentId'] = item.id;
                        user['name'] = item.name;
                        user['email'] = item.email;
                        user['nameDisplay'] = item.name.concat(' - ', item.email);
                        user['recordStatus'] = 'Active';
                        return user;
                    });

                    console.log('mapping => this.old_students : ', this.old_students);
                    console.log('mapping => this.source_students : ', this.source_students);
                    this.old_students.forEach((item)=> {
                        const user = {};
                        user['studentId'] = item.studentId;
                        user['name'] = item.name;
                        user['email'] = item.email;
                        user['nameDisplay'] = item.name.concat(' - ', item.email);
                        user['recordStatus'] = 'Active';
                        this.source_students.push(user);
                    });
                    console.log('mapping => this.source_students updated : ', this.source_students);


                    this.events.loading = false;
                }).catch((error) =>{
                    this.events.loading = false;
                    errorMessage(error);
                });
            },


            onChangeStudent() {
                let listStudent = [];

                this.form.students.forEach(studentId => {
                    const source = [...this.source_students].find((obj) => {
                        console.log(obj);
                        return obj.studentId === studentId;
                    });
                    if (source != null && typeof source != undefined) {
                        listStudent.push(source);
                    }
                });
                this.form.students = listStudent;
            },


            async doSave() {
                if (!this.$refs.form.validate()) return false;

                this.form_submit = { ...this.form };
                this.form_submit.updatedBy = JSON.parse(localStorage.getItem("user")).id;

                console.log('save => this.form_submit.students : ', this.form_submit.students);
                console.log('save => this.old_students : ', this.old_students);

                this.old_students.forEach(userOld => {
                    console.log('save => userOld (', userOld.name , ') : ', this.form_submit.students.filter(user => user.studentId === userOld.studentId));
                    
                    if(!this.form_submit.students.some(user => user.studentId === userOld.studentId)){

                        userOld.recordStatus = 'Removed';
                        this.form_submit.students.push(userOld);                                
                    }
                });

                console.log('save => this.form_submit.students update : ', this.form_submit.students);

                this.doUpdate();
            },
            async doUpdate() {
                this.events.loading = true;
                let payload = {...this.form_submit, id : this.$route.params.id}
                await updateBootcampMappingStudent(payload)
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
                this.loading = false;
                this.$notify({
                    title: "Successful",
                    content: "Bootcamp already saved!",
                    color: "rgb(0, 200, 83)",
                });
                this.$router.push({ name: 'detail-bootcamp', params: { id: this.$route.params.id } });
            },
            openFormStudent(){
            this.$router.push({
                name: 'form-student-bootcamp',
                params: { id: this.$route.params.id }
            }); 
        }
            

        }
    }
</script>