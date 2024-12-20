<template>
    <v-card-text>
        <v-row>
            <v-col cols="12" sm="10" class="grey--text font-weight-bold">Information</v-col>
            <v-col class="text-right"></v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Batch</v-col>
            <v-col cols="auto">:&emsp;{{ source.batch }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Technology</v-col>
            <v-col cols="auto">:&emsp;{{ source.technology.name }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Student</v-col>
            <v-col cols="auto">:&emsp;{{ form.studentName }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Trainer</v-col>
            <v-col cols="auto">:&emsp;{{ source.trainer.name }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Note</v-col>
            <v-col cols="8">:&emsp;
                <div class="pl-5 mt-n6" >
                    {{ form.trainerNote }}
                </div>
            </v-col>
                <!-- <label></label></v-col> -->
        </v-row>
    </v-card-text>
</template>

<script>
    //import moment from 'moment';

    export default {
        name: "XaCardAssessmentQcStudentInformation",
        props: [
                'source',
                'form'
        ],
        // methods:{
        //     format_date(value){
        //         if (value) {
        //             return moment(String(value)).format('DD MMM YYYY')
        //         }
        //     },
        // }
    };
</script>