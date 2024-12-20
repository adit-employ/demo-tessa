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
            <v-col cols="4" sm="3">Trainer Officer</v-col>
            <v-col cols="auto">:&emsp;{{ source.trainer.name}}</v-col>
        </v-row>
        <v-row>
            <v-col cols="4" sm="3">Bootcamp Status</v-col>
            <v-col cols="auto">:&emsp;{{ bindBootcampStatusFromMaster(masterStatus, source.bootcampStatus) }}</v-col>
        </v-row>

       
        <v-row v-if="!checkIsStartMiniProjectPhase(source.bootcampStatus)">
            <v-col cols="4" sm="3">Need Adjustment from BOD Notes </v-col>
            <v-col cols="8">:&emsp;
                <div class="pl-5 mt-n6" v-if="source.graduateNoteNeedAdjustment != null && source.graduateNoteNeedAdjustment.find(({ bootcampStatus }) => bootcampStatus === 'ApprovalBOD')"> {{ bindBootcampStatusFromMaster(masterStatus, 'FT_2') }}
                    <ul v-for="item in source.graduateNoteNeedAdjustment.filter(x => x.bootcampStatus == 'ApprovalBOD').slice().reverse()" :key="item.ApprovalBOD">
                        <li>{{ item.note }}</li>
                    </ul>
                </div>
                <br>
                <div class="pl-5 mt-n6" v-if="source.graduateNoteNeedAdjustment != null && source.graduateNoteNeedAdjustment.find(({ bootcampStatus }) => bootcampStatus === 'ApprovalBODExtend')"> {{ bindBootcampStatusFromMaster(masterStatus, 'Extend') }}
                    <ul v-for="item in source.graduateNoteNeedAdjustment.filter(x => x.bootcampStatus == 'ApprovalBODExtend').slice().reverse()" :key="item.ApprovalBOD">
                        <li>{{ item.note }}</li>
                    </ul>
                </div>
            </v-col>
        </v-row>

    </v-card-text>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "XaCardBootcampInformationQc",
        props: [
                'source', 
                'masterStatus'
        ],
        methods:{
            format_date(value){
                if (value) {
                return moment(String(value)).format('DD MMM YYYY')
                }
            },

            bindBootcampStatusFromMaster(master, valueBootcampStatus){
                // return master.filter((x) => x.status == valueBootcampStatus)
                if(master != null)

                return master.find(({ status }) => status === valueBootcampStatus).title;
            },

            checkIsStartMiniProjectPhase(valueBootcampStatus){
                const phaseBeforeMinPro = ["Created", "Approval", "Approved", "Phase_1", "FT_1", "Phase_2"];

                return phaseBeforeMinPro.includes(valueBootcampStatus)
            },

        }
    };
</script>