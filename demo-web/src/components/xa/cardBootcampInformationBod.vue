<template>

    <div>
        <v-card-text>
            Information
        </v-card-text>
        <v-divider />

        <v-card-text>
            <v-row>
                <v-col cols="12" xs="12">
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-row>
                                <v-col xs="3">Batch</v-col>
                                <v-col>:&emsp;{{ source.batch}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col xs="3">Technology</v-col>
                                <v-col>:&emsp;{{ source.technology.name}}</v-col>
                            </v-row>
                            <v-row>
                                <v-col xs="3">Periode</v-col>
                                <v-col>:&emsp;{{ format_date(source.periode.startDate) }} - {{ format_date(source.periode.endDate) }}</v-col>
                            </v-row>
                            <v-row>
                                <v-col xs="3">Location</v-col>
                                <v-col>:&emsp;{{ source.location.name}}</v-col>
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
        name: "XaCardBootcampInformationBod",
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