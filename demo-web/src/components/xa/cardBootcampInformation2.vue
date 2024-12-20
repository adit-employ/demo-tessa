<template>
    <v-card-text>
        <v-row>
            <v-col cols="12" sm="10" class="grey--text font-weight-bold">Information</v-col>
            <v-col class="text-right"></v-col>
        </v-row>
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
            <v-col cols="4" sm="3">Start Date</v-col>
            <v-col cols="auto">:&emsp;{{  format_date(source.periode.startDate) }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">End Date</v-col>
            <v-col cols="auto">:&emsp;{{ format_date(source.periode.endDate) }}</v-col>
        </v-row>
    </v-card-text>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "XaCardBootcampInformation2",
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