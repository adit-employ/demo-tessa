<template>
           <div>
                      <v-row>
                                 <v-col>
                                            <v-card>
                                                       <v-card-text >
                                                                  <v-row>
                                                                             <v-col>
                                                                                        <div >
                                                                                                   <div><small>Employee</small></div>
                                                                                                   <div><strong>Ade Aditya Yahdjan</strong></div>
                                                                                                   <p></p>
                                                                                        </div>
                                                                                        <div >
                                                                                                   <div><small>Position</small></div>
                                                                                                   <div><strong>Technical Competency Counsellor</strong></div>
                                                                                                   <p></p>
                                                                                        </div>
                                                                             </v-col>
                                                                             <v-col lg="2">
                                                                                        <div >
                                                                                                   <div><small>Year</small></div>
                                                                                                   <div><strong>2023</strong></div>
                                                                                                   <p></p>
                                                                                        </div>
                                                                                        <div >
                                                                                                   <div><small>Updated By</small></div>
                                                                                                   <div><strong>Catherina</strong></div>
                                                                                                   <p></p>
                                                                                        </div>
                                                                             </v-col>
                                                                  </v-row>
                                                       </v-card-text>
                                            </v-card>
                                 </v-col>
                      </v-row>
                      <v-row>
                                 <v-col>
                                            A. Key Performance Indicators
                                            <p></p>
                                            <v-card>
                                                       <v-list two-line>
                                                                  <v-list-item>
                                                                             <v-list-item-content>
                                                                                        <v-row>
                                                                                                   <v-col cols="100" xs="12" sm="4">Kategori / Pengukuran</v-col>
                                                                                                   <v-col cols="100" sm="4">Deskripsi Target</v-col>
                                                                                                   <v-col md="1">Bobot</v-col>
                                                                                                   <v-col md="1">Batas minimum</v-col>
                                                                                                   <v-col md="1">Nilai Target</v-col>
                                                                                        </v-row>
                                                                             </v-list-item-content>
                                                                  </v-list-item>

                                                                  <div v-for="item in kpi" :key="item.target">
                                                                             <v-divider ></v-divider>
                                                                             <v-list-item>
                                                                                        <v-list-item-content>
                                                                                                   <v-row  no-gutters>
                                                                                                              <v-col cols="100" xs="12" sm="4">
                                                                                                                         <div >
                                                                                                                                    <div><small>{{ item.type }}</small></div>
                                                                                                                                    <div>{{ item.target }}</div>
                                                                                                                         </div>
                                                                                                              </v-col>
                                                                                                              <v-col cols="100" sm="4">
                                                                                                                         {{ item.targetDesc }}
                                                                                                              </v-col>
                                                                                                              <v-col md="1">{{ item.bobot }}</v-col>
                                                                                                              <v-col md="1">{{ item.batasMinimum }}</v-col>
                                                                                                              <v-col md="1">{{ item.nilaiTarget }}</v-col>
                                                                                                   </v-row>
                                                                                        
                                                                                        </v-list-item-content>
                                                                             </v-list-item>
                                                                  </div>
                                                                  


                                                       </v-list>
                                            </v-card>
                                 </v-col>
                      </v-row>

                      <v-row>
                                 <v-col>
                                            <v-btn class="ma-2" outlined color="indigo" @click="goToHomeProfile()"> Back </v-btn>
                                 </v-col>
                                 
                      </v-row>
           </div>
           
</template>


<script>
  
export default {
  name: "VueProfileDetail",
  components: {

  },
  data () {
    return {
      tab: null,
      items: [
        'PROFILE', 'KPI ASSIGNED', 'KPI RESULT',
      ],
      profile: {
        "Employee ID":"XMU0111",
        "NIK":"09839289398898",
        "Name":"Aditya",
        "Gender":"Male",
        "Birth Date":"15 Agustus 1990",
        "Employee Status":"Permanent",
        "Join Date":"17 Desember 2017",
        "PTKP Status":"K0",
        "BLood Type":"O",
        "Region":"Islam"
      },
      kpiAssigned:[
        {"Name":"Aditya", "Position":"Technical Competency Counsellor", "Year":2022, "Updated by":"Catherina"},
        {"Name":"Aditya", "Position":"Technical Competency Counsellor", "Year":2023, "Updated by":"Catherina"},
        {"Name":"Aditya", "Position":"Technical Competency Counsellor", "Year":2024, "Updated by":"Catherina"},
      ],
      kpi:[
        {type:"Corporate Value", bobot:"15 %", batasMinimum:"-", nilaiTarget:"15", target:"Menghadiri seluruh corporate event perusahaan", targetDesc:"kehadiran 100% (dihitung proporsional sesuai dengan jumlah corporate event)"},
        {type:"Corporate Value", bobot:"10 %", batasMinimum:"-", nilaiTarget:"10", target:"Melakukan repost dari akun media sosial perusahaan (Instagram & LinkedIn), dimana didalam evidence yang diberikan harus tercantum tanggal repost tersebut", targetDesc:"Minimal 5 repost disetiap quarter (Q2, Q3, Q4)"},
        {type:"Productivity", bobot:"70 %", batasMinimum:"-", nilaiTarget:"70", target:"Billable Utilization (product development / implementasi / training / bootcamp)", targetDesc:""},
        {type:"Quality", bobot:"5 %", batasMinimum:"-", nilaiTarget:"5", target:"Melakukan sesi coaching / mentoring dengan atasan langsung", targetDesc:""},
      ],
        
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  mounted() {},
  methods: {
           goToHomeProfile(){
                      this.$router.push({
                                 name: "employeeprofile"
                      });
           }
  },
};
</script>