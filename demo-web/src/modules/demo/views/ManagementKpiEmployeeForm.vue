<template>
    <v-row>
        <v-col>
            <v-card outlined class="mx-auto pa-5" >
                <strong>Key Performance Indicator</strong>

                <p></p>
                <div><small>Employee</small></div>
                <div><strong>Aditya</strong></div>

                <p></p>
                <div><small>Position</small></div>
                <div><strong>Technical Competency Counsellor</strong></div>

                <br><br>
                <v-select :items="itemsCategory" v-model="e1" label="Kategori" outlined ></v-select>

                <v-textarea outlined
                label="Target" 
                value="Menghadiri seluruh corporate event perusahaan"></v-textarea>

                <v-textarea outlined
                label="Target Deskripsi" 
                value="kehadiran 100% (dihitung proporsional sesuai dengan jumlah corporate event)"></v-textarea>

                <v-text-field 
                    outlined
                    type="number"
                    label="Bobot *"
                    prepend-icon=""
                    dense
                    v-model="form.bobot"
                    :rules="numberIsFloat(form.bobot)"
                    >
                </v-text-field>

                <v-text-field outlined
                    type="number"
                    label="Batas Minimum *"
                    prepend-icon=""
                    dense
                    v-model="form.minimumLimit"
                    :rules="numberIsFloat(form.minimumLimit)"
                    >
                </v-text-field>

            </v-card>
        </v-col>


        <v-col>
            <v-card outlined class="mx-auto pa-5">
                <strong>Key Performance Indicator Submission</strong>
                <p></p>
                <v-btn text color="warning" @click="goToDashboard()"> BACK </v-btn>
                <v-btn text color="primary" @click="goToProfileDetail()"> SUBMIT </v-btn>
                <v-row>
                    <v-col>
                    </v-col>
                    <v-col>
                    </v-col>
                </v-row>
                
            </v-card>
        </v-col>
    </v-row>
</template>


<script>
  
export default {
  name: "VueProfileDetail",
  components: {

  },
  data () {
    return {
      tab: null,
      itemsCategory: [
        'Corporate Value', 'Productivity', 'Quality',
      ],
      e1:'Corporate Value',
      form: {
            category: 'Corporate Value',
            target: null,
            targetDesc: null,
            bobot: '0',
            minimumLimit: '0',
            score: '0',
        },
      numberIsFloat(v){
                    const position = v.search(/[.,]/);
                    const decimalValue = v.substring(position+1).length
                    const isNotDecimal = position < 0

                    if( isNotDecimal && v.length < 3 ) return true
                    if ( !isNotDecimal &&  decimalValue <= 3 ) return true
                    return "Max length should not be above 3"
                },
    }
  },
  mounted() {},
  methods: {
           goToHomeProfile(){
                      this.$router.push({
                                 name: "employeeprofile"
                      });
           },
           goToDashboard(){
                      this.$router.push({
                                 name: "dashboard"
                      });
           },
           
           
  },
};
</script>