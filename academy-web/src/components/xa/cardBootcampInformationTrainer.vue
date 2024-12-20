<template>
    <v-card-text>
        <v-row>
            <v-col cols="4" sm="3">Batch</v-col>
            <v-col cols="auto">:&emsp;{{ source.batch}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Technology</v-col>
            <v-col cols="auto">:&emsp;{{ source.technology.name}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Location</v-col>
            <v-col cols="auto">:&emsp;{{ source.location.name}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Periode</v-col>
            <v-col cols="auto">:&emsp;{{ format_date(source.periode.startDate) }}&emsp;{{ format_date(source.periode.endDate) }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">QC Officer</v-col>
            <v-col cols="auto">:&emsp;{{ source.qc.name}}</v-col>
        </v-row>
    </v-card-text>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "XaCardBootcampInformationTrainer",
        props: [
                'source'
        ],
        methods:{
            format_date(value){
                if (value) {
                return moment(String(value)).format('DD MMM YYYY')
                }
            },
        }
    };
</script>