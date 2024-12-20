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
            <v-col cols="4" sm="3">Type</v-col>
            <v-col cols="auto">:&emsp;{{ source.type}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Start Date</v-col>
            <v-col cols="auto">:&emsp;{{  format_date(source.periode.startDate) }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">End Date</v-col>
            <v-col cols="auto">:&emsp;{{ format_date(source.periode.endDate) }}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Trainer Officer</v-col>
            <v-col cols="auto">:&emsp;{{ source.trainer.name}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">QC Officer</v-col>
            <v-col cols="auto">:&emsp;{{ source.qc.name}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Approver Officer</v-col>
            <v-col cols="auto">:&emsp;{{ source.approver.name}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Adjusment Note</v-col>
            <v-col cols="auto">:&emsp;{{ source.approver.note}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Notify Recipients</v-col>
            <v-col cols="8" sm="8" >:&emsp;
                    <v-simple-table dense class="grey--text">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">Name</th>
                                <th class="text-left">Role</th>
                            </tr>
                        </thead> 
                        <tbody>
                            <tr v-for="user in source.notifyRecipients" :key="user.userId" >
                                <td v-if="user.recordStatus == 'Active'">{{ user.name }}</td>
                                <td v-if="user.recordStatus == 'Active'">{{ user.role }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-card-text>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "XaCardBootcampInformation",
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