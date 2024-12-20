<template>
    <div>
        <v-card-text>
            <v-row>
                <v-col cols="12" xs="12">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col sm="3">Batch</v-col>
                                <v-col>:&emsp;{{ source.batch}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="3">Technology</v-col>
                                <v-col>:&emsp;{{ source.technology.name}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="3">Type</v-col>
                                <v-col>:&emsp;{{ source.type}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="3">Location</v-col>
                                <v-col>:&emsp;{{ source.location.name}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="3">Periode</v-col>
                                <v-col>:&emsp;{{ format_date(source.periode.startDate) }} - {{ format_date(source.periode.endDate) }}</v-col>
                            </v-row>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col sm="3">Trainer Officer</v-col>
                                <v-col>:&emsp;{{ source.trainer.name}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="3">QC Officer</v-col>
                                <v-col>:&emsp;{{ source.qc.name}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="3">Approver Officer</v-col>
                                <v-col>:&emsp;{{ source.approver.name}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="3">Adjusment Note</v-col>
                                <v-col>:&emsp;{{ source.approver.note}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col sm="3">Notify Recipients</v-col>
                                <v-col>:&emsp;
                                    <v-simple-table dense>
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
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>


    </div>
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